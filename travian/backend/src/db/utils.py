from src.db.conn import Database
from src.core.config import *


def get_db():
    db = Database(
        DATABASE_HOST,
        DATABASE_USERNAME,
        DATABASE_PASSWORD,
        DATABASE_PORT,
        DATABASE_NAME,
    )
    try:
        yield db
    finally:
        "ok"
