from starlette.requests import Request
from starlette.responses import Response
from starlette.types import ASGIApp
from starlette.datastructures import MutableHeaders
from utils import get_credential, object_as_dict
import jwt
from starlette.middleware.base import BaseHTTPMiddleware, DispatchFunction, RequestResponseEndpoint
from typing import Any, Coroutine
from fastapi.responses import JSONResponse
import datetime
from models import User, session

JWT_TOKEN_TIMEOUT = datetime.timedelta(days=7)
JWT_SECRET = get_credential("JWT_SECRET")


class JWTMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: ASGIApp, dispatch: DispatchFunction | None = None) -> None:
        super().__init__(app, dispatch)

    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Coroutine[Any, Any, Response]:
        auth_headers = request.headers.get("Authorization")
        if auth_headers is not None and auth_headers.startswith("Bearer "):
            token = auth_headers.replace("Bearer ", "")
            payload = self.verify_jwt(token=token)
            if isinstance(payload, JSONResponse):
                return payload
            else:
                new_header = MutableHeaders(request._headers)
                for key in payload:
                    new_header[key] = str(payload[key])
                request._headers = new_header
                request.scope.update(headers=request.headers.raw)

        elif auth_headers is None and not "docs" in str(request.url) and "openapi.json" not in str(request.url):
            return JSONResponse(
                content={
                    "error": "jwt not provided"
                }, status_code=400
            )
        return await call_next(request)

    def verify_jwt(self, token: str) -> dict:
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms="HS256")
            if datetime.datetime.utcnow() - datetime.datetime.utcfromtimestamp(payload.get("iat")) >= JWT_TOKEN_TIMEOUT:
                return JSONResponse(
                    content={
                        "error": "jwt expired"
                    }, status_code=401)
            email = payload.get("email")
            if email is None:
                return JSONResponse(
                    content={
                        "error": "jwt does not contain email"
                    }, status_code=400
                )
            user = session.query(User).filter_by(email=email).first()
            if user is None:
                return JSONResponse(
                    content={
                        "error": "no user with the provied email exists"
                    }, status_code=400
                )
            return object_as_dict(user)
        except jwt.InvalidTokenError:
            return JSONResponse(content={
                "error": "invalid jwt provided"
            }, status_code=400)
