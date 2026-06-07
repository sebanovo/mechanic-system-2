from __future__ import annotations

from uuid import UUID

from sqlalchemy import Select, func, select
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.modules.assignment.models import Assignment
from app.modules.identity.provider.models import ProviderProfile
from app.modules.identity.technician.models import Technician
from app.modules.incident.models import Incident
from app.modules.incident_offer.models import IncidentOffer


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class AssignmentRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(self, assignment_id: str | UUID) -> Assignment | None:
        return self.db.get(
            Assignment,
            _to_uuid(assignment_id, "assignment_id"),
        )

    def get_active_by_incident(
        self,
        incident_id: str | UUID,
    ) -> Assignment | None:
        return self.db.scalar(
            select(Assignment).where(
                Assignment.incident_id == _to_uuid(incident_id, "incident_id"),
                Assignment.assignment_status.notin_(["COMPLETED", "CANCELLED"]),
            )
        )

    def get_active_by_technician(
        self,
        technician_id: str | UUID,
        *,
        exclude_assignment_id: str | UUID | None = None,
    ) -> Assignment | None:
        query = select(Assignment).where(
            Assignment.technician_id == _to_uuid(technician_id, "technician_id"),
            Assignment.assignment_status.notin_(["COMPLETED", "CANCELLED"]),
        )

        if exclude_assignment_id is not None:
            query = query.where(
                Assignment.id != _to_uuid(
                    exclude_assignment_id,
                    "exclude_assignment_id",
                )
            )

        return self.db.scalar(query)

    def get_detail_by_id(
        self,
        assignment_id: str | UUID,
    ) -> tuple[Assignment, Incident, IncidentOffer, ProviderProfile, Technician] | None:
        row = self.db.execute(
            select(
                Assignment,
                Incident,
                IncidentOffer,
                ProviderProfile,
                Technician,
            )
            .join(Incident, Incident.id == Assignment.incident_id)
            .join(IncidentOffer, IncidentOffer.id == Assignment.offer_id)
            .join(ProviderProfile, ProviderProfile.id == Assignment.provider_profile_id)
            .join(Technician, Technician.id == Assignment.technician_id)
            .where(Assignment.id == _to_uuid(assignment_id, "assignment_id"))
        ).first()

        if row is None:
            return None

        return row[0], row[1], row[2], row[3], row[4]

    def list(
        self,
        *,
        incident_id: str | UUID | None = None,
        offer_id: str | UUID | None = None,
        provider_profile_id: str | UUID | None = None,
        technician_id: str | UUID | None = None,
        assignment_status: str | None = None,
        exclude_assignment_statuses: list[str] | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[
        list[tuple[Assignment, Incident, IncidentOffer, ProviderProfile, Technician]],
        int,
    ]:
        query = (
            select(
                Assignment,
                Incident,
                IncidentOffer,
                ProviderProfile,
                Technician,
            )
            .join(Incident, Incident.id == Assignment.incident_id)
            .join(IncidentOffer, IncidentOffer.id == Assignment.offer_id)
            .join(ProviderProfile, ProviderProfile.id == Assignment.provider_profile_id)
            .join(Technician, Technician.id == Assignment.technician_id)
            .where(Incident.deleted_at.is_(None))
        )

        if incident_id is not None:
            query = query.where(
                Assignment.incident_id == _to_uuid(incident_id, "incident_id")
            )

        if offer_id is not None:
            query = query.where(
                Assignment.offer_id == _to_uuid(offer_id, "offer_id")
            )

        if provider_profile_id is not None:
            query = query.where(
                Assignment.provider_profile_id == _to_uuid(
                    provider_profile_id,
                    "provider_profile_id",
                )
            )

        if technician_id is not None:
            query = query.where(
                Assignment.technician_id == _to_uuid(technician_id, "technician_id")
            )

        if assignment_status is not None:
            query = query.where(Assignment.assignment_status == assignment_status)

        if exclude_assignment_statuses is not None:
            query = query.where(
                Assignment.assignment_status.notin_(exclude_assignment_statuses)
            )

        return self._paginate(
            query.order_by(Assignment.created_at.desc()),
            limit,
            offset,
        )

    def list_by_technician(
        self,
        technician_id: str | UUID,
        *,
        assignment_status: str | None = None,
        exclude_assignment_statuses: list[str] | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[
        list[tuple[Assignment, Incident, IncidentOffer, ProviderProfile, Technician]],
        int,
    ]:
        return self.list(
            technician_id=technician_id,
            assignment_status=assignment_status,
            exclude_assignment_statuses=exclude_assignment_statuses,
            limit=limit,
            offset=offset,
        )

    def get_owned_by_technician(
        self,
        assignment_id: str | UUID,
        technician_id: str | UUID,
    ) -> Assignment | None:
        return self.db.scalar(
            select(Assignment).where(
                Assignment.id == _to_uuid(assignment_id, "assignment_id"),
                Assignment.technician_id == _to_uuid(technician_id, "technician_id"),
            )
        )

    def list_by_provider(
        self,
        provider_profile_id: str | UUID,
        *,
        assignment_status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[
        list[tuple[Assignment, Incident, IncidentOffer, ProviderProfile, Technician]],
        int,
    ]:
        return self.list(
            provider_profile_id=provider_profile_id,
            assignment_status=assignment_status,
            limit=limit,
            offset=offset,
        )

    def add(self, assignment: Assignment) -> Assignment:
        self.db.add(assignment)
        self.db.flush()
        return assignment

    def _paginate(
        self,
        query: Select[
            tuple[Assignment, Incident, IncidentOffer, ProviderProfile, Technician]
        ],
        limit: int,
        offset: int,
    ) -> tuple[
        list[tuple[Assignment, Incident, IncidentOffer, ProviderProfile, Technician]],
        int,
    ]:
        total = self.db.scalar(select(func.count()).select_from(query.subquery()))
        rows = self.db.execute(query.offset(offset).limit(limit)).all()
        return [(row[0], row[1], row[2], row[3], row[4]) for row in rows], int(total or 0)
