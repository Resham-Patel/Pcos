from http.client import HTTPException
import secrets
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.models.user_model import User
from app.utils.hash import hash_password, verify_password
from app.utils.token import create_access_token

def register_user(db: Session, name: str, email: str, password: str):
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

    token = create_access_token({"sub": user.email})
    return token

# temporary in-memory storage (for hackathon)
reset_tokens = {}


def forgot_password(db, email: str):
    from app.utils.email import send_reset_email
    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # generate token
    token = secrets.token_urlsafe(32)

    # store token with expiry (15 mins)
    reset_tokens[token] = {
        "email": email,
        "expires": datetime.utcnow() + timedelta(minutes=15)
    }

    send_reset_email(email, token)
    return {
        "message": "Password reset link sent to email"
        }


def reset_password(db, token: str, new_password: str):
    data = reset_tokens.get(token)

    if not data:
        raise HTTPException(status_code=400, detail="Invalid token")

    if data["expires"] < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Token expired")

    user = db.query(User).filter(User.email == data["email"]).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # update password
    user.password = hash_password(new_password)
    db.commit()

    # remove token
    del reset_tokens[token]

    return {"message": "Password reset successful"}