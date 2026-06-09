from __future__ import annotations

from datetime import datetime

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.dashboard.repository import DashboardRepository
from app.modules.dashboard.schemas import ClientOperationalDashboardResponse
from app.modules.dashboard.service import DashboardService
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.identity.customer.repository import CustomerRepository
from app.modules.identity.customer.service import CustomerService

router = APIRouter(
    prefix="/clients/me/dashboard",
    tags=["Client Dashboard"],
)


def _dashboard_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> DashboardService:
    return DashboardService(
        repository=DashboardRepository(db),
        context=context,
    )


def _customer_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> CustomerService:
    return CustomerService(
        repository=CustomerRepository(db),
        context=context,
    )


@router.get(
    "/operational",
    response_model=ClientOperationalDashboardResponse,
    summary="Dashboard operativo del cliente",
    description="Devuelve KPIs y gráficos operativos del cliente autenticado.",
)
def get_client_operational_dashboard(
    identity: CurrentIdentity = Depends(require_user_types("CLIENT")),
    customer_service: CustomerService = Depends(_customer_service),
    dashboard_service: DashboardService = Depends(_dashboard_service),
    date_from: datetime | None = Query(
        default=None,
        description="Fecha inicial del rango de análisis. Si no se envía, el backend usa los últimos 30 días.",
    ),
    date_to: datetime | None = Query(
        default=None,
        description="Fecha final del rango de análisis. Si no se envía, el backend usa la fecha actual.",
    ),
) -> dict:
    customer = customer_service.get_current_or_fail()

    dashboard = dashboard_service.get_client_operational_dashboard(
        customer_id=str(customer.id),
        date_from=date_from,
        date_to=date_to,
    )

    return success_response(
        message="Dashboard operativo del cliente obtenido correctamente.",
        data=dashboard.model_dump(mode="json"),
    )
