#!/bin/bash
set -e

echo "🔧 Starting containers..."
docker-compose up -d

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
