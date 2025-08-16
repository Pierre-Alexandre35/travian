from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Optional

from app.db.session import get_db
from app.services import building_service
from app.schemas.building import BuildingTypeOut

building_router = APIRouter()


@building_router.get(
    "/buildings/",
    response_model=List[BuildingTypeOut],
    response_model_exclude_none=True,
)
async def list_buildings(
    tribe_id: Optional[int] = None,
    db: Session = Depends(get_db),
):
    """
    List all building types and their levels, costs, and prerequisites.
    Optionally filter by `tribe_id`.
    """
    return building_service.list_building_catalog(db_sess=db)
