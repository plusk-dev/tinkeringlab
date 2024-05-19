from fastapi import FastAPI, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from models import session, Admin, User
from fastapi.responses import JSONResponse
from routes import bookings_router, inventory_router, landing_router, intern_router, remarks_router
from utils import get_credential, object_as_dict, verify_jwt, verify_jwt_admin
from fastapi.staticfiles import StaticFiles
from models import MachineBooking, WorkstationBooking, OtherRequest, ComponentBooking
import re
import jwt
import datetime
import json

email_regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
JWT_SECRET = get_credential("JWT_SECRET")
app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/bookings", bookings_router)
app.mount("/inventory", inventory_router)
app.mount("/landing", landing_router)
app.mount("/interns", intern_router)
app.mount("/remarks", remarks_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


async def on_startup():
    admin = session.query(Admin).filter_by(
        email="2023uma0224@iitjammu.ac.in").first()
    if admin is None:
        session.add(Admin(
            email="2023uma0224@iitjammu.ac.in",
            name="Yuvraj Motiramani",
            phone="6355291145",
            admin=True,
            lab_tech=False,
            tl_head=False
        )
        )
        session.commit()
    print("APP STARTED")


async def on_shutdown():
    print("APP SHUT")

app.add_event_handler("startup", on_startup)
app.add_event_handler("shutdown", on_shutdown)


@app.get("/")
async def index(name: str):
    return {"status": name}


@app.get("/get_level")
async def get_level(email: str, name: str):
    user = session.query(User).filter_by(email=email).first()
    if user is None:
        print("user is none")
        admin = session.query(Admin).filter_by(email=email).first()
        if admin is None:
            print("admin is none")
            user = User(
                name=name,
                student_id=email.split("@")[0].upper(),
                created_at=datetime.datetime.now(),
                email=email
            )
            session.add(user)
            session.commit()
            return {
                "level": "user",
                "user": object_as_dict(user)
            }
        return {
            "level": "admin",
            "admin": object_as_dict(admin)
        }
    return {
        "level": "user",
        "user": object_as_dict(user)
    }


@app.post("/get_new_token")
async def get_new_token(email: str):
    if re.fullmatch(email_regex, email):
        token = jwt.encode(payload={
            "email": email,
            "iat": datetime.datetime.utcnow()
        }, key=JWT_SECRET)
        return {
            "token": token
        }
    else:
        return JSONResponse(content={
            "error": "email provided is not a valid email"
        }, status_code=400)


def process(data, type):
    for i in range(len(data)):
        data[i]['user'] = object_as_dict(session.query(
            User).filter(User.id == data[i]['user_id']).first())
        data[i]['type'] = type
    return data


@app.get("/requests/all")
async def get_all():
    try:
        data = [{**object_as_dict(booking), "user": object_as_dict(session.query(User).filter(User.id == booking.user_id).first()), "type": "session"} for booking in session.query(MachineBooking)]+[{**object_as_dict(booking), "user": object_as_dict(session.query(User).filter(User.id == booking.user_id).first()), "type": "component"} for booking in session.query(ComponentBooking)]+[
            {**object_as_dict(booking), "user": object_as_dict(session.query(User).filter(User.id == booking.user_id).first()), "type": "workstation"} for booking in session.query(WorkstationBooking)]+[{**object_as_dict(booking), "user": object_as_dict(session.query(User).filter(User.id == booking.user_id).first()), "type": "other"} for booking in session.query(OtherRequest)]
        data = json.dumps(
            sorted(data, key=lambda x: x['created_at'], reverse=True), default=str)
        return JSONResponse(content=data, status_code=200)
    except:
        return {}
    # component_bookings = [object_as_dict(
    #     booking) for booking in session.query(ComponentBooking).all()]
    # component_bookings = process(component_bookings, 'component')
    # machine_bookings = [object_as_dict(
    #     booking) for booking in session.query(MachineBooking).all()]
    # machine_bookings = process(machine_bookings, 'machine')
    # workstation_bookings = [object_as_dict(
    #     booking) for booking in session.query(WorkstationBooking).all()]
    # workstation_bookings = process(workstation_bookings, 'workstation')
    # component_bookings.extend(machine_bookings)
    # component_bookings.extend(workstation_bookings)
    # return component_bookings


@app.get("/users/all")
async def get_all_users():
    print([object_as_dict(user) for user in session.query(Admin)])
    return json.dumps([object_as_dict(user) for user in session.query(User)] + [object_as_dict(user) for user in session.query(Admin)], default=str)


@app.post("/verify_token")
async def verify(request: Request):
    return await verify_jwt(request)


@app.post("/verify_token_admin")
async def verify_admin(request: Request):
    return await verify_jwt_admin(request)
