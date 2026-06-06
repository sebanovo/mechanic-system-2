#!/bin/sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PROJECT_ROOT=$(CDPATH= cd -- "${SCRIPT_DIR}/.." && pwd)

load_env_file() {
  env_file="$1"
  if [ -f "${env_file}" ]; then
    echo "[bootstrap] Loading environment from ${env_file}"
    set -a
    # shellcheck disable=SC1090
    . "${env_file}"
    set +a
    return 0
  fi
  return 1
}

load_env_file "${PROJECT_ROOT}/.env" || load_env_file "${PROJECT_ROOT}/../.env" || true

if [ -z "${POSTGRES_SERV:-}" ] || [ -z "${POSTGRES_PORT:-}" ]; then
  echo "[bootstrap] POSTGRES_SERV and POSTGRES_PORT must be defined."
  exit 1
fi

cd "${PROJECT_ROOT}"

echo "[bootstrap] Waiting for PostgreSQL at ${POSTGRES_SERV}:${POSTGRES_PORT}..."
while ! nc -z "${POSTGRES_SERV}" "${POSTGRES_PORT}"; do
  sleep 1
done

echo "[bootstrap] PostgreSQL is ready."
echo "[bootstrap] Running Alembic migrations..."
alembic upgrade head
echo "[bootstrap] Migrations completed."

if [ "${BOOTSTRAP_SEED_ENABLED:-false}" = "true" ]; then
  echo "[bootstrap] Running initial seeds..."
  python -m app.bootstrap.seed
  echo "[bootstrap] Seed stage completed."
else
  echo "[bootstrap] Seed stage disabled."
fi

echo "[bootstrap] Database bootstrap workflow completed."
