# app/services/resource_service.py
from datetime import datetime
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.schemas.village import VillageResourceOut
from app.schemas.resource import ResourceBalance
from app.repositories import village_repo, resource_repo, building_repo
import app.db.models as db


def _cap_for(resource_name: str, wh_cap: int, gr_cap: int) -> int:
    # Wood/Clay/Iron use Warehouse capacity, Crop uses Granary
    if resource_name == "Crop":
        return gr_cap
    return wh_cap


def accrue_and_get_balances(
    db_sess: Session,
    village_id: int,
    owner_id: int,
    now: datetime | None = None,
) -> VillageResourceOut:
    now = now or datetime.utcnow()

    v = village_repo.get_village_by_id_and_owner(db_sess, village_id, owner_id)
    if not v:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND, detail="Village not found"
        )

    # Lock storages to avoid double-accrual under concurrency
    storages = resource_repo.load_storages_for_update(db_sess, village_id)

    # Precompute production rates per resource_id
    rate_by_res_id = village_repo.get_production_by_resource_id(
        db_sess, village_id
    )  # per hour

    # Capacities from buildings
    wh_cap, gr_cap = building_repo.get_storage_caps(db_sess, village_id)

    # Accrue & clamp
    for s in storages:
        rid = s.resource_type_id
        rname = getattr(s.resource_type.name, "value", s.resource_type.name)
        rate_per_hour = rate_by_res_id.get(rid, 0)
        elapsed = (now - s.last_updated).total_seconds()
        gain = int((rate_per_hour / 3600.0) * max(elapsed, 0))
        cap = _cap_for(rname, wh_cap, gr_cap)

        s.stored_amount = min(
            s.stored_amount + gain, cap if cap else s.stored_amount + gain
        )
        s.last_updated = now

    db_sess.commit()

    # Build response
    balances = [
        ResourceBalance(
            resource_type=getattr(
                s.resource_type.name, "value", s.resource_type.name
            ),
            amount=s.stored_amount,
            # If/when you extend your schema, you can also return capacity/percent/is_full here
        )
        for s in storages
    ]

    return VillageResourceOut(
        village_id=v.id, village_name=v.name, resources=balances
    )
