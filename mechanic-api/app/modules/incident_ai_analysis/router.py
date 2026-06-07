from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.common.exceptions import InfrastructureException, NotFoundException
from app.common.responses import success_response
from app.core.ai.exceptions import AIError
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.identity.customer.repository import CustomerRepository
from app.modules.incident.repository import IncidentRepository
from app.modules.incident.service import IncidentService
from app.modules.incident_ai_analysis.mappers import incident_ai_analysis_public
from app.modules.incident_ai_analysis.repository import IncidentAiAnalysisRepository
from app.modules.incident_ai_analysis.schemas import IncidentAiAnalysisResponse
from app.modules.incident_ai_analysis.service import IncidentAiAnalysisService

router = APIRouter(prefix="/incidents", tags=["Incident AI Analysis"])


def _analysis_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> IncidentAiAnalysisService:
    return IncidentAiAnalysisService(
        repository=IncidentAiAnalysisRepository(db),
        context=context,
    )


def _incident_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> IncidentService:
    return IncidentService(
        repository=IncidentRepository(db),
        context=context,
    )


def _assert_incident_access(
    *,
    identity: CurrentIdentity,
    db: Session,
    context: RequestContext,
    incident_id: str,
) -> None:
    user_type = identity.user.user_type

    if user_type == "SUPERADMIN":
        return

    if user_type == "CLIENT":
        customer = CustomerRepository(db).get_by_user_id(str(identity.user.id))

        if customer is None or customer.deleted_at is not None:
            raise NotFoundException("Cliente no encontrado.")

        incident = IncidentRepository(db).get_by_id(incident_id)

        if (
            incident is None
            or incident.deleted_at is not None
            or str(incident.customer_id) != str(customer.id)
        ):
            raise NotFoundException("Incidente no encontrado.")

        return

    incident_service = IncidentService(
        repository=IncidentRepository(db),
        context=context,
    )
    incident_service.get_for_current_provider_or_fail(incident_id)


@router.post("/{incident_id}/ai-analysis/run", response_model=IncidentAiAnalysisResponse)
def run_incident_ai_analysis(
    incident_id: str,
    identity: CurrentIdentity = Depends(
        require_user_types("SUPERADMIN", "TENANT_OWNER", "TECHNICIAN", "CLIENT")
    ),
    service: IncidentAiAnalysisService = Depends(_analysis_service),
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> dict:
    _assert_incident_access(
        identity=identity,
        db=db,
        context=context,
        incident_id=incident_id,
    )

    try:
        analysis = service.run_for_incident(incident_id=incident_id)
    except AIError as exc:
        raise InfrastructureException("La IA no está disponible en este momento.") from exc

    return success_response(
        message="Análisis IA ejecutado correctamente.",
        data=incident_ai_analysis_public(analysis).model_dump(mode="json"),
    )
