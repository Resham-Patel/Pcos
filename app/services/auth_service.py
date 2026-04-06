from fastapi import HTTPException
import secrets
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.models.user_model import User
from app.utils.hash import hash_password, verify_password
from app.utils.token import create_access_token


# ---------------- REGISTER ----------------
def register_user(db: Session, name: str, email: str, password: str):
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(password[:72])

    new_user = User(
        name=name,
        email=email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "id": new_user.id,
        "name": new_user.name,
        "email": new_user.email
    }

# ---------------- LOGIN ----------------
def login_user(db: Session, email: str, password: str):

    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # bcrypt safe check
    if not verify_password(password[:72], user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({
        "sub": user.email,
        "user_id": user.id
        })

    return {
        "access_token": token,
        "token_type": "bearer"
    }


# ---------------- FORGOT PASSWORD ----------------
# temporary in-memory storage (for hackathon)
reset_tokens = {}

def forgot_password(db: Session, email: str):
    from app.utils.email import send_reset_email

    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    token = secrets.token_urlsafe(32)

    reset_tokens[token] = {
        "email": email,
        "expires": datetime.utcnow() + timedelta(minutes=15)
    }

    send_reset_email(email, token)

    return {"message": "Password reset link sent to email"}


# ---------------- RESET PASSWORD ----------------
def reset_password(db: Session, token: str, new_password: str):

    data = reset_tokens.get(token)

    if not data:
        raise HTTPException(status_code=400, detail="Invalid token")

    if data["expires"] < datetime.utcnow():
        del reset_tokens[token]
        raise HTTPException(status_code=400, detail="Token expired")

    if len(new_password) > 72:
        raise HTTPException(status_code=400, detail="Password too long")

    user = db.query(User).filter(User.email == data["email"]).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # update password safely
    user.password = hash_password(new_password[:72])
    db.commit()

    # remove token after use
    del reset_tokens[token]

    return {"message": "Password reset successful"}