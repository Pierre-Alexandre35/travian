from typing import List, Optional
from .base import AppBaseModel


class ResourceCost(AppBaseModel):
    resource_type: str  # e.g., "WOOD"
    amount: int


class BuildingPrerequisiteOut(AppBaseModel):
    required_building: str  # building name
    required_level: int


class BuildingLevelOut(AppBaseModel):
    level: int
    time: int  # build time in seconds (or minutes depending on your logic)
    cost: List[ResourceCost]
    prerequisites: Optional[List[BuildingPrerequisiteOut]] = []


class BuildingTypeOut(AppBaseModel):
    name: str
    description: Optional[str] = None
    levels: List[BuildingLevelOut]


class BuildingCatalogOut(AppBaseModel):
    tribe: Optional[str] = None  # only if you want to expose it
    buildings: List[BuildingTypeOut]
