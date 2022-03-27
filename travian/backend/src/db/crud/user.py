from src.db import schemas
from src.db.conn import Database as db
from src.core.security import password_hash, password_verify

def create_user(user: schemas.User):
    hashed_password, salt = password_hash(user.password)
    db.update_rows()
    return db_user
