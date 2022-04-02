from src.db.crud.user import create_user, user_exits
from src.db.schemas.user import UserCreate


def sign_up_new_user(session, username: str, password: str):
    user = user_exits(session, username)
    if user:
        return False  # User already exists
    return create_user(session, UserCreate(username=username, password=password))
