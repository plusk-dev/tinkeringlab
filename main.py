from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import session, Admin

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def on_startup():
    admin = session.query(Admin).filter_by(email="2023uma0224@iitjammu.ac.in").first()
    if admin is not None:
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


async def on_shutdown():
    print("APP SHUT")

app.add_event_handler("startup", on_startup)
app.add_event_handler("shutdown", on_shutdown)


@app.get("/")
async def index(name: str):
    return {"status": name}
