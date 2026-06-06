from __future__ import annotations

from uuid import UUID

from sqlalchemy import Select, func, select
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.common.validators import escape_like
from app.modules.service_catalog.models import ServiceCatalog


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class ServiceCatalogRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(self, service_catalog_id: str | UUID) -> ServiceCatalog | None:
        return self.db.get(
            ServiceCatalog,
            _to_uuid(service_catalog_id, "service_catalog_id"),
        )

    def get_by_code(self, service_code: str) -> ServiceCatalog | None:
        return self.db.scalar(
            select(ServiceCatalog).where(
                ServiceCatalog.service_code == service_code.strip().upper()
            )
        )

    def exists_by_code(self, service_code: str) -> bool:
        return self.get_by_code(service_code) is not None

    def list(
        self,
        *,
        search: str | None = None,
        category: str | None = None,
        is_active: bool | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[ServiceCatalog], int]:
        query = select(ServiceCatalog)

        if search is not None:
            normalized_search = escape_like(search.strip())
            if normalized_search:
                query = query.where(
                    ServiceCatalog.service_name.ilike(
                        f"%{normalized_search}%",
                        escape="\\",
                    )
                )

        if category is not None:
            normalized_category = category.strip()
            if normalized_category:
                query = query.where(ServiceCatalog.category == normalized_category)

        if is_active is not None:
            query = query.where(ServiceCatalog.is_active == is_active)

        return self._paginate(
            query.order_by(ServiceCatalog.created_at.desc()),
            limit,
            offset,
        )

    def add(self, service_catalog: ServiceCatalog) -> ServiceCatalog:
        self.db.add(service_catalog)
        self.db.flush()
        return service_catalog

    def _paginate(
        self,
        query: Select[tuple[ServiceCatalog]],
        limit: int,
        offset: int,
    ) -> tuple[list[ServiceCatalog], int]:
        total = self.db.scalar(select(func.count()).select_from(query.subquery()))
        items = list(self.db.scalars(query.offset(offset).limit(limit)))
        return items, int(total or 0)