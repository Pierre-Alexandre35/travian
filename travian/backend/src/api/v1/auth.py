from fastapi import APIRouter, Depends
from src.db.crud.user import create_user
from src.db.schemas.user import UserCreate
from src.db.utils import get_db

auth_router = r = APIRouter()


@r.get("/aa", response_model=UserCreate, response_model_exclude_none=True)
async def user_create(user: UserCreate, db=Depends(get_db)):
    """
    Create a new user
    """
    return create_user(user, db)
