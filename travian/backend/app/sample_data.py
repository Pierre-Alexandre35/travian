from faker import Faker
from app.db.session import SessionLocal
from app.db.crud import create_user, create_user_village
from app.db.schemas import UserCreate, VillageCreate
from app.db.models import TribeAttributes, Tribe, MapTile, Village
from app.core.security import get_password_hash

fake = Faker()


def insert_fake_users_and_villages(db, count: int = 3):
    tribe = db.query(TribeAttributes).filter_by(name=Tribe.ROMANS.value).first()
    if not tribe:
        raise ValueError("Romans tribe not found!")

    created = 0

    free_tiles = (
        db.query(MapTile)
        .outerjoin(Village, MapTile.id == Village.map_tile_id)
        .filter(Village.id == None)
        .limit(count)
        .all()
    )

    for tile in free_tiles:
        user = create_user(
            db,
            UserCreate(
                email=fake.unique.email(),
                password=fake.password(length=12),
                is_active=True,
                is_superuser=fake.boolean(chance_of_getting_true=10),
                tribe_id=tribe.id,
            ),
        )

        create_user_village(
            db,
            VillageCreate(
                name=fake.city(),
                map_tile_id=tile.id,
                population=fake.random_int(min=50, max=500),
            ),
            owner_id=user.id,
        )
        created += 1

    print(f"✅ {created} villages created.")


if __name__ == "__main__":
    db = SessionLocal()
    try:
        insert_fake_users_and_villages(db, count=3)
    finally:
        db.close()
