import os
from logging.config import fileConfig
from alembic import context
from sqlalchemy import engine_from_config, pool
from app.db.models import Base

# Alembic Config object
config = context.config

# Configure logging
fileConfig(config.config_file_name)

# Target metadata
target_metadata = Base.metadata

# List of system tables to ignore (PostGIS, Census, and Tiger tables)
EXCLUDED_TABLES = {
    "spatial_ref_sys",  # PostGIS spatial reference system table
    "topology",  # PostGIS topology table
    "layer",
    "geocode_settings",
    "edges",
    "faces",
    "addr",
    "place",
    "zip_lookup",
    "county_lookup",
    "state_lookup",
    "tract",
    "zcta5",  # Census ZIP Code Tabulation Areas
    "tabblock20",  # Census Tabulation Blocks
    "loader_variables",
    "featnames",
    "zip_state_loc",
    "cousub",
    "zip_state",
    "pagc_gaz",
    "secondary_unit_lookup",
    "zip_lookup_base",
    "direction_lookup",
    "geocode_settings_default",
    "bg",
    "countysub_lookup",
    "zip_lookup_all",
    "state",
    "pagc_rules",
    "county",
    "loader_lookuptables",
    "pagc_lex",
    "loader_platform",
    "tabblock",
    "place_lookup",
    "addrfeat",
    "street_type_lookup",
}


def include_object(object, name, type_, reflected, compare_to):
    """Exclude PostGIS and system tables from Alembic autogenerate."""
    if type_ == "table" and name in EXCLUDED_TABLES:
        return False  # Do NOT include these tables in migrations
    return True  # Process other tables normally


def get_url():
    """Fetch database URL from environment variables."""
    return os.getenv("DATABASE_URL")


def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    url = get_url()
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        include_schemas=True,
        dialect_opts={"paramstyle": "named"},
        include_object=include_object,  # Use the filter function
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode."""
    configuration = config.get_section(config.config_ini_section)
    configuration["sqlalchemy.url"] = get_url()
    connectable = engine_from_config(
        configuration,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            include_object=include_object,  # Use the filter function
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
