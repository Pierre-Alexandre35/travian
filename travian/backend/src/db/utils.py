from src.db.conn import Database
from src.core.config import (
    DATABASE_HOST,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_PORT,
    DATABASE_NAME,
)


def get_db():
    yield Database(
        DATABASE_HOST,
        DATABASE_USERNAME,
        DATABASE_PASSWORD,
        DATABASE_PORT,
        DATABASE_NAME,
    )
