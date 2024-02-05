import json
import os
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import requests


def get_credential(credential_name: str) -> str:
    data = json.load(open("credentials.json"))
    if not data.get("production"):
        return data.get("credentials").get(credential_name)
    else:
        return os.environ[credential_name]


context = ssl.create_default_context()


def generate_email():
    # TODO: This func should read a html email template and then return it as string
    pass


def send_email():
    try:
        server = smtplib.SMTP(get_credential("SMTP_SERVER"), get_credential("PORT"))
        server.ehlo()
        server.starttls(context=context)
        server.ehlo()
        server.login(get_credential("SENDER_EMAIL"), get_credential("EMAIL_PASSWORD"))
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
        server.sendmail(get_credential("SENDER_EMAIL"), "2023uma0201@iitjammu.ac.in", message.as_string())
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
