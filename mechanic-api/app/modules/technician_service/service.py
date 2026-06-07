from __future__ import annotations

from app.common.exceptions import (
    ConflictException,
    ForbiddenException,
    NotFoundException,
)
from app.core.audit.constants import TechnicianServiceAuditEvent
from app.core.context import RequestContext
from app.core.services.base import BaseService
from app.modules.identity.provider.models import ProviderProfile
from app.modules.identity.provider.repository import ProviderProfileRepository
from app.modules.identity.technician.models import Technician
from app.modules.identity.technician.repository import TechnicianRepository
from app.modules.provider_service.models import ProviderService
from app.modules.provider_service.repository import ProviderServiceRepository
from app.modules.service_catalog.models import ServiceCatalog
from app.modules.technician_service.models import TechnicianService
from app.modules.technician_service.repository import TechnicianServiceRepository
from app.modules.technician_service.schemas import (
    TechnicianServiceCreateRequest,
    TechnicianServiceStatusChangeRequest,
    TechnicianServiceUpdateRequest,
)


class TechnicianServiceService(BaseService):
    def __init__(
        self,
        repository: TechnicianServiceRepository,
        context: RequestContext,
    ) -> None:
        super().__init__(db=repository.db, context=context)
        self.repository = repository
        self.provider_repository = ProviderProfileRepository(self.db)
        self.technician_repository = TechnicianRepository(self.db)
        self.provider_service_repository = ProviderServiceRepository(self.db)
        self.technician_service_repository = TechnicianServiceRepository(self.db)

    def list(
        self,
        *,
        technician_id: str | None = None,
        provider_service_id: str | None = None,
        provider_profile_id: str | None = None,
        service_catalog_id: str | None = None,
        skill_level: str | None = None,
        is_enabled: bool | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[TechnicianService, Technician, ProviderService, ServiceCatalog]], int]:
        return self.repository.list(
            technician_id=technician_id,
            provider_service_id=provider_service_id,
            provider_profile_id=provider_profile_id,
            service_catalog_id=service_catalog_id,
            skill_level=self._normalize_upper(skill_level),
            is_enabled=is_enabled,
            limit=limit,
            offset=offset,
        )

    def list_by_provider(
        self,
        provider_profile_id: str,
        *,
        service_catalog_id: str | None = None,
        is_enabled: bool | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[TechnicianService, Technician, ProviderService, ServiceCatalog]], int]:
        self._get_provider_or_fail(provider_profile_id)

        return self.repository.list_by_provider(
            provider_profile_id,
            service_catalog_id=service_catalog_id,
            is_enabled=is_enabled,
            limit=limit,
            offset=offset,
        )

    def get_detail_or_fail(
        self,
        technician_service_id: str,
    ) -> tuple[TechnicianService, Technician, ProviderService, ServiceCatalog]:
        detail = self.repository.get_detail_by_id(technician_service_id)

        if detail is None:
            raise NotFoundException("Servicio del técnico no encontrado.")

        return detail

    def create(
        self,
        payload: TechnicianServiceCreateRequest,
    ) -> TechnicianService:
        technician = self._get_technician_or_fail(payload.technician_id)
        provider_service = self._get_provider_service_or_fail(payload.provider_service_id)

        self._ensure_same_provider(
            technician=technician,
            provider_service=provider_service,
        )

        existing = self.repository.get_by_technician_and_provider_service(
            technician_id=str(technician.id),
            provider_service_id=str(provider_service.id),
        )

        if existing is not None:
            raise ConflictException("El técnico ya tiene asignado este servicio.")

        technician_service = TechnicianService(
            technician_id=technician.id,
            provider_service_id=provider_service.id,
            skill_level=payload.skill_level,
            is_enabled=payload.is_enabled,
        )

        technician_service = self.repository.add(technician_service)

        self.audit.created(
            technician_service,
            TechnicianServiceAuditEvent.TECHNICIAN_SERVICE_CREATED,
            resource_type="technician_service",
            tenant_id=self._tenant_id_from_provider_profile(
                str(technician.provider_profile_id)
            ),
            event_data={
                "technician_id": str(technician.id),
                "provider_service_id": str(provider_service.id),
                "skill_level": technician_service.skill_level,
                "is_enabled": technician_service.is_enabled,
            },
        )

        self.db.commit()
        self.db.refresh(technician_service)

        return technician_service

    def create_for_current_provider(
        self,
        provider_profile_id: str,
        payload: TechnicianServiceCreateRequest,
    ) -> TechnicianService:
        technician = self._get_technician_or_fail(payload.technician_id)
        provider_service = self._get_provider_service_or_fail(payload.provider_service_id)

        if str(technician.provider_profile_id) != provider_profile_id:
            raise ForbiddenException("El técnico no pertenece al proveedor actual.")

        if str(provider_service.provider_profile_id) != provider_profile_id:
            raise ForbiddenException("El servicio no pertenece al proveedor actual.")

        return self.create(payload)

    def update(
        self,
        technician_service_id: str,
        payload: TechnicianServiceUpdateRequest,
    ) -> TechnicianService:
        technician_service, technician, _, _ = self.get_detail_or_fail(technician_service_id)
        return self._update(
            technician_service,
            payload,
            tenant_id=self._tenant_id_from_provider_profile(
                str(technician.provider_profile_id)
            ),
        )

    def update_owned(
        self,
        *,
        provider_profile_id: str,
        technician_service_id: str,
        payload: TechnicianServiceUpdateRequest,
    ) -> TechnicianService:
        technician_service, technician, provider_service, _ = self.get_detail_or_fail(
            technician_service_id
        )

        self._ensure_owned_by_provider(
            provider_profile_id=provider_profile_id,
            technician=technician,
            provider_service=provider_service,
        )

        return self._update(
            technician_service,
            payload,
            tenant_id=self._tenant_id_from_provider_profile(provider_profile_id),
        )

    def change_status(
        self,
        technician_service_id: str,
        payload: TechnicianServiceStatusChangeRequest,
    ) -> TechnicianService:
        technician_service, technician, _, _ = self.get_detail_or_fail(technician_service_id)
        return self._change_status(
            technician_service,
            payload,
            tenant_id=self._tenant_id_from_provider_profile(
                str(technician.provider_profile_id)
            ),
        )

    def change_owned_status(
        self,
        *,
        provider_profile_id: str,
        technician_service_id: str,
        payload: TechnicianServiceStatusChangeRequest,
    ) -> TechnicianService:
        technician_service, technician, provider_service, _ = self.get_detail_or_fail(
            technician_service_id
        )

        self._ensure_owned_by_provider(
            provider_profile_id=provider_profile_id,
            technician=technician,
            provider_service=provider_service,
        )

        return self._change_status(
            technician_service,
            payload,
            tenant_id=self._tenant_id_from_provider_profile(provider_profile_id),
        )

    def _update(
        self,
        technician_service: TechnicianService,
        payload: TechnicianServiceUpdateRequest,
        *,
        tenant_id: str | None,
    ) -> TechnicianService:
        changed_fields: list[str] = []

        if payload.skill_level is not None:
            technician_service.skill_level = payload.skill_level
            changed_fields.append("skill_level")

        if payload.is_enabled is not None:
            technician_service.is_enabled = payload.is_enabled
            changed_fields.append("is_enabled")

        self.db.flush()

        self.audit.updated(
            technician_service,
            TechnicianServiceAuditEvent.TECHNICIAN_SERVICE_UPDATED,
            resource_type="technician_service",
            tenant_id=tenant_id,
            event_data={"changed_fields": changed_fields},
        )

        self.db.commit()
        self.db.refresh(technician_service)

        return technician_service

    def _change_status(
        self,
        technician_service: TechnicianService,
        payload: TechnicianServiceStatusChangeRequest,
        *,
        tenant_id: str | None,
    ) -> TechnicianService:
        previous_status = technician_service.is_enabled
        technician_service.is_enabled = payload.is_enabled

        self.db.flush()

        self.audit.updated(
            technician_service,
            TechnicianServiceAuditEvent.TECHNICIAN_SERVICE_STATUS_CHANGED,
            resource_type="technician_service",
            tenant_id=tenant_id,
            event_data={
                "previous_is_enabled": previous_status,
                "is_enabled": payload.is_enabled,
            },
        )

        self.db.commit()
        self.db.refresh(technician_service)

        return technician_service

    def _get_provider_or_fail(self, provider_profile_id: str) -> ProviderProfile:
        provider_profile = self.provider_repository.get_by_id(provider_profile_id)

        if provider_profile is None:
            raise NotFoundException("Perfil de proveedor no encontrado.")

        return provider_profile

    def _get_technician_or_fail(self, technician_id: str) -> Technician:
        technician = self.technician_repository.get_by_id(technician_id)

        if technician is None or technician.deleted_at is not None:
            raise NotFoundException("Técnico no encontrado.")

        return technician

    def _get_provider_service_or_fail(self, provider_service_id: str) -> ProviderService:
        provider_service = self.provider_service_repository.get_by_id(provider_service_id)

        if provider_service is None:
            raise NotFoundException("Servicio del proveedor no encontrado.")

        return provider_service

    def _ensure_provider_can_be_candidate(
        self,
        *,
        incident: Incident,
        provider_profile: ProviderProfile,
    ) -> ProviderService:
        if provider_profile.operational_status != "ACTIVE":
            raise ConflictException("El taller no está activo.")

        if not provider_profile.accepts_emergency_requests:
            raise ConflictException("El taller no acepta nuevas solicitudes.")

        if incident.service_catalog_id is None:
            raise ConflictException("El incidente no tiene un servicio solicitado.")

        provider_service = self.provider_service_repository.get_by_provider_and_catalog(
            provider_profile_id=str(provider_profile.id),
            service_catalog_id=str(incident.service_catalog_id),
        )

        if provider_service is None:
            raise ConflictException("El taller no ofrece el servicio solicitado.")

        if not provider_service.is_available:
            raise ConflictException(
                "El servicio solicitado no está disponible actualmente."
            )

        has_enabled_technician = (
            self.technician_service_repository.has_enabled_technician_for_provider_and_catalog(
                provider_profile_id=str(provider_profile.id),
                service_catalog_id=str(incident.service_catalog_id),
            )
        )

        if not has_enabled_technician:
            raise ConflictException(
                "El taller no tiene ningún técnico habilitado para ese servicio."
            )

        return provider_service

    def _ensure_same_provider(
        self,
        *,
        technician: Technician,
        provider_service: ProviderService,
    ) -> None:
        if str(technician.provider_profile_id) != str(provider_service.provider_profile_id):
            raise ConflictException(
                "El técnico y el servicio del proveedor no pertenecen al mismo proveedor."
            )

    def _ensure_owned_by_provider(
        self,
        *,
        provider_profile_id: str,
        technician: Technician,
        provider_service: ProviderService,
    ) -> None:
        if str(technician.provider_profile_id) != provider_profile_id:
            raise NotFoundException("Servicio del técnico no encontrado.")

        if str(provider_service.provider_profile_id) != provider_profile_id:
            raise NotFoundException("Servicio del técnico no encontrado.")

    def _tenant_id_from_provider_profile(self, provider_profile_id: str) -> str | None:
        provider_profile = self.provider_repository.get_by_id(provider_profile_id)

        if provider_profile is None:
            return self.context.tenant_id

        return str(provider_profile.tenant_id)

    def _normalize_text(self, value: str | None) -> str | None:
        if value is None:
            return None

        normalized = value.strip()
        return normalized or None

    def _normalize_upper(self, value: str | None) -> str | None:
        normalized = self._normalize_text(value)
        return normalized.upper() if normalized else None
