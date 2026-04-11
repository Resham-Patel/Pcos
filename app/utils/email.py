import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

EMAIL = os.getenv("EMAIL_USER")
PASSWORD = os.getenv("EMAIL_PASS")


def send_reset_email(to_email, token):
    try:
        reset_link = f"http://localhost:5173/reset-password?token={token}"

        subject = "Password Reset Request"
        body = f"""
Hello,

You requested a password reset.

Click the link below to reset your password:

{reset_link}

If you did not request this, ignore this email.

- FemWell Team
"""

        msg = MIMEMultipart()
        msg["From"] = EMAIL
        msg["To"] = to_email
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))

        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(EMAIL, PASSWORD)

        server.send_message(msg)
        server.quit()

        print("Email sent successfully")

    except Exception as e:
        print("Email Error:", e)