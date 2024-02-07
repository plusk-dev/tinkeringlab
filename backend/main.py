from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from models import session, Admin, User
from fastapi.responses import JSONResponse
from routes import auth_router
from utils import get_credential
import re
import jwt
import logging
import datetime

email_regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
JWT_SECRET = get_credential("JWT_SECRET")
app = FastAPI()
app.mount("/auth", auth_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def on_startup():
    admin = session.query(Admin).filter_by(email="2023uma0224@iitjammu.ac.in").first()
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
        session.add(User(
            student_id="2023uma0201",
            email="2023uma0201@iitjammu.ac.in",
            name="Abhay Punia",
            created_at=datetime.datetime.now()
        ))
        session.commit()
    logging.info("APP STARTED")


async def on_shutdown():
    print("APP SHUT")

app.add_event_handler("startup", on_startup)
app.add_event_handler("shutdown", on_shutdown)


@app.get("/")
async def index(name: str):
    return {"status": name}


@app.post("/get_new_token")
async def get_new_token(email: str):
    if re.fullmatch(email_regex, email):
        token = jwt.encode(payload={
            "email": email,
            "iat": datetime.datetime.utcnow()
        }, key=JWT_SECRET)
        return token
    else:
        return JSONResponse(message="email provided is not a valid email", status_code=400)
