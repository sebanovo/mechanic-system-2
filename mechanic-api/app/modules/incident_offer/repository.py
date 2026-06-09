from __future__ import annotations

from datetime import datetime, timezone
from typing import Any
from uuid import UUID

from sqlalchemy import Select, and_, func, select
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.modules.identity.customer.models import Customer
from app.modules.identity.provider.models import ProviderProfile
from app.modules.identity.user.models import User
from app.modules.incident.models import Incident
from app.modules.incident_ai_analysis.models import IncidentAiAnalysis
from app.modules.incident_candidate_provider.models import IncidentCandidateProvider
from app.modules.incident_offer.models import IncidentOffer
from app.modules.service_catalog.models import ServiceCatalog
from app.modules.vehicle.models import Vehicle


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class IncidentOfferRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def _latest_analysis_subquery(self):
        return (
            select(
                IncidentAiAnalysis.incident_id.label("incident_id"),
                func.max(IncidentAiAnalysis.created_at).label("latest_created_at"),
            )
            .group_by(IncidentAiAnalysis.incident_id)
            .subquery()
        )

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

    def get_by_incident_and_provider(
        self,
        *,
        incident_id: str | UUID,
        provider_profile_id: str | UUID,
    ) -> IncidentOffer | None:
        return self.db.scalar(
            select(IncidentOffer).where(
                IncidentOffer.incident_id == _to_uuid(
                    incident_id,
                    "incident_id",
                ),
                IncidentOffer.provider_profile_id == _to_uuid(
                    provider_profile_id,
                    "provider_profile_id",
                ),
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

    def list_pending_due_by_incident(
        self,
        *,
        incident_id: str | UUID,
        now: datetime,
    ) -> list[
        tuple[
            IncidentOffer,
            IncidentCandidateProvider,
            ProviderProfile,
        ]
    ]:
        query = (
            select(
                IncidentOffer,
                IncidentCandidateProvider,
                ProviderProfile,
            )
            .join(
                IncidentCandidateProvider,
                IncidentCandidateProvider.id == IncidentOffer.candidate_provider_id,
            )
            .join(
                ProviderProfile,
                ProviderProfile.id == IncidentOffer.provider_profile_id,
            )
            .where(
                IncidentOffer.incident_id == _to_uuid(incident_id, "incident_id"),
                IncidentOffer.offer_status == "PENDING",
                IncidentOffer.expires_at.is_not(None),
                IncidentOffer.expires_at <= now,
            )
        )

        rows = self.db.execute(query).all()
        return [(row[0], row[1], row[2]) for row in rows]

    def list_pending_due(
        self,
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
        now = datetime.now(timezone.utc)
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
            .where(
                Incident.deleted_at.is_(None),
                IncidentOffer.offer_status == "PENDING",
                IncidentOffer.expires_at.is_not(None),
                IncidentOffer.expires_at <= now,
            )
        )

        return self._paginate(
            query.order_by(IncidentOffer.expires_at.asc(), IncidentOffer.created_at.asc()),
            limit,
            offset,
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

    def get_public_detail_by_id(
        self,
        offer_id: str | UUID,
    ) -> tuple[
        IncidentOffer,
        Incident,
        ServiceCatalog | None,
        IncidentAiAnalysis | None,
        Customer | None,
        User | None,
        Vehicle | None,
        ProviderProfile,
    ] | None:
        latest_analysis = self._latest_analysis_subquery()
        row = self.db.execute(
            select(
                IncidentOffer,
                Incident,
                ServiceCatalog,
                IncidentAiAnalysis,
                Customer,
                User,
                Vehicle,
                ProviderProfile,
            )
            .join(Incident, Incident.id == IncidentOffer.incident_id)
            .join(
                ProviderProfile,
                ProviderProfile.id == IncidentOffer.provider_profile_id,
            )
            .outerjoin(
                ServiceCatalog,
                ServiceCatalog.id == Incident.service_catalog_id,
            )
            .outerjoin(
                Vehicle,
                and_(
                    Vehicle.id == Incident.vehicle_id,
                    Vehicle.deleted_at.is_(None),
                ),
            )
            .outerjoin(
                Customer,
                and_(
                    Customer.id == Incident.customer_id,
                    Customer.deleted_at.is_(None),
                ),
            )
            .outerjoin(
                User,
                and_(
                    User.id == Customer.user_id,
                    User.deleted_at.is_(None),
                ),
            )
            .outerjoin(
                latest_analysis,
                latest_analysis.c.incident_id == Incident.id,
            )
            .outerjoin(
                IncidentAiAnalysis,
                and_(
                    IncidentAiAnalysis.incident_id == latest_analysis.c.incident_id,
                    IncidentAiAnalysis.created_at
                    == latest_analysis.c.latest_created_at,
                ),
            )
            .where(IncidentOffer.id == _to_uuid(offer_id, "incident_offer_id"))
        ).first()

        if row is None:
            return None

        return row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7]

    def list_public(
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
                ServiceCatalog | None,
                Vehicle | None,
                IncidentAiAnalysis | None,
            ]
        ],
        int,
    ]:
        latest_analysis = self._latest_analysis_subquery()
        query = (
            select(
                IncidentOffer,
                Incident,
                ServiceCatalog,
                Vehicle,
                IncidentAiAnalysis,
            )
            .join(Incident, Incident.id == IncidentOffer.incident_id)
            .outerjoin(
                ServiceCatalog,
                ServiceCatalog.id == Incident.service_catalog_id,
            )
            .outerjoin(
                Vehicle,
                and_(
                    Vehicle.id == Incident.vehicle_id,
                    Vehicle.deleted_at.is_(None),
                ),
            )
            .outerjoin(
                latest_analysis,
                latest_analysis.c.incident_id == Incident.id,
            )
            .outerjoin(
                IncidentAiAnalysis,
                and_(
                    IncidentAiAnalysis.incident_id == latest_analysis.c.incident_id,
                    IncidentAiAnalysis.created_at
                    == latest_analysis.c.latest_created_at,
                ),
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

        return self._paginate_public(
            query.order_by(IncidentOffer.created_at.desc()),
            limit,
            offset,
        )

    def list_public_by_provider(
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
                ServiceCatalog | None,
                Vehicle | None,
                IncidentAiAnalysis | None,
            ]
        ],
        int,
    ]:
        return self.list_public(
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

    def _paginate_public(
        self,
        query: Select[Any],
        limit: int,
        offset: int,
    ) -> tuple[
        list[
            tuple[
                IncidentOffer,
                Incident,
                ServiceCatalog | None,
                Vehicle | None,
                IncidentAiAnalysis | None,
            ]
        ],
        int,
    ]:
        total = self.db.scalar(select(func.count()).select_from(query.subquery()))
        rows = self.db.execute(query.offset(offset).limit(limit)).all()
        return [(row[0], row[1], row[2], row[3], row[4]) for row in rows], int(total or 0)
