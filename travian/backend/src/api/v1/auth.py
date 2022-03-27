from fastapi import APIRouter, Depends, HTTPException, status
from src.db.crud import create_user
from src.db.schemas.user import *
auth_router = r = APIRouter()

@r.post("/register")
async def register(user: User):
    return user.username


@r.post("/users", response_model=User, response_model_exclude_none=True)
async def user_create(
    request: Request,
    user: UserCreate,
    db=Depends(get_db),
    current_user=Depends(get_current_active_superuser),
):
    """
    Create a new user
    """
    return create_user(db, user)