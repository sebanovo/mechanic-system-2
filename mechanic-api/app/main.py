from fastapi import FastAPI

from app.core.database import check_database_connection

app = FastAPI()


@app.get("/")
async def root() -> dict:
    return {"message": "Mechanic API running...Endpoint: /health/db"}


@app.get("/api/health/db")
async def health_db() -> dict:
    return check_database_connection()