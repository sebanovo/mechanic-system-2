from __future__ import annotations

import socket
import subprocess
import sys
import time
from pathlib import Path

from app.core.config import settings

PROJECT_ROOT = Path(__file__).resolve().parents[2]


def wait_for_database(timeout_seconds: int = 60) -> None:
    deadline = time.monotonic() + timeout_seconds
    last_error: Exception | None = None

    while time.monotonic() < deadline:
        try:
            with socket.create_connection(
                (settings.postgres_serv, settings.postgres_port),
                timeout=5,
            ):
                return
        except OSError as exc:
            last_error = exc
            time.sleep(1)

    raise RuntimeError(
        f"La base de datos no está disponible en {settings.postgres_serv}:{settings.postgres_port}"
    ) from last_error


def main() -> int:
    wait_for_database()
    result = subprocess.run(
        ["alembic", "upgrade", "head"],
        cwd=PROJECT_ROOT,
        check=False,
    )
    return result.returncode


if __name__ == "__main__":
    sys.exit(main())
