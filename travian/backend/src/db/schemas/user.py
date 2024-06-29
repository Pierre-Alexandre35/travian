# pylint: disable=no-name-in-module, too-few-public-methods
from pydantic import BaseModel

class TokenData(BaseModel):
    id: int
    email: str

class UserCreate(BaseModel):
    """Input required to create a new User"""

    email: str
    password: str


class UserAuth(BaseModel):
    """Input required to authenticate a returning user"""

    id: int
    uuid: str
    email: str
    password: bytes
    salt: bytes


class UserJWTToken(BaseModel):
    """current authenticated User data stored in the JWT Web Token"""

    id: str ##UUID
    email: str
