from fastapi import FastAPI
from fastapi.responses import JSONResponse
from models import Component, session, Machine
from utils import object_as_dict

inventory_router = FastAPI()


@inventory_router.get("/components/all")
async def get_all_components():
    return {
        "components": [object_as_dict(component) for component in session.query(Component).all()]
    }


@inventory_router.post("/components/update")
async def update_component(id: int, name: str, total: int, booked: int):
    component = session.query(Component).filter_by(id=id).first()
    if component is None:
        return JSONResponse(content={
            "error": "component with the provided id does not exist"
        }, status_code=400)
    component.name = name
    component.total = total
    component.booked = booked
    session.commit()
    return JSONResponse(content={
        "message": "component updated successfully"
    }, status_code=200)


@inventory_router.get("/machines/all")
async def get_all_machines():
    return {
        "components": [object_as_dict(machine) for machine in session.query(Machine).all()]
    }
