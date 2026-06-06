from __future__ import annotations

import logging
import time

from starlette.middleware.base import BaseHTTPMiddleware


def configure_logging() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
    )


logger = logging.getLogger("mechanic.api")


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        start = time.perf_counter()

        response = await call_next(request)

        duration_ms = round((time.perf_counter() - start) * 1000)
        context = getattr(request.state, "context", None)

        logger.info(
            "%s %s -> %s (%sms) request_id=%s user_id=%s tenant_id=%s",
            request.method,
            request.url.path,
            response.status_code,
            duration_ms,
            getattr(context, "request_id", None),
            getattr(context, "user_id", None),
            getattr(context, "tenant_id", None),
        )

        return response