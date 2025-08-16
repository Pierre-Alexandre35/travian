from __future__ import annotations

import random
from faker import Faker
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
import app.db.models as db
from app.core.crypto import get_password_hash  # No FastAPI import

fake = Faker()


def seed_tribes(sess: Session) -> None:
    existing = {t.name for t in sess.query(db.TribeAttributes).all()}
    payload = [
        (db.Tribe.ROMANS, "Build simultaneously"),
        (db.Tribe.TEUTONS, "Fast looting"),
        (db.Tribe.GAULS, "Great defense"),
    ]
    for name, bonus in payload:
        if name not in existing:
            sess.add(db.TribeAttributes(name=name, bonus=bonus))
    sess.flush()
    print("✅ Tribes seeded")


def seed_resources(sess: Session) -> None:
    existing = {r.name for r in sess.query(db.ResourcesTypes).all()}
    for res in db.Resource:
        if res not in existing:
            sess.add(db.ResourcesTypes(name=res))
    sess.flush()
    print("✅ Resources seeded")


def seed_production(sess: Session) -> None:
    if sess.query(db.Production).count() > 0:
        print("ℹ️ Production already present; skipping.")
        return

    resources = sess.query(db.ResourcesTypes).all()
    if not resources:
        raise ValueError("Resources must be seeded before production.")

    for res in resources:
        for level in range(0, 6):
            production_value = 10 * (level + 3)
            sess.add(
                db.Production(
                    resource_type_id=res.id,
                    level=level,
                    production_value=production_value,
                )
            )
    sess.flush()
    print("✅ Production seeded")


def seed_admin_user(sess: Session) -> None:
    email = "admin@example.com"
    if sess.query(db.User).filter_by(email=email).first():
        print("ℹ️ Admin user already exists; skipping.")
        return

    tribe = (
        sess.query(db.TribeAttributes).filter_by(name=db.Tribe.ROMANS).first()
    )
    if not tribe:
        raise ValueError("Romans tribe must be seeded first.")

    hashed = get_password_hash("admin123")
    admin = db.User(
        email=email,
        hashed_password=hashed,
        is_superuser=True,
        is_active=True,
        tribe_id=tribe.id,
    )
    sess.add(admin)
    sess.flush()
    print(f"✅ Admin user created ({email} / admin123)")


def seed_map_tiles(
    sess: Session, size: int = 100, constructible_ratio: float = 0.9
) -> None:
    if sess.query(db.MapTile).count() > 0:
        print("ℹ️ Map tiles already exist; skipping.")
        return

    resource_types = {r.name: r for r in sess.query(db.ResourcesTypes).all()}
    if not resource_types:
        raise ValueError("Resources must be seeded before tiles.")

    layout_templates = [
        [
            (db.Resource.CROP, 15),
            (db.Resource.WOOD, 1),
            (db.Resource.CLAY, 1),
            (db.Resource.IRON, 1),
        ],
        [
            (db.Resource.CROP, 9),
            (db.Resource.WOOD, 3),
            (db.Resource.CLAY, 3),
            (db.Resource.IRON, 3),
        ],
        [
            (db.Resource.CROP, 6),
            (db.Resource.WOOD, 4),
            (db.Resource.CLAY, 4),
            (db.Resource.IRON, 4),
        ],
        [
            (db.Resource.CROP, 5),
            (db.Resource.WOOD, 5),
            (db.Resource.CLAY, 4),
            (db.Resource.IRON, 4),
        ],
        [
            (db.Resource.CROP, 5),
            (db.Resource.WOOD, 4),
            (db.Resource.CLAY, 5),
            (db.Resource.IRON, 4),
        ],
        [
            (db.Resource.CROP, 5),
            (db.Resource.WOOD, 4),
            (db.Resource.CLAY, 4),
            (db.Resource.IRON, 5),
        ],
    ]
    layout_weights = [0.02, 0.05, 0.31, 0.21, 0.21, 0.20]

    layouts: list[db.MapTileResourceLayout] = []
    total_tiles = 0
    constructible_tiles = 0

    for x in range(size):
        for y in range(size):
            is_constructible = random.random() < constructible_ratio
            tile = db.MapTile(x=x, y=y, is_constructible=is_constructible)
            sess.add(tile)
            sess.flush()  # Need tile.id
            total_tiles += 1

            if is_constructible:
                constructible_tiles += 1

            # Always assign a layout
            chosen_layout = random.choices(
                layout_templates, weights=layout_weights, k=1
            )[0]
            for res_name, amount in chosen_layout:
                layouts.append(
                    db.MapTileResourceLayout(
                        map_tile_id=tile.id,
                        resource_type_id=resource_types[res_name].id,
                        amount=amount,
                    )
                )

    if layouts:
        sess.bulk_save_objects(layouts)
    sess.flush()
    print(
        f"✅ Map tiles and layouts seeded ({total_tiles} tiles, {constructible_tiles} constructible)"
    )


def seed_warehouse_and_granary_capacity(sess: Session) -> None:
    existing_g = {c.level for c in sess.query(db.GranaryCapacity).all()}
    existing_w = {c.level for c in sess.query(db.WarehouseCapacity).all()}

    granary_capacity_values = {
        0: 400,
        1: 1700,
        2: 3400,
        3: 5100,
        4: 6800,
        5: 8500,
        6: 10200,
        7: 11900,
        8: 13600,
        9: 15300,
        10: 17000,
    }
    warehouse_capacity_values = {
        0: 500,
        1: 800,
        2: 1550,
        3: 2350,
        4: 3200,
        5: 4100,
        6: 5050,
        7: 6050,
        8: 7100,
        9: 8200,
        10: 9350,
    }

    for level, cap in granary_capacity_values.items():
        if level not in existing_g:
            sess.add(db.GranaryCapacity(level=level, capacity=cap))
    for level, cap in warehouse_capacity_values.items():
        if level not in existing_w:
            sess.add(db.WarehouseCapacity(level=level, capacity=cap))

    sess.flush()
    print("✅ Granary & Warehouse capacities seeded")


def main() -> None:
    sess = SessionLocal()
    print("🔍 DB URL:", sess.get_bind().engine.url)
    try:
        seed_tribes(sess)
        seed_resources(sess)
        seed_production(sess)
        seed_admin_user(sess)
        seed_map_tiles(sess, size=100, constructible_ratio=0.9)
        seed_warehouse_and_granary_capacity(sess)
        sess.commit()
        print("🌱 Seeding completed")
    except Exception as e:
        sess.rollback()
        print(f"❌ Seeding failed: {e}")
        raise
    finally:
        sess.close()


if __name__ == "__main__":
    main()
