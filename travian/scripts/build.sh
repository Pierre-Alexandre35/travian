#!/bin/bash
set -e

echo "🔧 Starting containers..."
docker-compose up -d

echo "⏳ Waiting for Postgres..."
until docker exec travian-postgres-1 pg_isready -U pierre > /dev/null 2>&1; do
  sleep 1
done

echo "📦 Generating Alembic migration..."
docker-compose run --rm backend alembic revision --autogenerate -m "init schema"

echo "🚀 Applying Alembic migrations..."
docker-compose run --rm backend alembic upgrade head

echo "🌱 Seeding initial data..."
docker-compose run --rm backend python3 app/initial_data.py

echo "✅ Done."
