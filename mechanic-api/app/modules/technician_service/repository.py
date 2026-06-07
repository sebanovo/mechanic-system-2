from __future__ import annotations

from uuid import UUID

from sqlalchemy import Select, func, select
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.modules.identity.technician.models import Technician
from app.modules.provider_service.models import ProviderService
from app.modules.service_catalog.models import ServiceCatalog
from app.modules.technician_service.models import TechnicianService


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class TechnicianServiceRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(
        self,
        technician_service_id: str | UUID,
    ) -> TechnicianService | None:
        return self.db.get(
            TechnicianService,
            _to_uuid(technician_service_id, "technician_service_id"),
        )

    def get_by_technician_and_provider_service(
        self,
        *,
        technician_id: str | UUID,
        provider_service_id: str | UUID,
    ) -> TechnicianService | None:
        return self.db.scalar(
            select(TechnicianService).where(
                TechnicianService.technician_id == _to_uuid(
                    technician_id,
                    "technician_id",
                ),
                TechnicianService.provider_service_id == _to_uuid(
                    provider_service_id,
                    "provider_service_id",
                ),
            )
        )

    def get_detail_by_id(
        self,
        technician_service_id: str | UUID,
    ) -> tuple[TechnicianService, Technician, ProviderService, ServiceCatalog] | None:
        row = self.db.execute(
            select(
                TechnicianService,
                Technician,
                ProviderService,
                ServiceCatalog,
            )
            .join(Technician, Technician.id == TechnicianService.technician_id)
            .join(
                ProviderService,
                ProviderService.id == TechnicianService.provider_service_id,
            )
            .join(
                ServiceCatalog,
                ServiceCatalog.id == ProviderService.service_catalog_id,
            )
            .where(
                TechnicianService.id == _to_uuid(
                    technician_service_id,
                    "technician_service_id",
                )
            )
        ).first()

        if row is None:
            return None

        return row[0], row[1], row[2], row[3]

    def list(
        self,
        *,
        technician_id: str | UUID | None = None,
        provider_service_id: str | UUID | None = None,
        provider_profile_id: str | UUID | None = None,
        service_catalog_id: str | UUID | None = None,
        skill_level: str | None = None,
        is_enabled: bool | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[TechnicianService, Technician, ProviderService, ServiceCatalog]], int]:
        query = (
            select(
                TechnicianService,
                Technician,
                ProviderService,
                ServiceCatalog,
            )
            .join(Technician, Technician.id == TechnicianService.technician_id)
            .join(
                ProviderService,
                ProviderService.id == TechnicianService.provider_service_id,
            )
            .join(
                ServiceCatalog,
                ServiceCatalog.id == ProviderService.service_catalog_id,
            )
            .where(
                Technician.deleted_at.is_(None),
            )
        )

        if technician_id is not None:
            query = query.where(
                TechnicianService.technician_id == _to_uuid(
                    technician_id,
                    "technician_id",
                )
            )

        if provider_service_id is not None:
            query = query.where(
                TechnicianService.provider_service_id == _to_uuid(
                    provider_service_id,
                    "provider_service_id",
                )
            )

        if provider_profile_id is not None:
            provider_profile_uuid = _to_uuid(
                provider_profile_id,
                "provider_profile_id",
            )

            query = query.where(
                Technician.provider_profile_id == provider_profile_uuid,
                ProviderService.provider_profile_id == provider_profile_uuid,
            )

        if service_catalog_id is not None:
            query = query.where(
                ProviderService.service_catalog_id == _to_uuid(
                    service_catalog_id,
                    "service_catalog_id",
                )
            )

        if skill_level is not None:
            query = query.where(TechnicianService.skill_level == skill_level)

        if is_enabled is not None:
            query = query.where(TechnicianService.is_enabled == is_enabled)

        return self._paginate(
            query.order_by(TechnicianService.created_at.desc()),
            limit,
            offset,
        )

    def has_enabled_technician_for_provider_and_catalog(
        self,
        *,
        provider_profile_id: str | UUID,
        service_catalog_id: str | UUID,
    ) -> bool:
        query = (
            select(func.count())
            .select_from(TechnicianService)
            .join(Technician, Technician.id == TechnicianService.technician_id)
            .join(
                ProviderService,
                ProviderService.id == TechnicianService.provider_service_id,
            )
            .where(
                Technician.provider_profile_id == _to_uuid(
                    provider_profile_id,
                    "provider_profile_id",
                ),
                ProviderService.provider_profile_id == _to_uuid(
                    provider_profile_id,
                    "provider_profile_id",
                ),
                ProviderService.service_catalog_id == _to_uuid(
                    service_catalog_id,
                    "service_catalog_id",
                ),
                ProviderService.is_available.is_(True),
                TechnicianService.is_enabled.is_(True),
                Technician.deleted_at.is_(None),
                Technician.status == "ACTIVE",
            )
        )

        return int(self.db.scalar(query) or 0) > 0

    def list_by_technician(
        self,
        technician_id: str | UUID,
        *,
        is_enabled: bool | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[TechnicianService, Technician, ProviderService, ServiceCatalog]], int]:
        return self.list(
            technician_id=technician_id,
            is_enabled=is_enabled,
            limit=limit,
            offset=offset,
        )

    def list_by_provider(
        self,
        provider_profile_id: str | UUID,
        *,
        service_catalog_id: str | UUID | None = None,
        is_enabled: bool | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[TechnicianService, Technician, ProviderService, ServiceCatalog]], int]:
        return self.list(
            provider_profile_id=provider_profile_id,
            service_catalog_id=service_catalog_id,
            is_enabled=is_enabled,
            limit=limit,
            offset=offset,
        )

    def add(self, technician_service: TechnicianService) -> TechnicianService:
        self.db.add(technician_service)
        self.db.flush()
        return technician_service

    def _paginate(
        self,
        query: Select[
            tuple[TechnicianService, Technician, ProviderService, ServiceCatalog]
        ],
        limit: int,
        offset: int,
    ) -> tuple[list[tuple[TechnicianService, Technician, ProviderService, ServiceCatalog]], int]:
        total = self.db.scalar(select(func.count()).select_from(query.subquery()))
        rows = self.db.execute(query.offset(offset).limit(limit)).all()
        return [(row[0], row[1], row[2], row[3]) for row in rows], int(total or 0)
