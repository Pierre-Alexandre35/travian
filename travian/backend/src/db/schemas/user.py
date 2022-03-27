from pydantic import BaseModel

class User(BaseModel):
    id: str
    email: str
    pwd: bytes
    salt: bytes

