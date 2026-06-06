from __future__ import annotations

from app.common.exceptions import ConflictException, NotFoundException
from app.core.audit.constants import ServiceCatalogAuditEvent
from app.core.context import RequestContext
from app.core.services.base import BaseService
from app.modules.service_catalog.models import ServiceCatalog
from app.modules.service_catalog.repository import ServiceCatalogRepository
from app.modules.service_catalog.schemas import (
    ServiceCatalogCreateRequest,
    ServiceCatalogStatusChangeRequest,
    ServiceCatalogUpdateRequest,
)


class ServiceCatalogService(BaseService):
    def __init__(
        self,
        repository: ServiceCatalogRepository,
        context: RequestContext,
    ) -> None:
        super().__init__(db=repository.db, context=context)
        self.repository = repository

    def list(
        self,
        *,
        search: str | None = None,
        category: str | None = None,
        is_active: bool | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[ServiceCatalog], int]:
        return self.repository.list(
            search=search,
            category=category,
            is_active=is_active,
            limit=limit,
            offset=offset,
        )

    def list_active(
        self,
        *,
        search: str | None = None,
        category: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[ServiceCatalog], int]:
        return self.repository.list(
            search=search,
            category=category,
            is_active=True,
            limit=limit,
            offset=offset,
        )

    def get_or_fail(self, service_catalog_id: str) -> ServiceCatalog:
        service_catalog = self.repository.get_by_id(service_catalog_id)

        if service_catalog is None:
            raise NotFoundException("Servicio de catálogo no encontrado.")

        return service_catalog

    def get_active_or_fail(self, service_catalog_id: str) -> ServiceCatalog:
        service_catalog = self.get_or_fail(service_catalog_id)

        if not service_catalog.is_active:
            raise NotFoundException("Servicio de catálogo no disponible.")

        return service_catalog

    def create(self, payload: ServiceCatalogCreateRequest) -> ServiceCatalog:
        service_code = payload.service_code.strip().upper()

        if self.repository.exists_by_code(service_code):
            raise ConflictException("El código de servicio ya está registrado.")

        service_catalog = ServiceCatalog(
            service_code=service_code,
            service_name=payload.service_name.strip(),
            description=payload.description.strip() if payload.description else None,
            category=payload.category.strip(),
            min_price=payload.min_price,
            max_price=payload.max_price,
            min_duration_minutes=payload.min_duration_minutes,
            max_duration_minutes=payload.max_duration_minutes,
            is_active=payload.is_active,
        )

        service_catalog = self.repository.add(service_catalog)

        self.audit.created(
            service_catalog,
            ServiceCatalogAuditEvent.SERVICE_CATALOG_CREATED,
            resource_type="service_catalog",
            event_data={
                "service_code": service_catalog.service_code,
                "service_name": service_catalog.service_name,
                "category": service_catalog.category,
                "is_active": service_catalog.is_active,
            },
        )

        self.db.commit()
        self.db.refresh(service_catalog)

        return service_catalog

    def update(
        self,
        service_catalog_id: str,
        payload: ServiceCatalogUpdateRequest,
    ) -> ServiceCatalog:
        service_catalog = self.get_or_fail(service_catalog_id)
        changed_fields: list[str] = []

        if payload.service_name is not None:
            service_catalog.service_name = payload.service_name.strip()
            changed_fields.append("service_name")

        if payload.description is not None:
            service_catalog.description = payload.description.strip() or None
            changed_fields.append("description")

        if payload.category is not None:
            service_catalog.category = payload.category.strip()
            changed_fields.append("category")

        if payload.min_price is not None:
            service_catalog.min_price = payload.min_price
            changed_fields.append("min_price")

        if payload.max_price is not None:
            service_catalog.max_price = payload.max_price
            changed_fields.append("max_price")

        if payload.min_duration_minutes is not None:
            service_catalog.min_duration_minutes = payload.min_duration_minutes
            changed_fields.append("min_duration_minutes")

        if payload.max_duration_minutes is not None:
            service_catalog.max_duration_minutes = payload.max_duration_minutes
            changed_fields.append("max_duration_minutes")

        if payload.is_active is not None:
            service_catalog.is_active = payload.is_active
            changed_fields.append("is_active")

        self.db.flush()

        self.audit.updated(
            service_catalog,
            ServiceCatalogAuditEvent.SERVICE_CATALOG_UPDATED,
            resource_type="service_catalog",
            event_data={"changed_fields": changed_fields},
        )

        self.db.commit()
        self.db.refresh(service_catalog)

        return service_catalog

    def change_status(
        self,
        service_catalog_id: str,
        payload: ServiceCatalogStatusChangeRequest,
    ) -> ServiceCatalog:
        service_catalog = self.get_or_fail(service_catalog_id)
        previous_status = service_catalog.is_active

        service_catalog.is_active = payload.is_active
        self.db.flush()

        self.audit.updated(
            service_catalog,
            ServiceCatalogAuditEvent.SERVICE_CATALOG_STATUS_CHANGED,
            resource_type="service_catalog",
            event_data={
                "previous_is_active": previous_status,
                "is_active": payload.is_active,
            },
        )

        self.db.commit()
        self.db.refresh(service_catalog)

        return service_catalog