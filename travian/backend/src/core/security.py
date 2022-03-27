import hashlib
import os
import hmac
from typing import List


def password_hash(password: str) -> tuple[bytes, bytes]:
    salt = os.urandom(16)
    hashed_password = hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100000)
    return (hashed_password, salt)


def password_verify(pw_hash: bytes, salt: bytes, password: str) -> bool:
    return hmac.compare_digest(
        pw_hash,
        hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100000)
    )
