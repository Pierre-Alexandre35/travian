from typing import List, Optional
from .base import AppBaseModel


class BuildingTypeOut(AppBaseModel):
    id: int
    code: str
    display_name: str
    max_level: int
    is_stackable: bool


class BuildingLevelOut(AppBaseModel):
    building_type_id: int
    level: int
    construction_time: int


class BuildingUpgradeCostOut(AppBaseModel):
    resource_type: str
    amount: int
