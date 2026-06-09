from __future__ import annotations

from datetime import datetime

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.dashboard.repository import DashboardRepository
from app.modules.dashboard.schemas import OwnerOperationalDashboardResponse
from app.modules.dashboard.service import DashboardService
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.identity.provider.repository import ProviderProfileRepository
from app.modules.identity.provider.service import ProviderProfileService

router = APIRouter(
    prefix="/tenants/current/dashboard",
    tags=["Tenant Dashboard"],
)


def _dashboard_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> DashboardService:
    return DashboardService(
        repository=DashboardRepository(db),
        context=context,
    )


def _provider_profile_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> ProviderProfileService:
    return ProviderProfileService(
        repository=ProviderProfileRepository(db),
        context=context,
    )


@router.get(
    "/operational",
    response_model=OwnerOperationalDashboardResponse,
    summary="Dashboard operativo del owner",
    description="Devuelve KPIs y gráficos operativos del taller autenticado.",
)
def get_owner_operational_dashboard(
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    service: DashboardService = Depends(_dashboard_service),
    date_from: datetime | None = Query(
        default=None,
        description="Fecha inicial del rango de análisis. Si no se envía, el backend usa los últimos 30 días.",
    ),
    date_to: datetime | None = Query(
        default=None,
        description="Fecha final del rango de análisis. Si no se envía, el backend usa la fecha actual.",
    ),
) -> dict:
    provider_profile = provider_profile_service.get_current_or_fail()

    dashboard = service.get_owner_operational_dashboard(
        provider_profile_id=str(provider_profile.id),
        tenant_id=str(provider_profile.tenant_id),
        date_from=date_from,
        date_to=date_to,
    )

    return success_response(
        message="Dashboard operativo obtenido correctamente.",
        data=dashboard.model_dump(mode="json"),
    )
