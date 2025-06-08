from faker import Faker
import random
from app.db.session import SessionLocal
from app.db.models import (
    TribeAttributes,
    Tribe,
    Resource,
    ResourcesTypes,
    Production,
    MapTile,
    User,
)
from app.core.security import get_password_hash

fake = Faker()


def seed_tribes(session):
    tribes = [
        {"name": Tribe.ROMANS.value, "bonus": "Build simultaneously"},
        {"name": Tribe.TEUTONS.value, "bonus": "Fast looting"},
        {"name": Tribe.GAULS.value, "bonus": "Great defense"},
    ]
    for tribe in tribes:
        session.add(TribeAttributes(name=tribe["name"], bonus=tribe["bonus"]))
    session.flush()
    print("✅ Tribes seeded")


def seed_resources(session):
    resources = [
        {"name": Resource.WOOD},
        {"name": Resource.CLAY},
        {"name": Resource.IRON},
        {"name": Resource.CROP},
    ]
    for res in resources:
        session.add(ResourcesTypes(name=res["name"]))
    session.flush()
    print("✅ Resources seeded")


def seed_production(session):
    resources = session.query(ResourcesTypes).all()
    if not resources:
        raise ValueError("Resources must be seeded before production.")

    for res in resources:
        for level in range(1, 6):  # levels 1 to 5
            production_value = 10 * level
            prod = Production(
                resource_type_id=res.id,
                level=level,
                production_value=production_value,
            )
            session.add(prod)
    session.flush()
    print("✅ Production seeded")


def seed_admin_user(session):
    email = "admin@example.com"
    password = "admin123"
    hashed = get_password_hash(password)

    tribe = (
        session.query(TribeAttributes)
        .filter_by(name=Tribe.ROMANS.value)
        .first()
    )
    if not tribe:
        raise ValueError("Romans tribe must be seeded first.")

    admin = User(
        email=email,
        hashed_password=hashed,
        is_superuser=True,
        is_active=True,
        tribe_id=tribe.id,
    )
    session.add(admin)
    session.flush()
    print(f"✅ Admin user created ({email} / {password})")


def seed_map_tiles(session, size=100, constructible_ratio=0.9):
    existing = session.query(MapTile).count()
    if existing > 0:
        print("ℹ️ Map tiles already exist.")
        return

    tiles = [
        MapTile(
            x=x,
            y=y,
            is_constructible=random.random() < constructible_ratio,
        )
        for x in range(size)
        for y in range(size)
    ]
    session.bulk_save_objects(tiles)
    session.flush()
    print(
        f"✅ Map tiles seeded ({size * size} tiles, ~{int(constructible_ratio * 100)}% constructible)"
    )


def main():
    session = SessionLocal()
    try:
        seed_tribes(session)
        seed_resources(session)
        seed_production(session)
        seed_admin_user(session)
        seed_map_tiles(session)
        session.commit()
        print("🌱 Seeding completed")
    except Exception as e:
        session.rollback()
        print(f"❌ Seeding failed: {e}")
    finally:
        session.close()


if __name__ == "__main__":
    main()
