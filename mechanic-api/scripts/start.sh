#!/bin/sh
set -e

echo "Waiting for PostgreSQL at ${POSTGRES_SERV}:${POSTGRES_PORT}..."
while ! nc -z "${POSTGRES_SERV}" "${POSTGRES_PORT}"; do
  sleep 1
done

echo "Waiting for Redis at ${REDIS_HOST}:${REDIS_PORT}..."
while ! nc -z "${REDIS_HOST}" "${REDIS_PORT}"; do
  sleep 1
done

echo "PostgreSQL and Redis are ready."
echo "Running migrations..."

alembic upgrade head

echo "Starting FastAPI application..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload