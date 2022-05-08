# pylint: disable=no-name-in-module, too-few-public-methods
from turtle import position
from pydantic import BaseModel


class Village(BaseModel):

    village_id: int
    name: str
    owner_id: int
    location_id: int


class UserVillages(BaseModel):

    villages: list[Village]


class NewVillage(BaseModel):
    name: str
    population: int
    position_id: int


class VillageInfo(BaseModel):
    name: str
    population: int
    owner_id: int
    location_id: int
