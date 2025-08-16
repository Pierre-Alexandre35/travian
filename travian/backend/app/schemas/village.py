from typing import List
from .base import AppBaseModel
from .map import MapTileOut
from .resource import ResourceProduction, ResourceBalance


class VillageBase(AppBaseModel):
    name: str
    map_tile_id: int
    population: int


class VillageCreate(VillageBase):
    pass


class VillageOut(AppBaseModel):
    id: int
    name: str
    population: int
    tile: MapTileOut


class VillageProductionOut(AppBaseModel):
    village_id: int
    village_name: str
    production: List[ResourceProduction]


class VillageResourceOut(AppBaseModel):
    village_id: int
    village_name: str
    resources: List[ResourceBalance]
