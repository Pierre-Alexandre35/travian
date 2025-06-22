from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.db.crud import (
    create_user_village,
    get_villages_by_owner_id,
    get_village_by_id_and_owner,
    get_village_by_name_and_owner,
    get_village_production,
)
from app.db.schemas import (
    VillageCreate,
    VillageOut,
    VillageProductionOut,
    ResourceProduction,
)
from app.core.auth import get_current_active_user
from app.db.models import User

village_router = APIRouter()


@village_router.post(
    "/villages", response_model=VillageOut, response_model_exclude_none=True
)
async def village_create(
    village: VillageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """
    Create a new village for the current user.
    """
    return create_user_village(db, village, owner_id=current_user.id)


@village_router.get(
    "/villages/",
    response_model=List[VillageOut],
    response_model_exclude_none=True,
)
async def list_user_villages(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """
    List all villages owned by the current authenticated user.
    """
    return get_villages_by_owner_id(db=db, owner_id=current_user.id)


@village_router.get(
    "/villages/{village_id}",
    response_model=VillageOut,
    response_model_exclude_none=True,
)
async def get_my_village(
    village_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """
    Get a specific village owned by the current authenticated user.
    """
    return get_village_by_id_and_owner(db, village_id, current_user.id)


@village_router.get(
    "/villages/name/{village_name}",
    response_model=VillageOut,
    response_model_exclude_none=True,
)
async def get_village_by_name(
    village_name: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """
    Get a specific village by its unique name, owned by the current user.
    """
    return get_village_by_name_and_owner(db, village_name, current_user.id)


@village_router.get(
    "/villages/{village_id}/production",
    response_model=VillageProductionOut,
    response_model_exclude_none=True,
)
async def get_village_resource_production(
    village_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    # Get village for name & auth check
    village = get_village_by_id_and_owner(db, village_id, current_user.id)

    # Get raw production totals per resource type
    raw_production = get_village_production(db, village_id, current_user.id)

    # Construct validated response
    return VillageProductionOut(
        village_id=village.id,
        village_name=village.name,
        production=[
            ResourceProduction(resource_type=res, total=int(total or 0))
            for res, total in raw_production
        ],
    )
