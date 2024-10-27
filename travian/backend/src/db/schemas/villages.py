# pylint: disable=no-name-in-module, too-few-public-methods
from turtle import position
from typing import Optional

from pydantic import BaseModel, Field


class Village(BaseModel):
    village_id: int
    name: str
    owner_id: int
    position_id: int
    population: int


class NewVillage(Village):
    village_id: Optional[int] = (
        None  # Assuming you may not always want to specify this at creation
    )


class NewVillageRequest(BaseModel):
    name: str
    position_id: int
    population: int = Field(
        default=0, ge=0
    )  # Ensures population is at least 0 by default


class UserVillages(BaseModel):

    villages: list[Village]
