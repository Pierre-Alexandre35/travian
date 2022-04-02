# pylint: disable=no-name-in-module)
from pydantic import BaseModel


class User(BaseModel):
    username: str
    password: str


class UserCreate(User):
    tmp: str
