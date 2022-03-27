from numpy import byte
from pydantic import BaseModel

class User(BaseModel):
    username: str
    password: bytes
    salt: bytes