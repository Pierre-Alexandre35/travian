from fastapi import APIRouter, Depends
from src.db.utils import get_db
from src.core.auth import get_current_user
from src.db.services.village import get_villages, create_village, get_village_infos
from src.db.utils import get_db
from src.db.schemas.villages import NewVillage

village_router = village = APIRouter()


@village.post("/")
def insert_village(
    village: NewVillage, session=Depends(get_db), current_user=Depends(get_current_user)
):
    create_village(session, current_user.user_id, village)
    return {"dd": village}


@village.get("/")
def get_all(session=Depends(get_db), current_user=Depends(get_current_user)):
    user_villages = get_villages(session, current_user.user_id).villages
    return user_villages


@village.get("/{village_id}")
def village_infos(
    village_id: int, session=Depends(get_db), current_user=Depends(get_current_user)
):
    return get_village_infos(village_id, session)
