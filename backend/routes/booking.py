from fastapi import FastAPI, Depends
from fastapi.responses import JSONResponse
from utils import object_as_dict, verify_jwt_admin
from models import MachineBooking, ComponentBooking, WorkstationBooking, session, User
import datetime
import json

bookings_router = FastAPI()


@bookings_router.get("/all")
async def get_all(user=Depends(verify_jwt_admin)):
    data = json.dumps({
        "machine_bookings": [object_as_dict(booking) for booking in session.query(MachineBooking)],
        "component_bookings": [object_as_dict(booking) for booking in session.query(ComponentBooking)],
        "workstation_bookings": [object_as_dict(booking) for booking in session.query(WorkstationBooking)]
    }, sort_keys=True, default=str)
    return JSONResponse(content=data, status_code=200)


@bookings_router.post("/machine/create")
async def create_machine_booking(machine_id: int, start: datetime.datetime, end: datetime.datetime, description: str, email: str):
    user = session.query(User).filter(User.email == email).first()
    booking = MachineBooking(description=description, machine_id=machine_id,
                             user_id=user.id, created_at=datetime.datetime.now(), start=start, end=end, approved=False)
    session.add(booking)
    session.commit()
    return object_as_dict(booking)


@bookings_router.post("/workstation/create")
async def create_workstation_booking(workstation_id: int, start: datetime.datetime, end: datetime.datetime, description: str, email: str):
    user = session.query(User).filter(User.email == email).first()
    booking = WorkstationBooking(description=description, workstation_id=workstation_id,
                                 user_id=user.id, created_at=datetime.datetime.now(), start=start, end=end, approved=False)
    session.add(booking)
    session.commit()
    return object_as_dict(booking)


@bookings_router.post("/component/create")
async def create_component_booking(component_id: int, returndate: datetime.datetime, description: str, email: str):
    user = session.query(User).filter(User.email == email).first()
    booking = ComponentBooking(description=description, component_id=component_id,
                               user_id=user.id, created_at=datetime.datetime.now(), returndate=returndate, approved=False)
    session.add(booking)
    session.commit()
    return object_as_dict(booking)
