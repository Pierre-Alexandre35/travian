from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.db.session import get_db

health_router = APIRouter()


@health_router.get("/", tags=["health"])
async def health_check():
    return {"status": "ok"}


@health_router.get("/db", tags=["health"])
async def db_health_check(db: Session = Depends(get_db)):
    try:
        result = db.execute(text("SELECT 1"))
        result.scalar_one()
        return {"db": "ok"}
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database unreachable",
        )
