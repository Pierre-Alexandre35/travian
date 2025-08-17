#!/bin/bash
set -e

# Default env file
ENV_FILE="backend/.env.local"

# Parse CLI arguments
while [[ "$#" -gt 0 ]]; do
  case $1 in
    -e|--env)
      ENV_FILE="$2"
      shift 2
      ;;
    *)
      echo "❌ Unknown option: $1"
      exit 1
      ;;
  esac
done

echo "🔧 Starting containers..."
docker-compose --env-file "$ENV_FILE" up -d

if [ ! -f "$ENV_FILE" ]; then
  echo "⚠️  Env file '$ENV_FILE' not found, falling back to config.py defaults"
else
  echo "✅ Using env file: $ENV_FILE"
fi

echo "⏳ Waiting for Postgres to be ready inside Docker..."
until docker-compose exec -T postgres pg_isready -U pierre > /dev/null 2>&1; do
  echo "⏳ Postgres not ready yet..."
  sleep 1
done

docker compose run --rm backend bash -lc "cd /app && python -m alembic upgrade head"
docker compose run --rm backend bash -lc "cd /app && python -m alembic revision --autogenerate -m 'init schema'"
docker compose run --rm backend bash -lc "cd /app && python -m alembic upgrade head"

echo "🌱 Seeding initial data..."
docker-compose run --rm backend python3 app/seed.py
docker-compose run --rm backend python3 app/sample_data.py

echo "✅ Done."
