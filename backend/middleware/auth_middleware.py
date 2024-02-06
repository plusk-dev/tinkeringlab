from starlette.requests import Request
from starlette.responses import Response
from starlette.types import ASGIApp
from utils import raise_error
import jwt
from starlette.middleware.base import BaseHTTPMiddleware, DispatchFunction, RequestResponseEndpoint
from typing import Any, Coroutine
import datetime

JWT_TOKEN_TIMEOUT = datetime.timedelta(days=7)
SECRET_KEY = "lmaoxd"

# def raise_error(message, status_code):
#     print(message, status_code)


class JWTMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: ASGIApp, dispatch: DispatchFunction | None = None) -> None:
        super().__init__(app, dispatch)

    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Coroutine[Any, Any, Response]:
        auth_headers = request.headers.get("Authorization")
        if auth_headers is not None and auth_headers.startswith("Bearer "):
            token = auth_headers.replace("Bearer ", "")
            self.verify_jwt(token=token)
        else:
            raise_error(message="no jwt found", status_code=400)
        return await call_next(request)

    def verify_jwt(self, token: str) -> dict:
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms="HS256")
            if datetime.datetime.utcnow() - payload.get("iat") >= JWT_TOKEN_TIMEOUT:
                raise_error(message="jwt expired", status_code=401)
            return payload
        except jwt.InvalidTokenError:
            raise_error(message="invalid jwt", status_code=400)

# def create_jwt(payload: dict) -> str:
#     payload["expiry"] = datetime.datetime.utcnow() + JWT_TOKEN_TIMEOUT
#     token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
#     return token

# def verify_jwt(token: str) -> dict:
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms="HS256")
#         return payload
#     except jwt.ExpiredSignatureError:
#         raise_error(message="signature expired", status_code=401)
#     except jwt.InvalidTokenError:
#         raise_error(message="invalid jwt", status_code=400)

# verify_jwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE3MDcyNDUwMzF9.avwGMGVjx0dtjEI_ak96y5HXJy2xBlLd0NsnJz5nuFY")
