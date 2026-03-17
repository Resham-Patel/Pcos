from fastapi import FastAPI
from app.routes import auth_routes
from app.database import Base, engine

app = FastAPI()

# Create tables
Base.metadata.create_all(bind=engine)

# Include routes
app.include_router(auth_routes.router)