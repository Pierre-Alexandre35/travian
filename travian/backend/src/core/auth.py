import jwt
from fastapi import Depends
from src.db.crud.user import create_user, get_user_by_email, user_exits
from src.db.schemas.user import UserCreate, UserJWTToken
from src.core.security import password_verify, oauth2_scheme
from src.core.config import SECRET_KEY, AUTH_TOKEN_ALGO
from src.db.conn import Database
from src.db.utils import get_db


def sign_up_new_user(session: Database, email: str, password: str) -> UserJWTToken:
    user = user_exits(session, email)
    if user:
        return False  # User already exists
    return create_user(session, UserCreate(email=email, password=password))


def authenticate_user(session: Database, email: str, password: str) -> UserCreate:
    user = user_exits(session, email)
    if not user:
        return False  # User does not exists
    returning_user = get_user_by_email(session, email)
    if password_verify(returning_user.password, returning_user.salt, password):
        return returning_user
    return False


async def get_current_user(
    session=Depends(get_db), token: str = Depends(oauth2_scheme)
) -> None:
    payload = jwt.decode(token, SECRET_KEY, algorithms=[AUTH_TOKEN_ALGO])
    return None
