#!/bin/sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PROJECT_ROOT=$(CDPATH= cd -- "${SCRIPT_DIR}/.." && pwd)

cd "${PROJECT_ROOT}"

sh scripts/bootstrap.sh

echo "[start] Starting FastAPI application..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
