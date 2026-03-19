from fastapi import FastAPI
from app.routes import auth_routes
from app.database import Base, engine, SessionLocal
from app.models.user_model import User

app = FastAPI()

# Create tables
Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "DB Connected"}

@app.get("/test-db")
def test_db():
    db = SessionLocal()
    new_user = User(email="test@gmail.com", password="1234")
    db.add(new_user)
    db.commit()
    db.close()
    return {"message": "Inserted"}