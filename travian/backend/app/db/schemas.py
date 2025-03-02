from pydantic import BaseModel
import typing as t


class TribeBase(BaseModel):
    name: str  # Romans, Teutons, Gauls


class TribeOut(TribeBase):
    id: int  # Tribe ID

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str
    is_active: bool = True
    is_superuser: bool = False
    first_name: str = None
    last_name: str = None
    tribe_id: int


class VillageBase(BaseModel):
    name: str
    x: int
    y: int
    population: int
    owner_id: int = None


class VillageCreate(VillageBase):
    pass


class UserOut(UserBase):
    tribe: TribeOut

    class Config:
        orm_mode = True


class VillageOut(VillageBase):
    pass


class UserCreate(UserBase):
    password: str

    class Config:
        orm_mode = True


class UserEdit(UserBase):
    password: t.Optional[str] = None

    class Config:
        orm_mode = True


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str = None
    permissions: str = "user"
