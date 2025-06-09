from pydantic import BaseModel
import typing as t


class TribeBase(BaseModel):
    name: str  # Romans, Teutons, Gauls


class TribeOut(TribeBase):
    id: int  # Tribe ID

    class Config:
        orm_mode = True


class ResourceTypeOut(BaseModel):
    name: str

    class Config:
        orm_mode = True


class TileResourceOut(BaseModel):
    resource_type: ResourceTypeOut
    amount: int

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
    map_tile_id: int
    population: int


class VillageCreate(VillageBase):
    pass


class MapTileOut(BaseModel):
    id: int
    x: int
    y: int
    is_constructible: bool
    resource_layouts: t.List[TileResourceOut] = []

    class Config:
        orm_mode = True


class VillageOut(BaseModel):
    id: int
    name: str
    population: int
    tile: MapTileOut

    class Config:
        orm_mode = True


class UserOut(UserBase):
    tribe: TribeOut

    class Config:
        orm_mode = True


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
