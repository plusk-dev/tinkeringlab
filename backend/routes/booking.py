from fastapi import FastAPI, Depends
from utils import verify_jwt, object_as_dict
from models import MachineBooking, ComponentBooking, WorkstationBooking, session, User
import datetime

bookings_router = FastAPI()


@bookings_router.get("/all")
async def get_all(user=Depends(verify_jwt)):
    return {
        "machine_bookings": [object_as_dict(booking) for booking in session.query(MachineBooking).filter_by(user_id=user["id"])],
        "component_bookings": [object_as_dict(booking) for booking in session.query(ComponentBooking).filter_by(user_id=user["id"])],
        "workstation_bookings": [object_as_dict(booking) for booking in session.query(WorkstationBooking).filter_by(user_id=user["id"])]
    }


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
