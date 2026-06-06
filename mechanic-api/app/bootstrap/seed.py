from __future__ import annotations

from app.core.config import settings
from app.bootstrap.seeds.seed_runner import run_seed_pipeline


def main() -> int:
    if not settings.bootstrap_seed_enabled:
        return 0

    run_seed_pipeline()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

