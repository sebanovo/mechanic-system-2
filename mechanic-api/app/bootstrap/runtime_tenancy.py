from __future__ import annotations

import logging

logger = logging.getLogger(__name__)


def hydrate_tenancy_runtime() -> None:
    """Prepare tenancy runtime state."""

    logger.debug("Tenancy runtime hydrated")

