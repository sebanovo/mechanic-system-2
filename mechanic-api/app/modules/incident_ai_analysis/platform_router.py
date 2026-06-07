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
    prefix="/platform/incident-ai-analyses",
    tags=["Platform Incident AI Analyses"],
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
def list_platform_incident_ai_analyses(
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: IncidentAiAnalysisService = Depends(_analysis_service),
    pagination: PaginationParams = Depends(),
    incident_id: str | None = Query(default=None),
    analysis_version: str | None = Query(default=None),
    probable_service_code: str | None = Query(default=None),
    recommended_priority: str | None = Query(default=None),
) -> dict:
    analyses, total = service.list(
        incident_id=incident_id,
        analysis_version=analysis_version,
        probable_service_code=probable_service_code,
        recommended_priority=recommended_priority,
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


@router.post("/incidents/{incident_id}", response_model=IncidentAiAnalysisResponse)
def create_platform_incident_ai_analysis(
    incident_id: str,
    payload: IncidentAiAnalysisCreateRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
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
def get_platform_incident_ai_analysis(
    analysis_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: IncidentAiAnalysisService = Depends(_analysis_service),
) -> dict:
    analysis = service.get_or_fail(analysis_id)

    return success_response(
        message="Análisis IA obtenido correctamente.",
        data=incident_ai_analysis_public(analysis).model_dump(mode="json"),
    )