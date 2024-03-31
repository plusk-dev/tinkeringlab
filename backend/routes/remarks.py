from fastapi import FastAPI, Depends
from models import Admin, Component, OtherRequest, Remark, Session, Workstation, session, User
import datetime
import json
from utils import object_as_dict

remarks_router = FastAPI()

@remarks_router.post("/create")
async def create_remark(content: str, email: str, request_type:str, request_id:int):
	user = session.query(User).filter(User.email == email).first()
	if user is None:
	    user = session.query(Admin).filter(Admin.email == email).first()
	remark = Remark(content=content, writer_id=user.id, request_id=request_id, request_type=request_type, created_at = datetime.datetime.now())
	session.add(remark)
	session.commit()
	return object_as_dict(remark)

@remarks_router.get("/get_remarks")
async def get_remarks(request_id: int, request_type: str):
	remarks = session.query(Remark).filter(Remark.request_id == request_id, Remark.request_type == request_type).all()
	return json.dumps([object_as_dict(i) for i in remarks], default=str)