from fastapi import HTTPException, status
from sqlalchemy.orm import Session, joinedload
from sqlalchemy.exc import IntegrityError
import typing as t

from . import models, schemas
from app.core.security import get_password_hash
from sqlalchemy import func, and_


# =======================
# User CRUD
# =======================

from datetime import datetime


def update_village_resources(db: Session, village_id: int):
    now = datetime.utcnow()

    # Get all stored resources for the village
    storages = (
        db.query(models.VillageResourceStorage)
        .filter(models.VillageResourceStorage.village_id == village_id)
        .all()
    )

    for storage in storages:
        # Get total production per hour for this resource type
        prod = (
            db.query(models.Production)
            .join(
                models.VillageFarmPlot,
                models.VillageFarmPlot.resource_type_id
                == models.Production.resource_type_id,
            )
            .filter(
                models.VillageFarmPlot.village_id == village_id,
                models.Production.resource_type_id == storage.resource_type_id,
                models.Production.level == models.VillageFarmPlot.level,
            )
            .with_entities(
                func.sum(models.Production.production_value)
            )  # FIXED ✅
            .scalar()
            or 0
        )

        # Calculate new amount based on elapsed time
        seconds_elapsed = (now - storage.last_updated).total_seconds()
        gain = int((prod / 3600) * seconds_elapsed)
        storage.stored_amount += gain
        storage.last_updated = now

    db.commit()


def get_village_current_resources(
    db: Session, village_id: int, owner_id: int
) -> t.List[t.Tuple[str, int]]:
    # Ensure village belongs to the current user
    village = (
        db.query(models.Village)
        .filter(
            models.Village.id == village_id, models.Village.owner_id == owner_id
        )
        .first()
    )
    if not village:
        raise HTTPException(status_code=404, detail="Village not found")

    # Update the stored resources based on time and production
    update_village_resources(db, village_id)

    # Return fresh balances
    storages = (
        db.query(models.VillageResourceStorage)
        .join(models.ResourcesTypes)
        .filter(models.VillageResourceStorage.village_id == village_id)
        .all()
    )

    return [(s.resource_type.name, s.stored_amount) for s in storages]


def get_user(db: Session, user_id: int) -> models.User:
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


def get_user_by_email(db: Session, email: str) -> t.Optional[models.User]:
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(
    db: Session, skip: int = 0, limit: int = 100
) -> t.List[schemas.UserOut]:
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        is_active=user.is_active,
        is_superuser=user.is_superuser,
        hashed_password=hashed_password,
        tribe_id=user.tribe_id,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def edit_user(db: Session, user_id: int, user: schemas.UserEdit) -> models.User:
    db_user = get_user(db, user_id)
    update_data = user.dict(exclude_unset=True)

    if "password" in update_data:
        update_data["hashed_password"] = get_password_hash(
            update_data["password"]
        )
        del update_data["password"]

    for key, value in update_data.items():
        setattr(db_user, key, value)

    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, user_id: int) -> models.User:
    user = get_user(db, user_id)
    db.delete(user)
    db.commit()
    return user


# =======================
# Village CRUD
# =======================


def get_villages_by_owner_id(
    db: Session, owner_id: int
) -> t.List[models.Village]:
    return (
        db.query(models.Village)
        .options(joinedload(models.Village.tile))
        .filter(models.Village.owner_id == owner_id)
        .all()
    )


def get_village_by_id_and_owner(
    db: Session, village_id: int, owner_id: int
) -> models.Village:
    village = (
        db.query(models.Village)
        .options(joinedload(models.Village.tile))
        .filter(
            models.Village.id == village_id, models.Village.owner_id == owner_id
        )
        .first()
    )
    if not village:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail="Village not found or unauthorized",
        )
    return village


def get_village_by_name_and_owner(
    db: Session, village_name: str, owner_id: int
) -> models.Village:
    village = (
        db.query(models.Village)
        .options(joinedload(models.Village.tile))
        .filter(
            models.Village.name == village_name,
            models.Village.owner_id == owner_id,
        )
        .first()
    )
    if not village:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail="Village not found or unauthorized",
        )
    return village


from datetime import datetime
from sqlalchemy.orm import joinedload
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status
from app.db import models, schemas
from sqlalchemy.orm import Session


from datetime import datetime
from sqlalchemy.orm import joinedload
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status
from app.db import models, schemas
from sqlalchemy.orm import Session


def create_user_village(
    db: Session, village: schemas.VillageCreate, owner_id: int
) -> models.Village:
    from app.db.models import (
        VillageFarmPlot,
        MapTileResourceLayout,
        VillageResourceStorage,
    )

    # 1. Check if the tile is already occupied
    if (
        db.query(models.Village)
        .filter(models.Village.map_tile_id == village.map_tile_id)
        .first()
    ):
        raise HTTPException(
            status.HTTP_409_CONFLICT,
            detail=f"Map tile {village.map_tile_id} is already occupied.",
        )

    # 2. Retrieve the tile's resource layout
    resource_layouts = (
        db.query(MapTileResourceLayout)
        .filter(MapTileResourceLayout.map_tile_id == village.map_tile_id)
        .all()
    )

    if not resource_layouts:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail=f"No resource layout found for map tile {village.map_tile_id}.",
        )

    try:
        # 3. Create the village
        db_village = models.Village(
            name=village.name,
            map_tile_id=village.map_tile_id,
            population=village.population,
            owner_id=owner_id,
        )
        db.add(db_village)
        db.flush()  # Ensure village.id is available

        # 4. Create farm plots
        farms = []
        farm_number = 1
        for layout in resource_layouts:
            for _ in range(layout.amount):
                farms.append(
                    VillageFarmPlot(
                        village_id=db_village.id,
                        resource_type_id=layout.resource_type_id,
                        farm_number=farm_number,
                        level=0,
                    )
                )
                farm_number += 1
        db.add_all(farms)

        # 5. Add initial resources to VillageResourceStorage
        # Hardcoded starter pack: Wood:50, Clay:75, Iron:90, Crop:40
        starter_resources = {
            1: 50,  # WOOD (assume id=1)
            2: 75,  # CLAY (assume id=2)
            3: 90,  # IRON (assume id=3)
            4: 40,  # CROP (assume id=4)
        }

        initial_storage = [
            VillageResourceStorage(
                village_id=db_village.id,
                resource_type_id=resource_type_id,
                stored_amount=amount,
                last_updated=datetime.utcnow(),
            )
            for resource_type_id, amount in starter_resources.items()
        ]
        db.add_all(initial_storage)

        db.commit()
        db.refresh(db_village)

        return (
            db.query(models.Village)
            .options(joinedload(models.Village.tile))
            .filter(models.Village.id == db_village.id)
            .first()
        )

    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status.HTTP_409_CONFLICT,
            detail="Integrity error: map tile already taken or bad foreign key.",
        )


def get_village_production(db: Session, village_id: int, owner_id: int):
    return (
        db.query(
            models.ResourcesTypes.name,
            func.sum(models.Production.production_value),
        )
        .join(
            models.VillageFarmPlot,
            models.VillageFarmPlot.resource_type_id == models.ResourcesTypes.id,
        )
        .join(
            models.Production,
            and_(
                models.Production.resource_type_id
                == models.VillageFarmPlot.resource_type_id,
                models.Production.level == models.VillageFarmPlot.level,
            ),
        )
        .filter(models.VillageFarmPlot.village_id == village_id)
        .group_by(models.ResourcesTypes.name)
        .all()
    )
