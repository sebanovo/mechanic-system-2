from __future__ import annotations

from datetime import datetime, timezone

from app.common.exceptions import (
    ConflictException,
    ForbiddenException,
    NotFoundException,
)
from app.core.audit.constants import ProviderServiceAuditEvent
from app.core.context import RequestContext
from app.core.services.base import BaseService
from app.modules.identity.provider.models import ProviderProfile
from app.modules.provider_service.models import ProviderService
from app.modules.provider_service.repository import ProviderServiceRepository
from app.modules.provider_service.schemas import (
    ProviderServiceCreateRequest,
    ProviderServiceStatusChangeRequest,
    ProviderServiceUpdateRequest,
)
from app.modules.service_catalog.models import ServiceCatalog
from app.modules.service_catalog.repository import ServiceCatalogRepository


class ProviderServiceService(BaseService):
    def __init__(
        self,
        repository: ProviderServiceRepository,
        context: RequestContext,
    ) -> None:
        super().__init__(db=repository.db, context=context)
        self.repository = repository
        self.service_catalog_repository = ServiceCatalogRepository(self.db)

    def list(
        self,
        *,
        provider_profile_id: str | None = None,
        service_catalog_id: str | None = None,
        is_available: bool | None = None,
        category: str | None = None,
        search: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[ProviderService, ServiceCatalog]], int]:
        return self.repository.list(
            provider_profile_id=provider_profile_id,
            service_catalog_id=service_catalog_id,
            is_available=is_available,
            category=category,
            search=search,
            limit=limit,
            offset=offset,
        )

    def list_by_provider(
        self,
        provider_profile_id: str,
        *,
        is_available: bool | None = None,
        category: str | None = None,
        search: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[ProviderService, ServiceCatalog]], int]:
        return self.repository.list_by_provider(
            provider_profile_id,
            is_available=is_available,
            category=category,
            search=search,
            limit=limit,
            offset=offset,
        )

    def get_detail_or_fail(
        self,
        provider_service_id: str,
    ) -> tuple[ProviderService, ServiceCatalog]:
        detail = self.repository.get_detail_by_id(provider_service_id)

        if detail is None:
            raise NotFoundException("Servicio del proveedor no encontrado.")

        return detail

    def get_owned_detail_or_fail(
        self,
        *,
        provider_profile_id: str,
        provider_service_id: str,
    ) -> tuple[ProviderService, ServiceCatalog]:
        provider_service, service_catalog = self.get_detail_or_fail(provider_service_id)

        if str(provider_service.provider_profile_id) != provider_profile_id:
            raise ForbiddenException("El servicio no pertenece al proveedor actual.")

        return provider_service, service_catalog

    def create_for_provider(
        self,
        provider_profile: ProviderProfile,
        payload: ProviderServiceCreateRequest,
    ) -> ProviderService:
        service_catalog = self.service_catalog_repository.get_by_id(
            payload.service_catalog_id
        )

        if service_catalog is None or not service_catalog.is_active:
            raise NotFoundException("Servicio de catálogo no disponible.")

        existing = self.repository.get_by_provider_and_catalog(
            provider_profile_id=str(provider_profile.id),
            service_catalog_id=payload.service_catalog_id,
        )

        if existing is not None:
            raise ConflictException("El proveedor ya tiene configurado este servicio.")

        provider_service = ProviderService(
            provider_profile_id=provider_profile.id,
            service_catalog_id=service_catalog.id,
            is_available=True,
            custom_min_price=payload.custom_min_price,
            custom_max_price=payload.custom_max_price,
        )

        provider_service = self.repository.add(provider_service)

        self.audit.created(
            provider_service,
            ProviderServiceAuditEvent.PROVIDER_SERVICE_CREATED,
            resource_type="provider_service",
            tenant_id=str(provider_profile.tenant_id),
            event_data={
                "service_catalog_id": str(service_catalog.id),
                "service_code": service_catalog.service_code,
                "is_available": True,
            },
        )

        self.db.commit()
        self.db.refresh(provider_service)

        return provider_service

    def update_owned(
        self,
        *,
        provider_profile_id: str,
        provider_service_id: str,
        payload: ProviderServiceUpdateRequest,
    ) -> ProviderService:
        provider_service, _ = self.get_owned_detail_or_fail(
            provider_profile_id=provider_profile_id,
            provider_service_id=provider_service_id,
        )

        return self._update(provider_service, payload)

    def update_any(
        self,
        provider_service_id: str,
        payload: ProviderServiceUpdateRequest,
    ) -> ProviderService:
        provider_service, _ = self.get_detail_or_fail(provider_service_id)
        return self._update(provider_service, payload)

    def change_owned_status(
        self,
        *,
        provider_profile_id: str,
        provider_service_id: str,
        payload: ProviderServiceStatusChangeRequest,
    ) -> ProviderService:
        provider_service, _ = self.get_owned_detail_or_fail(
            provider_profile_id=provider_profile_id,
            provider_service_id=provider_service_id,
        )

        return self._change_status(provider_service, payload)

    def change_any_status(
        self,
        provider_service_id: str,
        payload: ProviderServiceStatusChangeRequest,
    ) -> ProviderService:
        provider_service, _ = self.get_detail_or_fail(provider_service_id)
        return self._change_status(provider_service, payload)

    def delete_owned(
        self,
        *,
        provider_profile_id: str,
        provider_service_id: str,
    ) -> ProviderService:
        provider_service, _ = self.get_owned_detail_or_fail(
            provider_profile_id=provider_profile_id,
            provider_service_id=provider_service_id,
        )

        return self._soft_disable(provider_service)

    def delete_any(self, provider_service_id: str) -> ProviderService:
        provider_service, _ = self.get_detail_or_fail(provider_service_id)
        return self._soft_disable(provider_service)

    def _update(
        self,
        provider_service: ProviderService,
        payload: ProviderServiceUpdateRequest,
    ) -> ProviderService:
        changed_fields: list[str] = []

        if payload.is_available is not None:
            provider_service.is_available = payload.is_available
            changed_fields.append("is_available")

        if payload.custom_min_price is not None:
            provider_service.custom_min_price = payload.custom_min_price
            changed_fields.append("custom_min_price")

        if payload.custom_max_price is not None:
            provider_service.custom_max_price = payload.custom_max_price
            changed_fields.append("custom_max_price")

        self.db.flush()

        tenant_id = self._tenant_id_from_provider_profile(provider_service.provider_profile_id)

        self.audit.updated(
            provider_service,
            ProviderServiceAuditEvent.PROVIDER_SERVICE_UPDATED,
            resource_type="provider_service",
            tenant_id=tenant_id,
            event_data={"changed_fields": changed_fields},
        )

        self.db.commit()
        self.db.refresh(provider_service)

        return provider_service

    def _change_status(
        self,
        provider_service: ProviderService,
        payload: ProviderServiceStatusChangeRequest,
    ) -> ProviderService:
        previous_status = provider_service.is_available
        provider_service.is_available = payload.is_available

        self.db.flush()

        tenant_id = self._tenant_id_from_provider_profile(provider_service.provider_profile_id)

        self.audit.updated(
            provider_service,
            ProviderServiceAuditEvent.PROVIDER_SERVICE_STATUS_CHANGED,
            resource_type="provider_service",
            tenant_id=tenant_id,
            event_data={
                "previous_is_available": previous_status,
                "is_available": payload.is_available,
            },
        )

        self.db.commit()
        self.db.refresh(provider_service)

        return provider_service

    def _soft_disable(self, provider_service: ProviderService) -> ProviderService:
        provider_service.is_available = False

        self.db.flush()

        tenant_id = self._tenant_id_from_provider_profile(provider_service.provider_profile_id)

        self.audit.deleted(
            provider_service,
            ProviderServiceAuditEvent.PROVIDER_SERVICE_DELETED,
            resource_type="provider_service",
            tenant_id=tenant_id,
        )

        self.db.commit()
        self.db.refresh(provider_service)

        return provider_service

    def _tenant_id_from_provider_profile(self, provider_profile_id) -> str | None:
        provider_profile = self.db.get(ProviderProfile, provider_profile_id)

        if provider_profile is None:
            return self.context.tenant_id

        return str(provider_profile.tenant_id)
