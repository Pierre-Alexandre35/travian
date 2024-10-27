from fastapi import APIRouter, Depends
from src.db.utils import get_db
from src.core.auth import get_current_user
from src.db.services.village import (
    create_village,
    get_village_infos,
    get_user_villages,
)
from src.db.utils import get_db
from src.db.schemas.villages import NewVillage, NewVillageRequest, UserVillages

village_router = village = APIRouter()


@village.post("/create_village", response_model=NewVillage)
def new_village(
    village_data: NewVillageRequest,
    session=Depends(get_db),
    current_user=Depends(get_current_user),
):
    new_village = NewVillage(
        name=village_data.name,
        owner_id=current_user.id,
        position_id=village_data.position_id,
        population=village_data.population,
    )
    village_created = create_village(session, current_user.id, new_village)
    return village_created


"""
@village.get("/{village_id}")
def village_infos(
    village_id: int, session=Depends(get_db), current_user=Depends(get_current_user)
):
    return get_village_infos(village_id, session)
"""


@village.get("/all_villages", response_model=UserVillages)
def get_all_villages(session=Depends(get_db), current_user=Depends(get_current_user)):
    return get_user_villages(session, user_id=current_user.id)
