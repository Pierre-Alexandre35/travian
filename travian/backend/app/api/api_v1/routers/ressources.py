from fastapi import APIRouter, Request, Depends, Response, encoders
import typing as t

from app.db.session import get_db
from app.db.crud import (
    get_users,
    get_user,
    create_user,
    delete_user,
    edit_user,
)
from app.db.schemas import UserCreate, UserEdit, User, UserOut
from app.core.auth import get_current_active_user, get_current_active_superuser

ressources_router = r = APIRouter()
