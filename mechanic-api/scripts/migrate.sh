#!/bin/sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PROJECT_ROOT=$(CDPATH= cd -- "${SCRIPT_DIR}/.." && pwd)

load_env_file() {
  env_file="$1"
  if [ -f "${env_file}" ]; then
    echo "[migrate] Loading environment from ${env_file}"
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
  echo "[migrate] POSTGRES_SERV and POSTGRES_PORT must be defined."
  exit 1
fi

cd "${PROJECT_ROOT}"

echo "[migrate] Starting manual migration workflow..."
exec python -m app.bootstrap.manual_migrate
