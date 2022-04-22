# pylint: disable=no-name-in-module, too-few-public-methods
from pydantic import BaseModel


class CropTypes(BaseModel):
    wood: int
    clay: int
    iron: int
    corn: int


class MapPosition(BaseModel):
    """Input required to create a new User"""

    x_pos: str
    y_pos: str
    is_empty: bool
