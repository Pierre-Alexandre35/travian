import datetime
from uuid import uuid4
from src.db.schemas.user import UserAuth, UserCreate, UserJWTToken
from src.db.conn import Database
from src.core.security import password_hash


def create_user(session: Database, user: UserCreate) -> UserJWTToken:
    uuid = str(uuid4())
    now = datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    hashed_password, salt = password_hash(user.password)
    is_active = True
    is_superuser = False
    sql = """
        INSERT INTO users (uuid, email, active, superuser, created_on, password, password_salt) 
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
    params = (uuid, user.email, is_active, is_superuser, now, hashed_password, salt)
    session.update_rows(sql, params)
    return UserJWTToken(uuid=uuid, email=user.email)


def user_exits(session: Database, email: str) -> bool:
    sql = """
        SELECT COUNT(user_id) 
        FROM users 
        WHERE email = (%s)
        """
    params = [email]
    records = session.select_rows_dict_cursor(sql, params)
    return records[0][0]


def get_user_by_email(session: Database, email: str) -> UserAuth:
    sql = """
        SELECT uuid, email, password, password_salt
        FROM users 
        WHERE email = (%s)
        """
    params = [email]
    records = session.select_rows_dict_cursor(sql, params)
    return UserAuth(
        uuid=str(records[0][0]),
        email=records[0][1],
        password=bytes(records[0][2]),
        salt=bytes(records[0][3]),
    )
