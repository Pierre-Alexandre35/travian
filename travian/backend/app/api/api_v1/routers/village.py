from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.db.crud import create_user_village
from app.db.schemas import VillageCreate, VillageOut
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
    Create a new village. The owner is automatically set from the authenticated user.
    """
    try:
        new_village = create_user_village(db, village, owner_id=current_user.id)
        return new_village
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
