from fastapi import FastAPI
from middleware import JWTMiddleware
from utils import raise_error, get_credential
import re
import jwt
import datetime

router = FastAPI()
email_regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
JWT_SECRET = get_credential("JWT_SECRET")
router.add_middleware(JWTMiddleware)


@router.get("/")
async def index():
    return {}


@router.post("/get_new_token")
async def get_new_token(email: str):
    if re.fullmatch(email_regex, email):
        token = jwt.encode(payload={
            "email": email,
            "iat": datetime.datetime.utcnow()
        }, key=JWT_SECRET)
        return token
    else:
        raise_error(message="email provided is not a valid email", status_code=400)
    return email
