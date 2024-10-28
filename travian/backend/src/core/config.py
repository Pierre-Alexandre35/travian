import os

from dotenv import load_dotenv

load_dotenv(dotenv_path="local.env")

# FastAPI
AUTH_TOKEN_ALGO = os.getenv("AUTH_TOKEN_ALGO")
SECRET_KEY = os.getenv("SECRET_KEY")

# Database
DATABASE_ENGINE = "POSTGRES"
DATABASE_HOST = os.getenv("DATABASE_HOST")
DATABASE_USERNAME = os.getenv("DATABASE_USERNAME")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
DATABASE_PORT = os.getenv("DATABASE_PORT")
DATABASE_NAME = os.getenv("DATABASE_NAME")
