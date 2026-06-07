from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.pagination import PaginationParams, build_pagination_meta
from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.incident_ai_analysis.mappers import incident_ai_analysis_public
from app.modules.incident_ai_analysis.repository import IncidentAiAnalysisRepository
from app.modules.incident_ai_analysis.schemas import (
    IncidentAiAnalysesResponse,
    IncidentAiAnalysisCreateRequest,
    IncidentAiAnalysisListData,
    IncidentAiAnalysisResponse,
)
from app.modules.incident_ai_analysis.service import IncidentAiAnalysisService

router = APIRouter(
    prefix="/tenants/current/incidents/{incident_id}/ai-analyses",
    tags=["Tenant Incident AI Analyses"],
)


def _analysis_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> IncidentAiAnalysisService:
    return IncidentAiAnalysisService(
        repository=IncidentAiAnalysisRepository(db),
        context=context,
    )


@router.get("", response_model=IncidentAiAnalysesResponse)
def list_current_tenant_incident_ai_analyses(
    incident_id: str,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    service: IncidentAiAnalysisService = Depends(_analysis_service),
    pagination: PaginationParams = Depends(),
    analysis_version: str | None = Query(default=None),
) -> dict:
    analyses, total = service.list_by_incident(
        incident_id,
        analysis_version=analysis_version,
        limit=pagination.limit,
        offset=pagination.offset,
    )

    data = IncidentAiAnalysisListData(
        items=[incident_ai_analysis_public(analysis) for analysis in analyses],
        pagination=build_pagination_meta(
            page=pagination.page,
            page_size=pagination.page_size,
            total=total,
        ),
    )

    return success_response(
        message="Análisis IA obtenidos correctamente.",
        data=data.model_dump(mode="json"),
    )


@router.post("", response_model=IncidentAiAnalysisResponse)
def create_current_tenant_incident_ai_analysis(
    incident_id: str,
    payload: IncidentAiAnalysisCreateRequest,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    service: IncidentAiAnalysisService = Depends(_analysis_service),
) -> dict:
    analysis = service.create_for_incident(
        incident_id=incident_id,
        payload=payload,
    )

    return success_response(
        message="Análisis IA creado correctamente.",
        data=incident_ai_analysis_public(analysis).model_dump(mode="json"),
    )


@router.get("/{analysis_id}", response_model=IncidentAiAnalysisResponse)
def get_current_tenant_incident_ai_analysis(
    incident_id: str,
    analysis_id: str,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    service: IncidentAiAnalysisService = Depends(_analysis_service),
) -> dict:
    analysis = service.get_owned_by_incident_or_fail(
        incident_id=incident_id,
        analysis_id=analysis_id,
    )

    return success_response(
        message="Análisis IA obtenido correctamente.",
        data=incident_ai_analysis_public(analysis).model_dump(mode="json"),
    )