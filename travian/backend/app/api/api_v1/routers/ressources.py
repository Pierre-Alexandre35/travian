from fastapi import APIRouter, Request, Depends, Response, encoders
import typing as t

from app.db.session import get_db

from app.schemas.user import UserCreate, UserEdit, User, UserOut
from app.core.auth import get_current_active_user, get_current_active_superuser

ressources_router = r = APIRouter()
