from fastapi import FastAPI, Request
from middleware import JWTMiddleware

router = FastAPI()

router.add_middleware(JWTMiddleware)

@router.get("/")
async def index(request: Request):
    return request.headers