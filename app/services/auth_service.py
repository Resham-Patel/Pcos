from sqlalchemy.orm import Session
from app.models.user_model import User
from app.utils.hash import hash_password, verify_password
from app.utils.token import create_access_token
from app.services.email_service import send_reset_email
import secrets


def register_user(db: Session, name: str, email: str, password: str):
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        return None

    user = User(
        name=name,
        email=email,
        password=hash_password(password)
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def login_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()

    if not user:
        return None

    if not verify_password(password, user.password):
        return None

    token = create_access_token({"sub": user.email, "user_id": user.id})
    return token


# 🔑 Generate reset token
def generate_reset_token():
    return secrets.token_urlsafe(32)


# 📩 Forgot Password
def forgot_password(db: Session, email: str):
    user = db.query(User).filter(User.email == email).first()

    if not user:
        return {"message": "If email exists, reset link sent"}

    token = generate_reset_token()

    user.reset_token = token
    db.commit()

    send_reset_email(user.email, token)

    return {"message": "Password reset email sent"}


# 🔁 Reset Password
def reset_password(db: Session, token: str, new_password: str):
    user = db.query(User).filter(User.reset_token == token).first()

    if not user:
        return {"message": "Invalid or expired token"}

    user.password = hash_password(new_password)
    user.reset_token = None

    db.commit()

    return {"message": "Password reset successful"}