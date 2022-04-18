# pylint: disable=no-name-in-module, too-few-public-methods
from pydantic import BaseModel


class UserCreate(BaseModel):
    username: str
    password: str


class UserAuth(BaseModel):
    username: str
    password: bytes
    salt: bytes
