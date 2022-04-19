from fastapi import Depends, HTTPException, status
from jwt import PyJWTError
import jwt
from src.db.crud.user import create_user, get_user_by_username, user_exits
from src.db.schemas.user import UserCreate
from src.db.schemas.token import TokenData
from src.core.security import password_verify, oauth2_scheme
from src.db.conn import Database
from src.db.utils import get_db
from src.core.exceptions import credentials_exception
from src.core.config import SECRET_KEY, AUTH_TOKEN_ALGO


def sign_up_new_user(session: Database, username: str, password: str) -> UserCreate:
    user = user_exits(session, username)
    if user:
        return False  # User already exists
    return create_user(session, UserCreate(username=username, password=password))


def authenticate_user(session: Database, username: str, password: str) -> UserCreate:
    user = user_exits(session, username)
    if not user:
        return False  # User does not exists

    returning_user = get_user_by_username(session, username)

    if password_verify(returning_user.password, returning_user.salt, password):
        return returning_user


def get_current_user(session=Depends(get_db), token: bytes = Depends(oauth2_scheme)):
    print(token)
    return "dd"
