from fastapi import APIRouter, Depends
from src.db.utils import get_db
from src.core.auth import get_current_user
from src.db.crud.village import get_villages
from src.db.utils import get_db
from src.db.schemas.villages import NewVillage

village_router = village = APIRouter()


@village.post("/")
def create_village(
    village: NewVillage, session=Depends(get_db), current_user=Depends(get_current_user)
):
    print(current_user.user_id)
    return {"dd": village}


@village.get("/")
def list_villages(session=Depends(get_db), current_user=Depends(get_current_user)):
    user_villages = get_villages(session, current_user.user_id).villages
    return user_villages
