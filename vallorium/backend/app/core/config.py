import os

PROJECT_NAME = "Vallorium API"

# SQLALCHEMY_DATABASE_URI = "postgresql://pierre:password@postgres:5432/pierre"
SQLALCHEMY_DATABASE_URI = os.environ["DATABASE_URL"]

API_V1_STR = "/api/v1"
