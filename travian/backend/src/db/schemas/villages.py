# pylint: disable=no-name-in-module, too-few-public-methods
from turtle import position
from typing import Optional

from pydantic import BaseModel

class NewVillageResponse(BaseModel):
    name: str
    owner_id: int
    position_id: int
    population: int


class Village(BaseModel):
    village_id: int
    name: str
    owner_id: int
    position_id: int
    population: int


class NewVillage(Village):
    village_id: Optional[int]

    
class UserVillages(BaseModel):

    villages: list[Village]
