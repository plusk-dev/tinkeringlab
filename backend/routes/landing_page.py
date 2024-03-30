from fastapi import FastAPI, Depends, UploadFile, Request
from fastapi.responses import JSONResponse
from utils import verify_jwt_admin, object_as_dict
from models import Event, session
import datetime
import aiofiles
import uuid
import json
import os

landing_router = FastAPI()


@landing_router.get("/all")
async def get_all(user=Depends(verify_jwt_admin)):
    return JSONResponse(content=json.dumps([object_as_dict(event) for event in session.query(Event).all()], sort_keys=True, default=str), status_code=200)


@landing_router.post("/create")
async def create(request: Request):
    data = await request.form()
    filename = str(uuid.uuid4())+"."+data['in_file'].filename.split(".")[-1]
    event = Event(title=data['title'], description=data['description'],
                  event_date=datetime.datetime.strptime(data['event_date'].replace('"', ''), "%Y-%m-%dT%H:%M:%S.%fZ"), created_at=datetime.datetime.now(), on_landing_page=False, img_name=filename)
    async with aiofiles.open(f"static/{filename}.", 'wb') as out_file:
        content = await data['in_file'].read()
        await out_file.write(content)
    session.add(event)
    session.commit()
    return object_as_dict(event)


@landing_router.post("/update")
async def change_visibility(id: int):
    event = session.query(Event).filter(Event.id == id).first()
    event.on_landing_page = not event.on_landing_page
    session.commit()
    return object_as_dict(event)


@landing_router.post("/delete")
async def delete_workstation(id: int):
    c = session.query(Event).filter(Event.id == id).first()
    if c != None:
        os.remove("static/"+c.img_name)
        session.delete(c)
        session.commit()
        return {"message": "deleted successfully"}
    return {"message": "event does not exist in the database"}
