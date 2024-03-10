from fastapi import FastAPI, Depends

inventory_router = FastAPI()

@inventory_router.get("/")
async def index():
    return {}