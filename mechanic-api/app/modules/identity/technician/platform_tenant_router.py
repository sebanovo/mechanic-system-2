from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.identity.provider.repository import ProviderProfileRepository
from app.modules.identity.provider.service import ProviderProfileService
from app.modules.identity.technician.mappers import technician_detail_public
from app.modules.identity.technician.repository import TechnicianRepository
from app.modules.identity.technician.schemas import TechnicianCreateRequest, TechnicianResponse
from app.modules.identity.technician.service import TechnicianService

router = APIRouter(prefix="/platform/{tenant_id}/technicians", tags=["Platform Technicians"])


def _provider_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> ProviderProfileService:
    return ProviderProfileService(
        repository=ProviderProfileRepository(db),
        context=context,
    )


def _technician_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> TechnicianService:
    return TechnicianService(
        repository=TechnicianRepository(db),
        context=context,
    )


@router.post("", response_model=TechnicianResponse)
def create_platform_tenant_technician(
    tenant_id: str,
    payload: TechnicianCreateRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    provider_service: ProviderProfileService = Depends(_provider_service),
    technician_service: TechnicianService = Depends(_technician_service),
) -> dict:
    provider_profile = provider_service.get_by_tenant_or_fail(tenant_id)
    technician = technician_service.create_for_provider(provider_profile, payload)
    detail = technician_service.get_detail_or_fail(str(technician.id))

    return success_response(
        message="Técnico creado correctamente.",
        data=technician_detail_public(*detail).model_dump(mode="json"),
    )
