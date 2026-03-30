from fastapi import FastAPI
from app.database import Base, engine
from app.models.user_model import User
from app.models.symptom_model import Symptoms
from app.models.prediction_model import Prediction
from app.models.chat_model import Chat
from app.routes.auth_routes import router as auth_router
from app.routes.prediction_routes import router as prediction_router
from app.routes.symptom_routes import router as symptom_router
from app.routes import recommendation_routes 
app = FastAPI()

# Create tables
Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "DB Connected"}

app.include_router(auth_router)
app.include_router(prediction_router)
app.include_router(symptom_router)
app.include_router(recommendation_routes.router)