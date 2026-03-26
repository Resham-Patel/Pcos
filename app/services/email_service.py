import smtplib
from email.mime.text import MIMEText
import os
from dotenv import load_dotenv

load_dotenv()

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
print(EMAIL_USER, EMAIL_PASS)

def send_reset_email(to_email, token):
    subject = "PCOS App - Password Reset"
    
    body = f"""
    Click the link to reset your password:
    
    http://localhost:8000/reset-password?token={token}
    
    If you didn't request this, ignore it.
    """

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = EMAIL_USER
    msg["To"] = to_email

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASS)
        server.send_message(msg)