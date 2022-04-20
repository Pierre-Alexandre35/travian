import hashlib
import os
import hmac
from datetime import datetime, timedelta
import jwt
from fastapi.security import OAuth2PasswordBearer
from src.core.config import SECRET_KEY, AUTH_TOKEN_ALGO

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/token")


def password_hash(password: str) -> tuple[bytes, bytes]:
    salt = os.urandom(16)
    hashed_password = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 100000)
    return (hashed_password, salt)


def password_verify(pw_hash: bytes, salt: bytes, password: str) -> bool:
    return hmac.compare_digest(
        pw_hash, hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 100000)
    )


def create_access_token(*, data: dict, expires_delta: timedelta = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=AUTH_TOKEN_ALGO)
    return encoded_jwt
