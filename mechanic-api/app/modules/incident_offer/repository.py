from __future__ import annotations

from uuid import UUID

from sqlalchemy import Select, func, select
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.modules.identity.provider.models import ProviderProfile
from app.modules.incident.models import Incident
from app.modules.incident_candidate_provider.models import IncidentCandidateProvider
from app.modules.incident_offer.models import IncidentOffer


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class IncidentOfferRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(self, offer_id: str | UUID) -> IncidentOffer | None:
        return self.db.get(
            IncidentOffer,
            _to_uuid(offer_id, "incident_offer_id"),
        )

    def get_pending_by_candidate(
        self,
        candidate_provider_id: str | UUID,
    ) -> IncidentOffer | None:
        return self.db.scalar(
            select(IncidentOffer).where(
                IncidentOffer.candidate_provider_id == _to_uuid(
                    candidate_provider_id,
                    "candidate_provider_id",
                ),
                IncidentOffer.offer_status == "PENDING",
            )
        )

    def get_accepted_by_incident(
        self,
        incident_id: str | UUID,
    ) -> IncidentOffer | None:
        return self.db.scalar(
            select(IncidentOffer).where(
                IncidentOffer.incident_id == _to_uuid(incident_id, "incident_id"),
                IncidentOffer.offer_status == "ACCEPTED",
            )
        )

    def list_by_incident(
        self,
        incident_id: str | UUID,
        *,
        offer_status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[
        list[
            tuple[
                IncidentOffer,
                Incident,
                IncidentCandidateProvider,
                ProviderProfile,
            ]
        ],
        int,
    ]:
        return self.list(
            incident_id=incident_id,
            offer_status=offer_status,
            limit=limit,
            offset=offset,
        )

    def list_pending_by_incident(
        self,
        incident_id: str | UUID,
        *,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[
        list[
            tuple[
                IncidentOffer,
                Incident,
                IncidentCandidateProvider,
                ProviderProfile,
            ]
        ],
        int,
    ]:
        return self.list(
            incident_id=incident_id,
            offer_status="PENDING",
            limit=limit,
            offset=offset,
        )

    def get_detail_by_id(
        self,
        offer_id: str | UUID,
    ) -> tuple[
        IncidentOffer,
        Incident,
        IncidentCandidateProvider,
        ProviderProfile,
    ] | None:
        row = self.db.execute(
            select(
                IncidentOffer,
                Incident,
                IncidentCandidateProvider,
                ProviderProfile,
            )
            .join(Incident, Incident.id == IncidentOffer.incident_id)
            .join(
                IncidentCandidateProvider,
                IncidentCandidateProvider.id == IncidentOffer.candidate_provider_id,
            )
            .join(
                ProviderProfile,
                ProviderProfile.id == IncidentOffer.provider_profile_id,
            )
            .where(IncidentOffer.id == _to_uuid(offer_id, "incident_offer_id"))
        ).first()

        if row is None:
            return None

        return row[0], row[1], row[2], row[3]

    def list(
        self,
        *,
        incident_id: str | UUID | None = None,
        candidate_provider_id: str | UUID | None = None,
        provider_profile_id: str | UUID | None = None,
        offer_status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[
        list[
            tuple[
                IncidentOffer,
                Incident,
                IncidentCandidateProvider,
                ProviderProfile,
            ]
        ],
        int,
    ]:
        query = (
            select(
                IncidentOffer,
                Incident,
                IncidentCandidateProvider,
                ProviderProfile,
            )
            .join(Incident, Incident.id == IncidentOffer.incident_id)
            .join(
                IncidentCandidateProvider,
                IncidentCandidateProvider.id == IncidentOffer.candidate_provider_id,
            )
            .join(
                ProviderProfile,
                ProviderProfile.id == IncidentOffer.provider_profile_id,
            )
            .where(Incident.deleted_at.is_(None))
        )

        if incident_id is not None:
            query = query.where(
                IncidentOffer.incident_id == _to_uuid(incident_id, "incident_id")
            )

        if candidate_provider_id is not None:
            query = query.where(
                IncidentOffer.candidate_provider_id
                == _to_uuid(candidate_provider_id, "candidate_provider_id")
            )

        if provider_profile_id is not None:
            query = query.where(
                IncidentOffer.provider_profile_id
                == _to_uuid(provider_profile_id, "provider_profile_id")
            )

        if offer_status is not None:
            query = query.where(IncidentOffer.offer_status == offer_status)

        return self._paginate(
            query.order_by(IncidentOffer.created_at.desc()),
            limit,
            offset,
        )

    def list_by_provider(
        self,
        provider_profile_id: str | UUID,
        *,
        offer_status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[
        list[
            tuple[
                IncidentOffer,
                Incident,
                IncidentCandidateProvider,
                ProviderProfile,
            ]
        ],
        int,
    ]:
        return self.list(
            provider_profile_id=provider_profile_id,
            offer_status=offer_status,
            limit=limit,
            offset=offset,
        )

    def add(self, offer: IncidentOffer) -> IncidentOffer:
        self.db.add(offer)
        self.db.flush()
        return offer

    def _paginate(
        self,
        query: Select[
            tuple[
                IncidentOffer,
                Incident,
                IncidentCandidateProvider,
                ProviderProfile,
            ]
        ],
        limit: int,
        offset: int,
    ) -> tuple[
        list[
            tuple[
                IncidentOffer,
                Incident,
                IncidentCandidateProvider,
                ProviderProfile,
            ]
        ],
        int,
    ]:
        total = self.db.scalar(select(func.count()).select_from(query.subquery()))
        rows = self.db.execute(query.offset(offset).limit(limit)).all()
        return [(row[0], row[1], row[2], row[3]) for row in rows], int(total or 0)
