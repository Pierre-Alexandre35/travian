from fastapi import APIRouter, Depends
from src.db.utils import get_db
from src.core.auth import get_current_user
from src.db.services.village import (
    create_village,
    get_village_infos,
    get_user_villages,
)
from src.db.utils import get_db
from src.db.schemas.villages import NewVillage

village_router = village = APIRouter()


@village.post("/")
def insert_village(
    village: NewVillage, session=Depends(get_db), current_user=Depends(get_current_user)
):
    create_village(session, current_user.id, village)
    return {"dd": village}


"""
@village.get("/{village_id}")
def village_infos(
    village_id: int, session=Depends(get_db), current_user=Depends(get_current_user)
):
    return get_village_infos(village_id, session)
"""


@village.get("/abcd")
def abcd(session=Depends(get_db), current_user=Depends(get_current_user)):
    return get_user_villages(session, user_id=current_user.id)
