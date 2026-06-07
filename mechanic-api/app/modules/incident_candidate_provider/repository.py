from __future__ import annotations

from uuid import UUID

from sqlalchemy import Select, func, select
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.modules.identity.provider.models import ProviderProfile
from app.modules.incident.models import Incident
from app.modules.incident_candidate_provider.models import IncidentCandidateProvider


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class IncidentCandidateProviderRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(
        self,
        candidate_id: str | UUID,
    ) -> IncidentCandidateProvider | None:
        return self.db.get(
            IncidentCandidateProvider,
            _to_uuid(candidate_id, "candidate_provider_id"),
        )

    def get_by_incident_and_provider(
        self,
        *,
        incident_id: str | UUID,
        provider_profile_id: str | UUID,
    ) -> IncidentCandidateProvider | None:
        return self.db.scalar(
            select(IncidentCandidateProvider).where(
                IncidentCandidateProvider.incident_id == _to_uuid(
                    incident_id,
                    "incident_id",
                ),
                IncidentCandidateProvider.provider_profile_id == _to_uuid(
                    provider_profile_id,
                    "provider_profile_id",
                ),
            )
        )

    def get_detail_by_id(
        self,
        candidate_id: str | UUID,
    ) -> tuple[IncidentCandidateProvider, Incident, ProviderProfile] | None:
        row = self.db.execute(
            select(IncidentCandidateProvider, Incident, ProviderProfile)
            .join(Incident, Incident.id == IncidentCandidateProvider.incident_id)
            .join(
                ProviderProfile,
                ProviderProfile.id == IncidentCandidateProvider.provider_profile_id,
            )
            .where(
                IncidentCandidateProvider.id == _to_uuid(
                    candidate_id,
                    "candidate_provider_id",
                )
            )
        ).first()

        if row is None:
            return None

        return row[0], row[1], row[2]

    def list(
        self,
        *,
        incident_id: str | UUID | None = None,
        provider_profile_id: str | UUID | None = None,
        candidate_status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[IncidentCandidateProvider, Incident, ProviderProfile]], int]:
        query = (
            select(IncidentCandidateProvider, Incident, ProviderProfile)
            .join(Incident, Incident.id == IncidentCandidateProvider.incident_id)
            .join(
                ProviderProfile,
                ProviderProfile.id == IncidentCandidateProvider.provider_profile_id,
            )
            .where(Incident.deleted_at.is_(None))
        )

        if incident_id is not None:
            query = query.where(
                IncidentCandidateProvider.incident_id == _to_uuid(
                    incident_id,
                    "incident_id",
                )
            )

        if provider_profile_id is not None:
            query = query.where(
                IncidentCandidateProvider.provider_profile_id == _to_uuid(
                    provider_profile_id,
                    "provider_profile_id",
                )
            )

        if candidate_status is not None:
            query = query.where(
                IncidentCandidateProvider.candidate_status == candidate_status
            )

        return self._paginate(
            query.order_by(IncidentCandidateProvider.created_at.desc()),
            limit,
            offset,
        )

    def list_by_incident(
        self,
        incident_id: str | UUID,
        *,
        candidate_status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[IncidentCandidateProvider, Incident, ProviderProfile]], int]:
        return self.list(
            incident_id=incident_id,
            candidate_status=candidate_status,
            limit=limit,
            offset=offset,
        )

    def list_by_provider(
        self,
        provider_profile_id: str | UUID,
        *,
        candidate_status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[IncidentCandidateProvider, Incident, ProviderProfile]], int]:
        return self.list(
            provider_profile_id=provider_profile_id,
            candidate_status=candidate_status,
            limit=limit,
            offset=offset,
        )

    def add(
        self,
        candidate: IncidentCandidateProvider,
    ) -> IncidentCandidateProvider:
        self.db.add(candidate)
        self.db.flush()
        return candidate

    def _paginate(
        self,
        query: Select[tuple[IncidentCandidateProvider, Incident, ProviderProfile]],
        limit: int,
        offset: int,
    ) -> tuple[list[tuple[IncidentCandidateProvider, Incident, ProviderProfile]], int]:
        total = self.db.scalar(select(func.count()).select_from(query.subquery()))
        rows = self.db.execute(query.offset(offset).limit(limit)).all()
        return [(row[0], row[1], row[2]) for row in rows], int(total or 0)