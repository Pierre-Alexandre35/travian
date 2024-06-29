import jwt
from fastapi import Depends, HTTPException, status
from src.db.services.user import create_user, get_user_by_email, user_exits
from src.db.schemas.user import UserCreate
from src.db.schemas.token import TokenData
from src.core.security import password_verify, oauth2_scheme
from src.core.config import SECRET_KEY, AUTH_TOKEN_ALGO
from src.db.conn import Database
from src.db.utils import get_db


def sign_up_new_user(session: Database, email: str, password: str) -> int:
    user = user_exits(session, email)
    if user:
        return False  # User already exists
    return create_user(session, UserCreate(email=email, password=password))


def authenticate_user(session: Database, email: str, password: str) -> UserCreate:
    user = user_exits(session, email)
    if not user:
        return False  # User does not exist
    returning_user = get_user_by_email(session, email)
    if password_verify(returning_user.password, returning_user.salt, password):
        return returning_user
    return False


async def get_current_user(
    session=Depends(get_db), token: str = Depends(oauth2_scheme)
) -> UserCreate:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[AUTH_TOKEN_ALGO])
        email: str = payload.get("email")
        id: int = payload.get("id")
        if email is None or id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        token_data = TokenData(id=id, email=email)
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = get_user_by_email(session, token_data.email)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user
