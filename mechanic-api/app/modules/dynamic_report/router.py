from __future__ import annotations

from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.common.pagination import PaginationParams
from app.common.pagination import build_pagination_meta
from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.dynamic_report.schemas import (
    DynamicReportExecutionListData,
    DynamicReportExecutionResponse,
    DynamicReportExecutionsResponse,
    DynamicReportPromptRequest,
    DynamicReportRunResponse,
)
from app.modules.dynamic_report.service import DynamicReportService
from app.modules.identity.auth.authorization import (
    CurrentIdentity,
    require_user_types,
)


router = APIRouter(
    prefix="/reports/dynamic",
    tags=["Dynamic Reports"],
)


def get_dynamic_report_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> DynamicReportService:
    return DynamicReportService(
        db=db,
        context=context,
    )


@router.post(
    "/run",
    response_model=DynamicReportRunResponse,
    summary="Ejecutar reporte dinámico",
    description="Recibe un prompt natural, lo convierte a intención estructurada, valida permisos y scope, y ejecuta el reporte.",
)
def run_dynamic_report(
    payload: DynamicReportPromptRequest,
    identity: CurrentIdentity = Depends(
        require_user_types(
            "SUPERADMIN",
            "TENANT_OWNER",
        )
    ),
    service: DynamicReportService = Depends(get_dynamic_report_service),
):
    data = service.run_from_prompt(
        payload=payload,
        user_type=identity.user.user_type,
    )

    return success_response(
        message="Dynamic report generated.",
        data=data.model_dump(mode="json"),
    )


@router.post(
    "/executions/{execution_id}/replay",
    response_model=DynamicReportRunResponse,
    summary="Reejecutar un reporte dinámico",
    description="Vuelve a ejecutar un reporte usando la intención almacenada, sin llamar a la IA nuevamente.",
)
def replay_dynamic_report_execution(
    execution_id: str,
    identity: CurrentIdentity = Depends(
        require_user_types(
            "SUPERADMIN",
            "TENANT_OWNER",
        )
    ),
    service: DynamicReportService = Depends(get_dynamic_report_service),
):
    data = service.replay_execution(
        execution_id=execution_id,
        user_type=identity.user.user_type,
    )

    return success_response(
        message="Dynamic report replayed.",
        data=data.model_dump(mode="json"),
    )


@router.get(
    "/executions",
    response_model=DynamicReportExecutionsResponse,
    summary="Listar ejecuciones de reportes dinámicos",
    description="Devuelve el historial de ejecuciones del usuario autenticado en el tenant actual o en plataforma.",
)
def list_dynamic_report_executions(
    _identity: CurrentIdentity = Depends(
        require_user_types(
            "SUPERADMIN",
            "TENANT_OWNER",
        )
    ),
    pagination: PaginationParams = Depends(),
    service: DynamicReportService = Depends(get_dynamic_report_service),
):
    items, total = service.list_my_executions(
        limit=pagination.limit,
        offset=pagination.offset,
    )

    data = DynamicReportExecutionListData(
        items=items,
        pagination=build_pagination_meta(
            page=pagination.page,
            page_size=pagination.page_size,
            total=total,
        ),
    )

    return success_response(
        message="Dynamic report executions retrieved.",
        data=data.model_dump(mode="json"),
    )


@router.get(
    "/executions/{execution_id}",
    response_model=DynamicReportExecutionResponse,
    summary="Obtener detalle de una ejecución",
    description="Devuelve el detalle de una ejecución de reporte dinámico.",
)
def get_dynamic_report_execution(
    execution_id: str,
    _identity: CurrentIdentity = Depends(
        require_user_types(
            "SUPERADMIN",
            "TENANT_OWNER",
        )
    ),
    service: DynamicReportService = Depends(get_dynamic_report_service),
):
    data = service.get_execution_or_fail(execution_id)

    return success_response(
        message="Dynamic report execution retrieved.",
        data=data.model_dump(mode="json"),
    )
