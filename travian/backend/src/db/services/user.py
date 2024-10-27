import datetime
from uuid import uuid4
from src.db.schemas import user as user_schemas
from src.db.conn import Database
from src.core.security import password_hash


def create_user(
    session: Database, user: user_schemas.UserCreate
) -> user_schemas.UserJWTToken:
    uuid = str(uuid4())
    now = datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    hashed_password, salt = password_hash(user.password)
    is_active = True
    is_superuser = False
    sql = """
        INSERT INTO transactions.users (uuid, email, active, superuser, created_on, password, password_salt, tribe_id) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
    params = (
        uuid,
        user.email,
        is_active,
        is_superuser,
        now,
        hashed_password,
        salt,
        "1",
    )
    session.update_rows(sql, params)
    return user_schemas.UserJWTToken(id=uuid, email=user.email)


def user_exits(session: Database, email: str) -> bool:
    sql = """
        SELECT COUNT(id) 
        FROM transactions.users 
        WHERE email = (%s)
        """
    params = [email]
    records = session.select_rows_dict_cursor(sql, params)
    return records[0][0]


def get_user_by_email(session: Database, email: str) -> user_schemas.UserAuth:
    sql = """
        SELECT id, uuid, email, password, password_salt
        FROM transactions.users 
        WHERE email = (%s)
        """
    params = [email]
    records = session.select_rows_dict_cursor(sql, params)
    return user_schemas.UserAuth(
        id=records[0][0],
        uuid=str(records[0][1]),
        email=records[0][2],
        password=bytes(records[0][3]),
        salt=bytes(records[0][4]),
    )
