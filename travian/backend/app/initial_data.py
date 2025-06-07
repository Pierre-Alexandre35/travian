from faker import Faker
from app.db.session import SessionLocal
from app.db.crud import create_user, create_user_village
from app.db.schemas import UserCreate, VillageCreate
from app.db.models import (
    TribeAttributes,
    Tribe,
    Resource,
    ResourcesTypes,
    Production,
)
from app.core.security import get_password_hash
from app.db.models import User

fake = Faker()


def seed_admin(db):
    existing_admin = db.query(User).filter(User.is_superuser == True).first()
    if existing_admin:
        print("Admin user already exists")
        return

    admin = User(
        email="admin@example.com",
        first_name="Admin",
        last_name="Root",
        hashed_password=get_password_hash(
            "admin123"
        ),  # ✅ Replace with secure pass in prod
        is_active=True,
        is_superuser=True,
        tribe_id=1,  # assume tribe_id 1 (Romans) exists
    )
    db.add(admin)
    db.commit()
    print("Admin user created: admin@example.com / admin123")


def seed_tribes(db):
    existing_tribes = db.query(TribeAttributes).count()
    if existing_tribes == 0:
        tribes = [
            TribeAttributes(name=Tribe.ROMANS),
            TribeAttributes(name=Tribe.TEUTONS),
            TribeAttributes(name=Tribe.GAULS),
        ]
        db.add_all(tribes)
        db.commit()
        print("Tribes seeded successfully")


def seed_resources(db):
    existing_resources = db.query(ResourcesTypes).count()
    if existing_resources == 0:
        resources = [
            ResourcesTypes(name=Resource.WOOD),
            ResourcesTypes(name=Resource.CLAY),
            ResourcesTypes(name=Resource.IRON),
            ResourcesTypes(name=Resource.CROP),
        ]
        db.add_all(resources)
        db.commit()
        print("Resources seeded successfully")


def calculate_production(level):
    return level * 5 + fake.random_int(min=1, max=4)


def seed_production(db):
    existing_production = db.query(Production).count()
    if existing_production == 0:
        resources = db.query(ResourcesTypes).all()
        productions = []
        for resource in resources:
            for level in range(21):  # Levels 0 to 20
                production_value = calculate_production(level)
                productions.append(
                    Production(
                        resource_type_id=resource.id,
                        level=level,
                        production_value=production_value,
                    )
                )

        db.add_all(productions)
        db.commit()
        print("Production values seeded successfully")


def insert_fake_data(db):
    romans_tribe = (
        db.query(TribeAttributes)
        .filter(TribeAttributes.name == Tribe.ROMANS)
        .first()
    )
    if not romans_tribe:
        raise ValueError("Tribe 'Romans' not found in database!")

    user = create_user(
        db,
        UserCreate(
            email=fake.email(),
            password=fake.password(length=12),
            is_active=True,
            is_superuser=fake.boolean(),
            tribe_id=romans_tribe.id,
        ),
    )

    if user and hasattr(user, "id"):
        create_user_village(
            db,
            VillageCreate(
                name=fake.city(),
                x=fake.random_int(min=-500, max=500),
                y=fake.random_int(min=-500, max=500),
                population=fake.random_int(min=50, max=500),
            ),
            owner_id=user.id,
        )


def init() -> None:
    db = SessionLocal()
    seed_tribes(db)
    seed_resources(db)
    seed_production(db)
    seed_admin(db)
    insert_fake_data(db)
    db.close()


if __name__ == "__main__":
    init()
    print("Random user and village created")
