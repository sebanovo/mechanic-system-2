from __future__ import annotations

from uuid import UUID

from sqlalchemy import Select, func, select
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.modules.provider_service.models import ProviderService
from app.modules.service_catalog.models import ServiceCatalog


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class ProviderServiceRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(self, provider_service_id: str | UUID) -> ProviderService | None:
        return self.db.get(
            ProviderService,
            _to_uuid(provider_service_id, "provider_service_id"),
        )

    def get_by_provider_and_catalog(
        self,
        *,
        provider_profile_id: str | UUID,
        service_catalog_id: str | UUID,
    ) -> ProviderService | None:
        return self.db.scalar(
            select(ProviderService).where(
                ProviderService.provider_profile_id == _to_uuid(
                    provider_profile_id,
                    "provider_profile_id",
                ),
                ProviderService.service_catalog_id == _to_uuid(
                    service_catalog_id,
                    "service_catalog_id",
                ),
            )
        )

    def get_detail_by_id(
        self,
        provider_service_id: str | UUID,
    ) -> tuple[ProviderService, ServiceCatalog] | None:
        row = self.db.execute(
            select(ProviderService, ServiceCatalog)
            .join(
                ServiceCatalog,
                ServiceCatalog.id == ProviderService.service_catalog_id,
            )
            .where(
                ProviderService.id == _to_uuid(
                    provider_service_id,
                    "provider_service_id",
                )
            )
        ).first()

        if row is None:
            return None

        return row[0], row[1]

    def list_by_provider(
        self,
        provider_profile_id: str | UUID,
        *,
        is_available: bool | None = None,
        category: str | None = None,
        search: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[ProviderService, ServiceCatalog]], int]:
        query = (
            select(ProviderService, ServiceCatalog)
            .join(
                ServiceCatalog,
                ServiceCatalog.id == ProviderService.service_catalog_id,
            )
            .where(
                ProviderService.provider_profile_id == _to_uuid(
                    provider_profile_id,
                    "provider_profile_id",
                )
            )
        )

        if is_available is not None:
            query = query.where(ProviderService.is_available == is_available)

        if category is not None:
            normalized_category = category.strip()
            if normalized_category:
                query = query.where(ServiceCatalog.category == normalized_category)

        if search is not None:
            normalized_search = search.strip()
            if normalized_search:
                query = query.where(
                    ServiceCatalog.service_name.ilike(f"%{normalized_search}%")
                )

        return self._paginate(
            query.order_by(ProviderService.created_at.desc()),
            limit,
            offset,
        )

    def list(
        self,
        *,
        provider_profile_id: str | UUID | None = None,
        service_catalog_id: str | UUID | None = None,
        is_available: bool | None = None,
        category: str | None = None,
        search: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[ProviderService, ServiceCatalog]], int]:
        query = select(ProviderService, ServiceCatalog).join(
            ServiceCatalog,
            ServiceCatalog.id == ProviderService.service_catalog_id,
        )

        if provider_profile_id is not None:
            query = query.where(
                ProviderService.provider_profile_id == _to_uuid(
                    provider_profile_id,
                    "provider_profile_id",
                )
            )

        if service_catalog_id is not None:
            query = query.where(
                ProviderService.service_catalog_id == _to_uuid(
                    service_catalog_id,
                    "service_catalog_id",
                )
            )

        if is_available is not None:
            query = query.where(ProviderService.is_available == is_available)

        if category is not None:
            normalized_category = category.strip()
            if normalized_category:
                query = query.where(ServiceCatalog.category == normalized_category)

        if search is not None:
            normalized_search = search.strip()
            if normalized_search:
                query = query.where(
                    ServiceCatalog.service_name.ilike(f"%{normalized_search}%")
                )

        return self._paginate(
            query.order_by(ProviderService.created_at.desc()),
            limit,
            offset,
        )

    def add(self, provider_service: ProviderService) -> ProviderService:
        self.db.add(provider_service)
        self.db.flush()
        return provider_service

    def _paginate(
        self,
        query: Select[tuple[ProviderService, ServiceCatalog]],
        limit: int,
        offset: int,
    ) -> tuple[list[tuple[ProviderService, ServiceCatalog]], int]:
        total = self.db.scalar(select(func.count()).select_from(query.subquery()))
        rows = self.db.execute(query.offset(offset).limit(limit)).all()
        return [(row[0], row[1]) for row in rows], int(total or 0)