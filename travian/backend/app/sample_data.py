from faker import Faker
from app.db.session import SessionLocal
from app.db.models import TribeAttributes, Tribe, MapTile, Village, User
from app.core.security import get_password_hash
from sqlalchemy.orm import Session
from app.db.schemas import VillageCreate
import random

fake = Faker()


def insert_fake_users_and_villages_bulk(db: Session, count: int = 100):
    tribe = db.query(TribeAttributes).filter_by(name=Tribe.ROMANS.value).first()
    if not tribe:
        raise ValueError("Romans tribe not found!")

    # Fetch available map tiles
    free_tiles = (
        db.query(MapTile)
        .outerjoin(Village, MapTile.id == Village.map_tile_id)
        .filter(Village.id == None)
        .limit(count)
        .all()
    )
    if len(free_tiles) < count:
        print(
            f"⚠️ Only {len(free_tiles)} free tiles available, creating {len(free_tiles)} villages"
        )
        count = len(free_tiles)

    users = []
    villages = []

    for i in range(count):
        email = fake.unique.email()
        password = get_password_hash(fake.password(length=12))
        is_superuser = fake.boolean(chance_of_getting_true=10)

        user = User(
            email=email,
            hashed_password=password,
            is_active=True,
            is_superuser=is_superuser,
            tribe_id=tribe.id,
        )
        users.append(user)

    db.bulk_save_objects(users)
    db.flush()  # flush to populate user IDs

    for i, tile in enumerate(free_tiles):
        village = Village(
            name=fake.city(),
            map_tile_id=tile.id,
            owner_id=users[i].id,
            population=random.randint(50, 500),
        )
        villages.append(village)

    db.bulk_save_objects(villages)
    db.commit()

    print(f"✅ Bulk created {count} users and villages.")


if __name__ == "__main__":
    db = SessionLocal()
    try:
        insert_fake_users_and_villages_bulk(db, count=100)
    finally:
        db.close()
