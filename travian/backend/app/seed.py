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
    MapTileResourceLayout,
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
    resources = [Resource.WOOD, Resource.CLAY, Resource.IRON, Resource.CROP]
    for res in resources:
        session.add(ResourcesTypes(name=res))
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

    resource_types = {r.name: r for r in session.query(ResourcesTypes).all()}
    if not resource_types:
        raise ValueError("Resources must be seeded before tiles.")

    layouts = []

    # Define layout templates with weighted probabilities
    layout_templates = [
        [
            (Resource.CROP, 15),
            (Resource.WOOD, 1),
            (Resource.CLAY, 1),
            (Resource.IRON, 1),
        ],  # super rare
        [
            (Resource.CROP, 9),
            (Resource.WOOD, 3),
            (Resource.CLAY, 3),
            (Resource.IRON, 3),
        ],  # rare
        [
            (Resource.CROP, 6),
            (Resource.WOOD, 4),
            (Resource.CLAY, 4),
            (Resource.IRON, 4),
        ],  # normal 1
        [
            (Resource.CROP, 5),
            (Resource.WOOD, 5),
            (Resource.CLAY, 4),
            (Resource.IRON, 4),
        ],  # normal 2
        [
            (Resource.CROP, 5),
            (Resource.WOOD, 4),
            (Resource.CLAY, 5),
            (Resource.IRON, 4),
        ],  # normal 3
        [
            (Resource.CROP, 5),
            (Resource.WOOD, 4),
            (Resource.CLAY, 4),
            (Resource.IRON, 5),
        ],  # normal 4
    ]
    layout_weights = [0.02, 0.05, 0.31, 0.21, 0.21, 0.20]

    for x in range(size):
        for y in range(size):
            is_constructible = random.random() < constructible_ratio
            tile = MapTile(x=x, y=y, is_constructible=is_constructible)
            session.add(tile)
            session.flush()

            if is_constructible:
                chosen_layout = random.choices(
                    layout_templates, weights=layout_weights, k=1
                )[0]
                for res_name, amount in chosen_layout:
                    layouts.append(
                        MapTileResourceLayout(
                            map_tile_id=tile.id,
                            resource_type_id=resource_types[res_name].id,
                            amount=amount,
                        )
                    )

    session.bulk_save_objects(layouts)
    session.flush()
    print(
        f"✅ Map tiles and layouts seeded ({size*size} tiles, with probabilities applied)"
    )


def main():
    session = SessionLocal()
    print("🔍 DB URL from session:", session.get_bind().engine.url)
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
