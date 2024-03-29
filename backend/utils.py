import json
import os
import smtplib
import ssl
import jwt
import requests
import datetime
from fastapi import Request
from sqlalchemy import inspect
from models import User, session, Admin
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException

context = ssl.create_default_context()


def object_as_dict(obj):
    return {
        c.key: getattr(obj, c.key)
        for c in inspect(obj).mapper.column_attrs
    }


def get_credential(credential_name: str) -> str:
    data = json.load(open("../credentials.json"))
    if not data.get("production"):
        return data.get("credentials").get(credential_name)
    else:
        return os.environ[credential_name]


def generate_email(name: str, components: list, date: str):

    html = f"""
        <html>
        <head></head>
        <body>
        <p>Dear {name},</p>

        <p>We hope this message finds you well. This is a friendly reminder regarding the components borrowed from the Tinkering Lab. As per our records, the following components are due for return tomorrow:</p>

        <ul>
        {''.join([f"<li>{component}</li>" for component in components])}
        </ul>

        <p>Please ensure that these components are returned by {date}. Your prompt attention to this matter is greatly appreciated.</p>

        <p>If you encounter any issues or need assistance, please don't hesitate to contact us at [insert lab email].</p>

        <p>Thank you for your cooperation.</p>

        <p>Best regards,</p>
        <p>Tinkering Lab, IIT Jammu</p>
        <pre>This is a system generated email. Please do not reply to this email.</pre>
        </body>
        </html>
        """
    return html


def send_email():
    try:
        server = smtplib.SMTP(get_credential(
            "SMTP_SERVER"), get_credential("PORT"))
        server.ehlo()
        server.starttls(context=context)
        server.ehlo()
        server.login(get_credential("SENDER_EMAIL"),
                     get_credential("EMAIL_PASSWORD"))
        message = MIMEMultipart("alternative")
        message["Subject"] = "KAL COMPONENT WAAPIS KAR DENA"
        message["From"] = get_credential("SENDER_EMAIL")
        message.attach(MIMEText(generate_email("Satvic Dhawan", [
                       "Bottle", "Mouse", "Table", "Cocomelon"], date="25/03/2024"), "html"))
        server.sendmail(get_credential("SENDER_EMAIL"),
                        "2022ucs0108@iitjammu.ac.in", message.as_string())
    except Exception as e:
        raise e
    finally:
        server.quit()


def send_discord_message(content: str) -> None:
    message = {
        'content': content,
    }
    response = requests.post(get_credential("DISCORD_WEBHOOK_URL"), data=json.dumps(message),
                             headers={'Content-Type': 'application/json'})
    print(response.status_code)


JWT_TOKEN_TIMEOUT = datetime.timedelta(days=2)
JWT_SECRET = get_credential("JWT_SECRET")


async def verify_jwt(request: Request) -> JSONResponse:
    token = request.headers.get("token")
    if token == None:
        raise HTTPException(
            detail="Not logged in", status_code=401
        )
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms="HS256")
        if datetime.datetime.utcnow() - datetime.datetime.utcfromtimestamp(payload.get("iat")) >= JWT_TOKEN_TIMEOUT:
            raise HTTPException(
                detail="Session Expired. Please Log In Again", status_code=401)
        email = payload.get("email")
        if email is None:
            raise HTTPException(
                detail="Token does not contain email. Please log in again.", status_code=400
            )
        user = session.query(User).filter_by(email=email).first()
        if user is None:
            raise HTTPException(
                detail="No user with the provied email exists. Please try to log in again.", status_code=400
            )
        return object_as_dict(user)
    except jwt.InvalidTokenError:
        raise HTTPException(detail="invalid jwt provided", status_code=400)


async def verify_jwt_admin(request: Request) -> JSONResponse:
    token = request.headers.get("token")
    if token == None:
        raise HTTPException(
            detail="Not logged in", status_code=401
        )
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms="HS256")
        if datetime.datetime.utcnow() - datetime.datetime.utcfromtimestamp(payload.get("iat")) >= JWT_TOKEN_TIMEOUT:
            raise HTTPException(
                detail="Session Expired. Please Log In Again", status_code=401)
        email = payload.get("email")
        if email is None:
            raise HTTPException(
                detail="Token does not contain email. Please log in again.", status_code=400
            )
        user = session.query(Admin).filter_by(email=email).first()
        if user is None:
            raise HTTPException(
                detail="No user with the provied email exists. Please try to log in again.", status_code=400
            )
        return object_as_dict(user)
    except jwt.InvalidTokenError:
        raise HTTPException(detail="invalid jwt provided", status_code=400)


def look_for_emails_to_send():
    print("cute debug mesage")
