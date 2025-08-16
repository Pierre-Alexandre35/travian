from typing import List
from .base import AppBaseModel


class ResourceTypeOut(AppBaseModel):
    name: str


class ResourceProduction(AppBaseModel):
    resource_type: str
    total: int


class ResourceBalance(AppBaseModel):
    resource_type: str
    amount: int
    # When you’re ready to expose caps:
    # capacity: int | None = None
    # is_full: bool | None = None
    # percent: int | None = None
