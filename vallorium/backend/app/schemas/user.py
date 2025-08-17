from typing import Optional
from .base import AppBaseModel
from .tribe import TribeOut


class UserBase(AppBaseModel):
    email: str
    is_active: bool = True
    is_superuser: bool = False
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    tribe_id: int


class UserCreate(UserBase):
    password: str


class UserEdit(UserBase):
    password: Optional[str] = None


class User(UserBase):
    id: int


class UserOut(AppBaseModel):
    id: int
    email: str
    is_active: bool
    is_superuser: bool
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    tribe: Optional[TribeOut] = None
