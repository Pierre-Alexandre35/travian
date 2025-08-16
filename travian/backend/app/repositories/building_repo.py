# app/repositories/building_repo.py
from __future__ import annotations
from typing import Optional, Sequence, Dict
from sqlalchemy.orm import Session, joinedload

import app.db.models as db


def fetch_building_catalog(
    db_sess: Session, *, tribe_id: Optional[int] = None
) -> Sequence[db.BuildingType]:
    """
    Return BuildingType ORM entities with levels, costs, and prerequisites
    eagerly loaded to avoid N+1 queries.
    """
    q = db_sess.query(db.BuildingType).options(
        joinedload(db.BuildingType.levels).joinedload(db.BuildingLevel.costs),
        joinedload(db.BuildingType.levels)
        .joinedload(db.BuildingLevel.prerequisites)
        .joinedload(db.BuildingPrerequisite.required_building_type),
    )
    if tribe_id is not None:
        q = q.filter(db.BuildingType.tribe_id == tribe_id)
    return q.all()


def resources_enum_name_by_id(db_sess: Session) -> Dict[int, str]:
    """
    Map resource_type_id -> enum name string ("WOOD", "CLAY", ...).
    Useful for building cost dicts in the service layer.
    """
    rows = db_sess.query(db.ResourcesTypes).all()
    return {
        r.id: r.name.name for r in rows
    }  # r.name is Enum -> .name is "WOOD"
