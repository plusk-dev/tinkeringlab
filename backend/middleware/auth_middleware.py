from starlette.requests import Request
from starlette.responses import Response
from starlette.types import ASGIApp
from utils import raise_error, get_credential
import jwt
from starlette.middleware.base import BaseHTTPMiddleware, DispatchFunction, RequestResponseEndpoint
from typing import Any, Coroutine
import datetime

JWT_TOKEN_TIMEOUT = datetime.timedelta(days=7)
SECRET_KEY = get_credential("JWT_SECRET")


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
