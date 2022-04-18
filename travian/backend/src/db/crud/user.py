from src.db.schemas.user import UserCreate, UserAuth
from src.db.conn import Database
from src.core.security import password_hash


def create_user(session: Database, user: UserCreate) -> UserCreate:
    hashed_password, salt = password_hash(user.password)
    sql = """
        INSERT INTO userss (username, password, salt) 
        VALUES (%s, %s, %s)
        """
    params = (user.username, hashed_password, salt)
    session.update_rows(sql, params)
    return user


def user_exits(session: Database, username: str) -> bool:
    sql = """
        SELECT COUNT(id) 
        FROM userss 
        WHERE username = (%s)
        """
    params = [username]
    records = session.select_rows_dict_cursor(sql, params)
    return records[0][0] == 1


def get_user_by_username(session: Database, username: str) -> UserAuth:
    sql = """
        SELECT username, password, salt
        FROM userss 
        WHERE username = (%s)
        """
    params = [username]
    records = session.select_rows_dict_cursor(sql, params)

    return UserAuth(
        username=records[0][0], password=bytes(records[0][1]), salt=bytes(records[0][2])
    )
