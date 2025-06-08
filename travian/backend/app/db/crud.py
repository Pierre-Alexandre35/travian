from fastapi import HTTPException, status
from sqlalchemy.orm import Session, joinedload
from sqlalchemy.exc import IntegrityError
import typing as t

from . import models, schemas
from app.core.security import get_password_hash


# =======================
# User CRUD
# =======================


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


def create_user_village(
    db: Session, village: schemas.VillageCreate, owner_id: int
) -> models.Village:
    from app.db.models import VillageFarmPlot, ResourcesTypes, Resource

    # Check if tile is already taken
    if (
        db.query(models.Village)
        .filter(models.Village.map_tile_id == village.map_tile_id)
        .first()
    ):
        raise HTTPException(
            status.HTTP_409_CONFLICT,
            detail=f"Map tile {village.map_tile_id} is already occupied.",
        )

    try:
        db_village = models.Village(
            name=village.name,
            map_tile_id=village.map_tile_id,
            population=village.population,
            owner_id=owner_id,
        )
        db.add(db_village)
        db.flush()

        resource_map = {r.name: r.id for r in db.query(ResourcesTypes).all()}

        farm_plan = [
            (Resource.WOOD, 2),
            (Resource.CLAY, 2),
            (Resource.IRON, 2),
            (Resource.CROP, 3),
        ]

        farms = []
        farm_number = 1
        for resource, count in farm_plan:
            for _ in range(count):
                farms.append(
                    VillageFarmPlot(
                        village_id=db_village.id,
                        resource_type_id=resource_map[resource],
                        farm_number=farm_number,
                        level=0,
                    )
                )
                farm_number += 1

        db.add_all(farms)
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
