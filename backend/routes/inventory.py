from fastapi import FastAPI, Depends
from models import Component, session
from utils import object_as_dict

inventory_router = FastAPI()


@inventory_router.get("/")
async def get_all_components():
    return {
        "components": [object_as_dict(component) for component in session.query(Component).all()]
    }
