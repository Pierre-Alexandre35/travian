from typing import Iterable, Dict
from sqlalchemy.orm import Session
from sqlalchemy import func
import app.db.models as db


def building_code_to_type_id(db_sess: Session) -> Dict[str, int]:
    rows = db_sess.query(db.BuildingType).all()
    return {getattr(b.name, "value", b.name): b.id for b in rows}


def insert_buildings(
    db_sess: Session, village_id: int, specs: Iterable[tuple[int, int, int]]
) -> None:
    rows = []
    for btype_id, level, instances in specs:
        for i in range(1, instances + 1):
            rows.append(
                db.VillageBuilding(
                    village_id=village_id,
                    building_type_id=btype_id,
                    instance_no=i,
                    level=level,
                )
            )
    if rows:
        db_sess.bulk_save_objects(rows)
