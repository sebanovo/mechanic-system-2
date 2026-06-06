from __future__ import annotations

import logging

from app.bootstrap.seeds.loaders.service_catalogs_loader import load_service_catalogs
from app.bootstrap.seeds.loaders.users_loader import load_platform_admin

logger = logging.getLogger(__name__)


def run_seed_pipeline() -> None:
    """Run the initial seed pipeline.

    The initial pipeline seeds the shared service catalog and the platform
    admin user. As more modules are implemented, their loaders can be added
    here without changing the invocation contract used by the scripts.
    """

    logger.info("Running seed pipeline")
    load_service_catalogs()
    load_platform_admin()
    logger.info("Seed pipeline completed")
