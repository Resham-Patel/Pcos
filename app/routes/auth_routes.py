from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.user_schema import UserCreate, UserResponse
from app.schemas.auth_schema import LoginRequest, TokenResponse
from app.services.auth_service import register_user, login_user

router = APIRouter()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    return register_user(db, user.name, user.email, user.password)

@router.post("/login", response_model=TokenResponse)
def login(user: LoginRequest, db: Session = Depends(get_db)):
    token = login_user(db, user.email, user.password)

    if not token:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    return {"access_token": token, "token_type": "bearer"}