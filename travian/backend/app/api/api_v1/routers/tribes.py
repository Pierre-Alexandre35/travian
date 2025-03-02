import typing as t
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models import TribeAttributes
from app.db.schemas import TribeOut, TribeBase

tribes_router = APIRouter()


@tribes_router.get("/tribes", response_model=t.List[TribeOut])
async def list_tribes(db=Depends(get_db)):
    """
    Get all available tribes
    """
    return db.query(TribeAttributes).all()


@tribes_router.post("/tribes", response_model=TribeOut)
async def create_tribe(tribe: TribeBase, db=Depends(get_db)):
    """
    Create a new tribe
    """
    db_tribe = TribeAttributes(name=tribe.name)
    db.add(db_tribe)
    db.commit()
    db.refresh(db_tribe)
    return db_tribe
