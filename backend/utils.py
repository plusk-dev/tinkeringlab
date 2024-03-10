import json
import os
import smtplib
import ssl
import jwt
import requests
import datetime
from fastapi import Request
from sqlalchemy import inspect
from models import User, session
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi.responses import JSONResponse

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


def generate_email():
    # TODO: This func should read a html email template and then return it as string
    pass


def send_email():
    try:
        server = smtplib.SMTP(get_credential(
            "SMTP_SERVER"), get_credential("PORT"))
        server.ehlo()
        server.starttls(context=context)
        server.ehlo()
        server.login(get_credential("SENDER_EMAIL"),
                     get_credential("EMAIL_PASSWORD"))
        html = """\
        <html>
        <body>
            <h1>LMFAOOOOOO</h1>
        </body>
        </html>
        """
        message = MIMEMultipart("alternative")
        message["Subject"] = "helo lmao"
        message["From"] = get_credential("SENDER_EMAIL")
        message.attach(MIMEText(html, "html"))
        server.sendmail(get_credential("SENDER_EMAIL"),
                        "2023uma0201@iitjammu.ac.in", message.as_string())
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


JWT_TOKEN_TIMEOUT = datetime.timedelta(days=7)
JWT_SECRET = get_credential("JWT_SECRET")


async def verify_jwt(reqeust: Request) -> dict:
    token = reqeust.headers.get("token")
    if token == None:
        return JSONResponse(
            content={
                "error": "jwt not provided"
            }, status_code=400
        )
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms="HS256")
        if datetime.datetime.utcnow() - datetime.datetime.utcfromtimestamp(payload.get("iat")) >= JWT_TOKEN_TIMEOUT:
            return JSONResponse(
                content={
                    "error": "jwt expired"
                }, status_code=401)
        email = payload.get("email")
        if email is None:
            return JSONResponse(
                content={
                    "error": "jwt does not contain email"
                }, status_code=400
            )
        user = session.query(User).filter_by(email=email).first()
        if user is None:
            return JSONResponse(
                content={
                    "error": "no user with the provied email exists"
                }, status_code=400
            )
        return object_as_dict(user)
    except jwt.InvalidTokenError:
        return JSONResponse(content={
            "error": "invalid jwt provided"
        }, status_code=400)
