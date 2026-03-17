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