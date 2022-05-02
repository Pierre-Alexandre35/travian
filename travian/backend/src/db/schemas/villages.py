# pylint: disable=no-name-in-module, too-few-public-methods
from pydantic import BaseModel


class Village(BaseModel):

    village_id: int
    name: str
    owner_id: int
    location_id: int


class UserVillages(BaseModel):

    villages: list[Village]


class NewVillage(BaseModel):
    owner_id: int
    location_id: int
