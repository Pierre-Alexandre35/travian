from typing import List
from .base import AppBaseModel
from .resource import ResourceTypeOut


class TileResourceOut(AppBaseModel):
    resource_type: ResourceTypeOut
    amount: int


class MapTileOut(AppBaseModel):
    id: int
    x: int
    y: int
    is_constructible: bool
    resource_layouts: List[TileResourceOut] = []
