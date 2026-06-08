from __future__ import annotations

from datetime import datetime
from uuid import UUID

from sqlalchemy import Select, func, select, union
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.common.validators import escape_like
from app.modules.assignment.models import Assignment
from app.modules.incident.models import Incident
from app.modules.incident_candidate_provider.models import IncidentCandidateProvider
from app.modules.incident_offer.models import IncidentOffer


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class IncidentRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(self, incident_id: str | UUID) -> Incident | None:
        return self.db.get(Incident, _to_uuid(incident_id, "incident_id"))

    def get_by_code(self, incident_code: str) -> Incident | None:
        return self.db.scalar(
            select(Incident).where(
                Incident.incident_code == incident_code.strip().upper()
            )
        )

    def list_by_customer(
        self,
        customer_id: str | UUID,
        *,
        status: str | None = None,
        priority: str | None = None,
        service_catalog_id: str | UUID | None = None,
        search: str | None = None,
        reported_from: datetime | None = None,
        reported_to: datetime | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[Incident], int]:
        query = select(Incident).where(
            Incident.customer_id == _to_uuid(customer_id, "customer_id"),
            Incident.deleted_at.is_(None),
        )

        return self._apply_filters_and_paginate(
            query=query,
            status=status,
            priority=priority,
            service_catalog_id=service_catalog_id,
            search=search,
            reported_from=reported_from,
            reported_to=reported_to,
            limit=limit,
            offset=offset,
        )

    def list_by_related_provider(
        self,
        provider_profile_id: str | UUID,
        *,
        status: str | None = None,
        priority: str | None = None,
        service_catalog_id: str | UUID | None = None,
        search: str | None = None,
        reported_from: datetime | None = None,
        reported_to: datetime | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[Incident], int]:
        provider_uuid = _to_uuid(provider_profile_id, "provider_profile_id")

        related_incident_ids = union(
            select(IncidentCandidateProvider.incident_id).where(
                IncidentCandidateProvider.provider_profile_id == provider_uuid
            ),
            select(IncidentOffer.incident_id).where(
                IncidentOffer.provider_profile_id == provider_uuid
            ),
            select(Assignment.incident_id).where(
                Assignment.provider_profile_id == provider_uuid
            ),
        )

        query = select(Incident).where(
            Incident.deleted_at.is_(None),
            Incident.id.in_(related_incident_ids),
        )

        return self._apply_filters_and_paginate(
            query=query,
            status=status,
            priority=priority,
            service_catalog_id=service_catalog_id,
            search=search,
            reported_from=reported_from,
            reported_to=reported_to,
            limit=limit,
            offset=offset,
        )

    def get_by_related_provider(
        self,
        incident_id: str | UUID,
        provider_profile_id: str | UUID,
    ) -> Incident | None:
        provider_uuid = _to_uuid(provider_profile_id, "provider_profile_id")
        incident_uuid = _to_uuid(incident_id, "incident_id")

        related_exists = union(
            select(IncidentCandidateProvider.id).where(
                IncidentCandidateProvider.incident_id == incident_uuid,
                IncidentCandidateProvider.provider_profile_id == provider_uuid,
            ),
            select(IncidentOffer.id).where(
                IncidentOffer.incident_id == incident_uuid,
                IncidentOffer.provider_profile_id == provider_uuid,
            ),
            select(Assignment.id).where(
                Assignment.incident_id == incident_uuid,
                Assignment.provider_profile_id == provider_uuid,
            ),
        )

        return self.db.scalar(
            select(Incident).where(
                Incident.id == incident_uuid,
                Incident.deleted_at.is_(None),
                Incident.id.in_(related_exists),
            )
        )

    def list(
        self,
        *,
        customer_id: str | UUID | None = None,
        vehicle_id: str | UUID | None = None,
        service_catalog_id: str | UUID | None = None,
        status: str | None = None,
        priority: str | None = None,
        search: str | None = None,
        reported_from: datetime | None = None,
        reported_to: datetime | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[Incident], int]:
        query = select(Incident).where(Incident.deleted_at.is_(None))

        if customer_id is not None:
            query = query.where(
                Incident.customer_id == _to_uuid(customer_id, "customer_id")
            )

        if vehicle_id is not None:
            query = query.where(
                Incident.vehicle_id == _to_uuid(vehicle_id, "vehicle_id")
            )

        return self._apply_filters_and_paginate(
            query=query,
            status=status,
            priority=priority,
            service_catalog_id=service_catalog_id,
            search=search,
            reported_from=reported_from,
            reported_to=reported_to,
            limit=limit,
            offset=offset,
        )

    def add(self, incident: Incident) -> Incident:
        self.db.add(incident)
        self.db.flush()
        return incident

    def _apply_filters_and_paginate(
        self,
        *,
        query: Select[tuple[Incident]],
        status: str | None,
        priority: str | None,
        service_catalog_id: str | UUID | None,
        search: str | None,
        reported_from: datetime | None,
        reported_to: datetime | None,
        limit: int,
        offset: int,
    ) -> tuple[list[Incident], int]:
        if status is not None:
            query = query.where(Incident.status == status)

        if priority is not None:
            query = query.where(Incident.priority == priority)

        if service_catalog_id is not None:
            query = query.where(
                Incident.service_catalog_id == _to_uuid(
                    service_catalog_id,
                    "service_catalog_id",
                )
            )

        if search is not None:
            normalized_search = escape_like(search.strip())
            if normalized_search:
                query = query.where(
                    Incident.title.ilike(
                        f"%{normalized_search}%",
                        escape="\\",
                    )
                )

        if reported_from is not None:
            query = query.where(Incident.reported_at >= reported_from)

        if reported_to is not None:
            query = query.where(Incident.reported_at <= reported_to)

        return self._paginate(
            query.order_by(Incident.reported_at.desc()),
            limit,
            offset,
        )

    def _paginate(
        self,
        query: Select[tuple[Incident]],
        limit: int,
        offset: int,
    ) -> tuple[list[Incident], int]:
        total = self.db.scalar(select(func.count()).select_from(query.subquery()))
        items = list(self.db.scalars(query.offset(offset).limit(limit)))
        return items, int(total or 0)
