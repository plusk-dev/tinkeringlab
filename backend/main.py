from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from models import session, Admin, User
from fastapi.responses import JSONResponse
from routes import bookings_router, inventory_router
from utils import get_credential, object_as_dict, verify_jwt, look_for_emails_to_send
import re
import jwt
import datetime

email_regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
JWT_SECRET = get_credential("JWT_SECRET")
app = FastAPI()
app.mount("/bookings", bookings_router)
app.mount("/inventory", inventory_router)
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
        )
        )
        session.add(User(
            student_id="2023uma0201",
            email="2023uma0201@iitjammu.ac.in",
            name="Abhay Punia",
            created_at=datetime.datetime.now(),
        ))
        session.add(User(
            student_id="2022ucs0108",
            email="2022ucs0108@iitjammu.ac.in",
            name="Satvic Theone",
            created_at=datetime.datetime.now(),
        ))
        print("APP STARTED")
        session.commit()


async def on_shutdown():
    print("APP SHUT")

app.add_event_handler("startup", on_startup)
app.add_event_handler("shutdown", on_shutdown)


@app.get("/")
async def index(name: str):
    return {"status": name}


@app.get("/get_level")
async def get_level(email: str):
    user = session.query(User).filter_by(email=email).first()
    if user is None:
        admin = session.query(Admin).filter_by(email=email).first()
        if admin is None:
            return JSONResponse(content={
                "error": "user with the provided email does not exist."
            })
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


@app.post("/verify_token")
async def verify(request: Request):
    return await verify_jwt(request)
