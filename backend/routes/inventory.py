from fastapi import FastAPI, Depends
from fastapi.responses import JSONResponse
from models import Component, session, Machine
from utils import object_as_dict, verify_jwt_admin

inventory_router = FastAPI()


@inventory_router.get("/components/all")
async def get_all_components():
    return {
        "components": [object_as_dict(component) for component in session.query(Component).all()]
    }


@inventory_router.post("/components/update")
async def update_component(id: int, name: str, total: int, user=Depends(verify_jwt_admin)):
    component = session.query(Component).filter(Component.id == id).first()
    if component is None:
        component = Component(name=name, total=total)
        session.add(component)
        session.commit()
    else:
        component.name = name
        component.total = total
        session.commit()
    return JSONResponse(content={
        "message": "component updated successfully"
    }, status_code=200)


@inventory_router.post("/components/create")
async def create_component(name: str, total: int):
    component = Component(name=name, total=total)
    session.add(component)
    session.commit()
    return object_as_dict(component)


@inventory_router.post("/components/delete")
async def delete_component(id: int):
    c = session.query(Component).filter(Component.id == id).first()
    if c != None:
        session.delete(c)
        session.commit()
        return {"message": "deleted successfully"}
    return {"message": "component does not exist in the database"}


@inventory_router.get("/machines/all")
async def get_all_machines():
    return {
        "components": [object_as_dict(machine) for machine in session.query(Machine).all()]
    }


@inventory_router.post("/machines/create")
async def create_machine(name: str):
    machine = Machine(name=name)
    session.add(machine)
    session.commit()
    return object_as_dict(machine)


@inventory_router.post("/machines/update")
async def update_machines(name: str):
    machine = session.query(Machine).filter(Machine.id == id).first()
    if machine is None:
        machine = Machine(name=name)
        session.add(machine)
        session.commit()
    else:
        machine.name = name
        session.commit()
    return JSONResponse(content={
        "message": "machine updated successfully"
    }, status_code=200)


@inventory_router.post("/machines/delete")
async def delete_machine(id: int):
    c = session.query(Machine).filter(Machine.id == id).first()
    if c != None:
        session.delete(c)
        session.commit()
        return {"message": "deleted successfully"}
    return {"message": "machine does not exist in the database"}
