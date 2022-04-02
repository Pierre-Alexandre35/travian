from src.db.schemas.user import User
from src.db.conn import Database
from src.core.security import password_hash


def create_user(user: User, session: Database):
    hashed_password, salt = password_hash(user.password)
    sql = """
        INSERT INTO userss (username, password, salt) 
        VALUES (%s, %s, %s)
        """
    params = (user.username, hashed_password, salt)
    session.update_rows(sql, params)
