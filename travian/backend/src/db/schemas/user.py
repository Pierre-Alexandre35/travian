<<<<<<< HEAD
from numpy import byte
from pydantic import BaseModel

class User(BaseModel):
    username: str
    password: bytes
    salt: bytes
=======
from pydantic import BaseModel

class User(BaseModel):
    id: str
    email: str
    pwd: bytes
    salt: bytes

>>>>>>> 1852f274b98ba05f84e7cc7257d5a54542ce6353
