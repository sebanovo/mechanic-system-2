from __future__ import annotations

from datetime import datetime

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.dashboard.platform_dashboard.repository import (
    PlatformDashboardRepository,
)
from app.modules.dashboard.platform_dashboard.schemas import (
    PlatformOperationalDashboardResponse,
)
from app.modules.dashboard.platform_dashboard.service import (
    PlatformDashboardService,
)
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types

router = APIRouter(
    prefix="/platform/dashboard",
    tags=["Platform Dashboard"],
)


def _dashboard_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> PlatformDashboardService:
    return PlatformDashboardService(
        repository=PlatformDashboardRepository(db),
        context=context,
    )


@router.get(
    "/operational",
    response_model=PlatformOperationalDashboardResponse,
    summary="Dashboard operativo global de plataforma",
    description="Devuelve KPIs y gráficos operativos globales de todos los tenants.",
)
def get_platform_operational_dashboard(
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: PlatformDashboardService = Depends(_dashboard_service),
    date_from: datetime | None = Query(
        default=None,
        description="Fecha inicial del rango de análisis. Si no se envía, el backend usa los últimos 30 días.",
    ),
    date_to: datetime | None = Query(
        default=None,
        description="Fecha final del rango de análisis. Si no se envía, el backend usa la fecha actual.",
    ),
) -> dict:
    dashboard = service.get_platform_operational_dashboard(
        date_from=date_from,
        date_to=date_to,
    )

    return success_response(
        message="Dashboard operativo global obtenido correctamente.",
        data=dashboard.model_dump(mode="json"),
    )

