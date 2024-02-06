from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from models import session, Admin
from routes import auth_router
import logging
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/auth", auth_router)


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
    logging.info("APP STARTED")


async def on_shutdown():
    print("APP SHUT")

app.add_event_handler("startup", on_startup)
app.add_event_handler("shutdown", on_shutdown)


@app.get("/")
async def index(name: str):
    return {"status": name}


# async def common_paramters(q: str, skip: int, limit: int):
#     return {
#         "q": q,
#         "skip": skip,
#         "limit": limit
#     }


# @app.get("/testurl")
# async def testurl(parameters: Annotated[dict, Depends(common_paramters)], more: str):
#     return more
