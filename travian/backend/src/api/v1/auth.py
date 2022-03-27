from fastapi import APIRouter, Depends, HTTPException, status
from src.db.crud.user import create_user
from src.db.schemas.user import User
auth_router = r = APIRouter()

@r.post("/register")
async def register(user: User):
    return user.username


@r.post("/users", response_model=User, response_model_exclude_none=True)
async def user_create(user: User):
    """
    Create a new user
    """
    return create_user(user)