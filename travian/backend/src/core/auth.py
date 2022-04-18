from src.db.crud.user import create_user, get_user_by_username, user_exits
from src.db.schemas.user import UserCreate
from src.core.security import password_verify
from src.db.conn import Database


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
