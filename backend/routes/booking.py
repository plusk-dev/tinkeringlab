from fastapi import FastAPI, Depends, Request
from fastapi.responses import JSONResponse
from utils import object_as_dict, verify_jwt_admin, JWT_SECRET
from models import Admin, MachineBooking, ComponentBooking, OtherRequest, WorkstationBooking, session, User,Component
import jwt
import datetime
import uuid
import aiofiles

bookings_router = FastAPI()


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
async def create_component_booking(request: Request):
    data = await request.form()
    img_name = None
    if data["file"] != "undefined":
        img_name = "request_files/" + str(uuid.uuid4())+"."+data['file'].filename.split(".")[-1]
        async with aiofiles.open(f"static/{img_name}.", 'wb') as out_file:
            content = await data['file'].read()
            await out_file.write(content)
    user = session.query(User).filter(User.email == data["email"]).first()
    booking = ComponentBooking(description=data["description"], component_id=data["component_id"],
                               user_id=user.id, created_at=datetime.datetime.now(), returndate=datetime.datetime.strptime(data['returndate'].replace('"', ''), "%Y-%m-%dT%H:%M:%S.%fZ"), approved=False, img_name=img_name)
    session.add(booking)
    session.commit()
    response = object_as_dict(booking)
    response["component"] = object_as_dict(session.query(Component).filter(Component.id == data["component_id"]).first())
    return response

    
@bookings_router.post("/component/decision")
async def component_decision(request: Request, decision: bool, request_id: int):
    booking = session.query(ComponentBooking).filter(ComponentBooking.id == request_id).first()
    email = jwt.decode(request.headers["token"], JWT_SECRET, algorithms="HS256")["email"]
    approver = session.query(Admin).filter(Admin.email == email).first()
    booking.approver_id = approver.id
    booking.approved = decision
    return object_as_dict(booking)

@bookings_router.post("/workstation/decision")
async def workstation_decision(request: Request, decision: bool, request_id: int):
    booking = session.query(WorkstationBooking).filter(WorkstationBooking.id == request_id).first()
    email = jwt.decode(request.headers["token"], JWT_SECRET, algorithms="HS256")["email"]
    approver = session.query(Admin).filter(Admin.email == email).first()
    booking.approver_id = approver.id
    booking.approved = decision
    return object_as_dict(booking)


@bookings_router.post("/session/decision")
async def session_decision(request: Request, decision: bool, request_id: int):
    booking = session.query(MachineBooking).filter(MachineBooking.id == request_id).first()
    email = jwt.decode(request.headers["token"], JWT_SECRET, algorithms="HS256")["email"]
    approver = session.query(Admin).filter(Admin.email == email).first()
    booking.approver_id = approver.id
    booking.approved = decision
    return object_as_dict(booking)

@bookings_router.post("/intern/decision")
async def intern_decision(request: Request, decision: bool, request_id: int):
    booking = session.query(OtherRequest).filter(OtherRequest.id == request_id).first()
    email = jwt.decode(request.headers["token"], JWT_SECRET, algorithms="HS256")["email"]
    approver = session.query(Admin).filter(Admin.email == email).first()
    booking.approver_id = approver.id
    booking.approved = decision
    return object_as_dict(booking)


