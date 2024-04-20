from fastapi import FastAPI
from fastapi.exceptions import HTTPException
from fastapi.responses import JSONResponse
from models import OtherRequest, session
from utils import object_as_dict
import datetime

intern_router = FastAPI()


@intern_router.post("/create")
async def create_other_request(name: str, email: str, remarks: str, professor_name: str, department: str, req_type: str):
    if session.query(OtherRequest).filter(OtherRequest.email == email).first() is None:
        req = OtherRequest(name=name, email=email, remarks=remarks, professor_name=professor_name, department=department, req_type=req_type, created_at = datetime.datetime.now())
        session.add(req)
        session.commit()
        return object_as_dict(req)
    raise HTTPException(detail="Request with given email already exists", status_code=401)