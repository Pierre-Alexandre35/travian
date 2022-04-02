from src.db.schemas import user
from src.db.conn import Database
from src.core.security import password_hash, password_verify


def create_user(user: user.User, db: Database):
    hashed_password, salt = password_hash(user.password)
    sql = """
        INSERT INTO userss (username, password, salt)
        VALUES (%s, %s, %s)
        """
    params = (user.username, hashed_password, salt)
    db.update_rows(sql, params)
