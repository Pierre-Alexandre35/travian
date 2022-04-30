from fastapi import APIRouter, Depends
from src.db.utils import get_db
from src.core.auth import get_current_user

village_router = village = APIRouter()


@village.get("/village")
async def new_village(current_user=Depends(get_current_user)):
    return {"token": str(current_user.user_id)}
