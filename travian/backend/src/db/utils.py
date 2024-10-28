from src.core.config import (
    DATABASE_HOST,
    DATABASE_NAME,
    DATABASE_PASSWORD,
    DATABASE_PORT,
    DATABASE_USERNAME,
)
from src.db.conn import Database


def get_db() -> Database:
    yield Database(
        DATABASE_HOST,
        DATABASE_USERNAME,
        DATABASE_PASSWORD,
        DATABASE_PORT,
        DATABASE_NAME,
    )
