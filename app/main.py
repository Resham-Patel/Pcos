from fastapi import FastAPI

app = FastAPI(
    title="PCOS Detection System",
    description="AI-powered PCOS monitoring backend",
    version="1.0"
)

@app.get("/")
def home():
    return {"message": "PCOS backend running"}