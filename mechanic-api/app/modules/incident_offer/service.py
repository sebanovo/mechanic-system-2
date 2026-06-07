from __future__ import annotations

from datetime import datetime, timezone

from app.common.exceptions import ConflictException, NotFoundException
from app.core.audit.constants import (
    IncidentCandidateProviderAuditEvent,
    IncidentOfferAuditEvent,
)
from app.core.context import RequestContext
from app.core.services.base import BaseService
from app.modules.identity.customer.repository import CustomerRepository
from app.modules.assignment.repository import AssignmentRepository
from app.modules.incident.models import Incident
from app.modules.incident_candidate_provider.models import IncidentCandidateProvider
from app.modules.incident_candidate_provider.repository import (
    IncidentCandidateProviderRepository,
)
from app.modules.incident_offer.models import IncidentOffer
from app.modules.incident_offer.repository import IncidentOfferRepository
from app.modules.incident_offer.schemas import (
    IncidentOfferCreateRequest,
    IncidentOfferResponseRequest,
)
from app.modules.notification.business_notifications import BusinessNotificationService

FINAL_OFFER_STATUSES = {"ACCEPTED", "REJECTED", "EXPIRED", "CANCELLED"}


class IncidentOfferService(BaseService):
    ALLOWED_OFFER_TRANSITIONS: dict[str, set[str]] = {
        "PENDING": {"ACCEPTED", "REJECTED", "EXPIRED", "CANCELLED"},
        "ACCEPTED": set(),
        "REJECTED": set(),
        "EXPIRED": set(),
        "CANCELLED": set(),
    }

    def __init__(
        self,
        repository: IncidentOfferRepository,
        context: RequestContext,
    ) -> None:
        super().__init__(db=repository.db, context=context)
        self.repository = repository
        self.candidate_repository = IncidentCandidateProviderRepository(self.db)
        self.assignment_repository = AssignmentRepository(self.db)
        self.customer_repository = CustomerRepository(self.db)
        self.business_notifications = BusinessNotificationService(self.db, context)

    def list(
        self,
        *,
        incident_id: str | None = None,
        candidate_provider_id: str | None = None,
        provider_profile_id: str | None = None,
        offer_status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ):
        return self.repository.list(
            incident_id=incident_id,
            candidate_provider_id=candidate_provider_id,
            provider_profile_id=provider_profile_id,
            offer_status=self._normalize_upper(offer_status),
            limit=limit,
            offset=offset,
        )

    def list_by_provider(
        self,
        provider_profile_id: str,
        *,
        offer_status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ):
        return self.repository.list_by_provider(
            provider_profile_id,
            offer_status=self._normalize_upper(offer_status),
            limit=limit,
            offset=offset,
        )

    def get_detail_or_fail(self, offer_id: str):
        detail = self.repository.get_detail_by_id(offer_id)

        if detail is None:
            raise NotFoundException("Oferta de incidente no encontrada.")

        return detail

    def create_for_candidate(
        self,
        *,
        incident_id: str,
        payload: IncidentOfferCreateRequest,
    ) -> IncidentOffer:
        candidate, incident, provider_profile = self._get_candidate_detail_or_fail(
            payload.candidate_provider_id
        )

        if str(candidate.incident_id) != incident_id:
            raise NotFoundException("Proveedor candidato no encontrado para este incidente.")

        if incident.status in {"COMPLETED", "CANCELLED"}:
            raise ConflictException("No se puede crear oferta para un incidente finalizado.")

        if candidate.candidate_status in {"DISCARDED", "EXPIRED"}:
            raise ConflictException("El proveedor candidato no está disponible.")

        if self.repository.get_accepted_by_incident(str(incident.id)) is not None:
            raise ConflictException("El incidente ya tiene una oferta aceptada.")

        if self.assignment_repository.get_active_by_incident(str(incident.id)) is not None:
            raise ConflictException("El incidente ya tiene una asignación activa.")

        existing_pending = self.repository.get_pending_by_candidate(str(candidate.id))
        if existing_pending is not None:
            raise ConflictException("Ya existe una oferta pendiente para este proveedor candidato.")

        offer = IncidentOffer(
            incident_id=incident.id,
            candidate_provider_id=candidate.id,
            provider_profile_id=provider_profile.id,
            offer_status="PENDING",
            message=self._normalize_text(payload.message),
            response_message=None,
            sent_at=datetime.now(timezone.utc),
            responded_at=None,
            expires_at=payload.expires_at,
        )

        offer = self.repository.add(offer)

        self._notify_offer_received(
            provider_profile_id=str(provider_profile.id),
            tenant_id=str(provider_profile.tenant_id),
            incident=incident,
            offer=offer,
        )

        incident.status = "WAITING_PROVIDER_RESPONSE"

        self.db.flush()

        self.audit.created(
            offer,
            IncidentOfferAuditEvent.INCIDENT_OFFER_CREATED,
            resource_type="incident_offer",
            tenant_id=str(provider_profile.tenant_id),
            event_data={
                "incident_id": str(incident.id),
                "incident_code": incident.incident_code,
                "candidate_provider_id": str(candidate.id),
                "provider_profile_id": str(provider_profile.id),
                "offer_status": offer.offer_status,
            },
        )

        self.db.commit()
        self.db.refresh(offer)

        return offer

    def _notify_offer_received(
        self,
        *,
        provider_profile_id: str,
        tenant_id: str | None,
        incident: Incident,
        offer: IncidentOffer,
    ) -> None:
        try:
            self.business_notifications.send_offer_received(
                provider_owner_user_id=None,
                tenant_id=tenant_id,
                incident_id=str(incident.id),
                offer_id=str(offer.id),
            )
        except Exception:
            return

    def accept_owned(
        self,
        *,
        provider_profile_id: str,
        offer_id: str,
        payload: IncidentOfferResponseRequest,
    ) -> IncidentOffer:
        offer, incident, candidate, provider_profile = self.get_detail_or_fail(offer_id)

        if str(offer.provider_profile_id) != provider_profile_id:
            raise NotFoundException("Oferta de incidente no encontrada.")

        return self._accept(
            offer=offer,
            incident=incident,
            candidate=candidate,
            tenant_id=str(provider_profile.tenant_id),
            payload=payload,
        )

    def reject_owned(
        self,
        *,
        provider_profile_id: str,
        offer_id: str,
        payload: IncidentOfferResponseRequest,
    ) -> IncidentOffer:
        offer, incident, candidate, provider_profile = self.get_detail_or_fail(offer_id)

        if str(offer.provider_profile_id) != provider_profile_id:
            raise NotFoundException("Oferta de incidente no encontrada.")

        return self._reject(
            offer=offer,
            incident=incident,
            candidate=candidate,
            tenant_id=str(provider_profile.tenant_id),
            payload=payload,
        )

    def cancel(
        self,
        offer_id: str,
    ) -> IncidentOffer:
        offer, _, _, provider_profile = self.get_detail_or_fail(offer_id)
        return self._cancel(offer=offer, tenant_id=str(provider_profile.tenant_id))

    def expire(
        self,
        offer_id: str,
    ) -> IncidentOffer:
        offer, incident, candidate, provider_profile = self.get_detail_or_fail(offer_id)
        return self._expire(
            offer=offer,
            incident=incident,
            candidate=candidate,
            tenant_id=str(provider_profile.tenant_id),
        )

    def _accept(
        self,
        *,
        offer: IncidentOffer,
        incident: Incident,
        candidate: IncidentCandidateProvider,
        tenant_id: str | None,
        payload: IncidentOfferResponseRequest,
    ) -> IncidentOffer:
        self._ensure_pending(offer)
        self._ensure_valid_transition(offer.offer_status, "ACCEPTED")
        if self._is_expired(offer):
            self._expire_offer_and_candidate(
                offer=offer,
                incident=incident,
                candidate=candidate,
                tenant_id=tenant_id,
                reason="expired_by_validation",
            )
            raise ConflictException("La oferta ha vencido y no puede aceptarse.")

        accepted_offer = self.repository.get_accepted_by_incident(str(incident.id))
        if accepted_offer is not None and str(accepted_offer.id) != str(offer.id):
            raise ConflictException("El incidente ya tiene una oferta aceptada.")

        if self.assignment_repository.get_active_by_incident(str(incident.id)) is not None:
            raise ConflictException("El incidente ya tiene una asignación activa.")

        offer.offer_status = "ACCEPTED"
        offer.response_message = self._normalize_text(payload.response_message)
        offer.responded_at = datetime.now(timezone.utc)

        incident.status = "PROVIDER_ACCEPTED"
        candidate.candidate_status = "SELECTED"

        self._cancel_other_pending_offers(
            incident=incident,
            accepted_offer_id=str(offer.id),
            tenant_id=tenant_id,
        )
        self._discard_other_candidates(
            incident=incident,
            selected_candidate_id=str(candidate.id),
            tenant_id=tenant_id,
        )
        self._notify_incident_offer_accepted(
            incident=incident,
            provider_profile_id=str(offer.provider_profile_id),
            tenant_id=tenant_id,
        )

        self.db.flush()

        self.audit.updated(
            offer,
            IncidentOfferAuditEvent.INCIDENT_OFFER_ACCEPTED,
            resource_type="incident_offer",
            tenant_id=tenant_id,
            event_data={
                "incident_id": str(incident.id),
                "incident_code": incident.incident_code,
                "candidate_provider_id": str(candidate.id),
                "response_message": offer.response_message,
            },
        )

        self.db.commit()
        self.db.refresh(offer)

        return offer

    def _notify_incident_offer_accepted(
        self,
        *,
        incident: Incident,
        provider_profile_id: str,
        tenant_id: str | None,
    ) -> None:
        detail = self.customer_repository.get_detail_by_customer_id(incident.customer_id)

        if detail is None:
            return

        _, customer_user = detail

        try:
            self.business_notifications.send_offer_accepted(
                recipient_user_id=str(customer_user.id),
                tenant_id=tenant_id,
                incident_id=str(incident.id),
                provider_profile_id=provider_profile_id,
            )
        except Exception:
            return

    def _reject(
        self,
        *,
        offer: IncidentOffer,
        incident: Incident,
        candidate: IncidentCandidateProvider,
        tenant_id: str | None,
        payload: IncidentOfferResponseRequest,
    ) -> IncidentOffer:
        self._ensure_pending(offer)
        self._ensure_valid_transition(offer.offer_status, "REJECTED")
        if self._is_expired(offer):
            self._expire_offer_and_candidate(
                offer=offer,
                incident=incident,
                candidate=candidate,
                tenant_id=tenant_id,
                reason="expired_by_validation",
            )
            raise ConflictException("La oferta ha vencido y no puede aceptarse.")

        offer.offer_status = "REJECTED"
        offer.response_message = self._normalize_text(payload.response_message)
        offer.responded_at = datetime.now(timezone.utc)

        candidate.candidate_status = "DISCARDED"

        accepted_offer = self.repository.get_accepted_by_incident(str(incident.id))
        if accepted_offer is None:
            pending_offers, _ = self.repository.list_pending_by_incident(str(incident.id))
            if len(pending_offers) == 0:
                incident.status = "SEARCHING_PROVIDER"

        self.db.flush()

        self.audit.updated(
            offer,
            IncidentOfferAuditEvent.INCIDENT_OFFER_REJECTED,
            resource_type="incident_offer",
            tenant_id=tenant_id,
            event_data={
                "incident_id": str(incident.id),
                "incident_code": incident.incident_code,
                "candidate_provider_id": str(candidate.id),
                "response_message": offer.response_message,
            },
        )

        self.db.commit()
        self.db.refresh(offer)

        return offer

    def _cancel(
        self,
        *,
        offer: IncidentOffer,
        tenant_id: str | None,
    ) -> IncidentOffer:
        self._ensure_pending(offer)
        self._ensure_valid_transition(offer.offer_status, "CANCELLED")

        offer.offer_status = "CANCELLED"
        offer.responded_at = datetime.now(timezone.utc)

        self.db.flush()

        self.audit.updated(
            offer,
            IncidentOfferAuditEvent.INCIDENT_OFFER_CANCELLED,
            resource_type="incident_offer",
            tenant_id=tenant_id,
            event_data={
                "offer_id": str(offer.id),
                "incident_id": str(offer.incident_id),
                "provider_profile_id": str(offer.provider_profile_id),
                "offer_status": offer.offer_status,
            },
        )

        self.db.commit()
        self.db.refresh(offer)

        return offer

    def _expire(
        self,
        *,
        offer: IncidentOffer,
        incident: Incident | None = None,
        candidate: IncidentCandidateProvider | None = None,
        tenant_id: str | None,
    ) -> IncidentOffer:
        self._ensure_pending(offer)
        self._ensure_valid_transition(offer.offer_status, "EXPIRED")
        return self._expire_offer_and_candidate(
            offer=offer,
            incident=incident,
            candidate=candidate,
            tenant_id=tenant_id,
            reason="manual_expire",
        )

    def _cancel_other_pending_offers(
        self,
        *,
        incident: Incident,
        accepted_offer_id: str,
        tenant_id: str | None,
    ) -> None:
        pending_offers, _ = self.repository.list_pending_by_incident(str(incident.id))

        for pending_offer, _, _, _ in pending_offers:
            if str(pending_offer.id) == accepted_offer_id:
                continue

            previous_status = pending_offer.offer_status
            pending_offer.offer_status = "CANCELLED"
            pending_offer.responded_at = datetime.now(timezone.utc)

            self.audit.updated(
                pending_offer,
                IncidentOfferAuditEvent.INCIDENT_OFFER_STATUS_CHANGED,
                resource_type="incident_offer",
                tenant_id=tenant_id,
                event_data={
                    "incident_id": str(incident.id),
                    "incident_code": incident.incident_code,
                    "previous_status": previous_status,
                    "offer_status": pending_offer.offer_status,
                    "reason": "accepted_by_other_offer",
                    "accepted_offer_id": accepted_offer_id,
                },
            )

    def _discard_other_candidates(
        self,
        *,
        incident: Incident,
        selected_candidate_id: str,
        tenant_id: str | None,
    ) -> None:
        candidates, _ = self.candidate_repository.list_by_incident(str(incident.id))

        for candidate, _, _ in candidates:
            if str(candidate.id) == selected_candidate_id:
                continue

            previous_status = candidate.candidate_status
            if previous_status == "DISCARDED":
                continue

            candidate.candidate_status = "DISCARDED"

            self.audit.updated(
                candidate,
                IncidentCandidateProviderAuditEvent.INCIDENT_CANDIDATE_PROVIDER_STATUS_CHANGED,
                resource_type="incident_candidate_provider",
                tenant_id=tenant_id,
                event_data={
                    "incident_id": str(incident.id),
                    "incident_code": incident.incident_code,
                    "previous_status": previous_status,
                    "candidate_status": candidate.candidate_status,
                    "reason": "other_offer_accepted",
                    "selected_candidate_id": selected_candidate_id,
                },
            )

    def _get_candidate_detail_or_fail(
        self,
        candidate_provider_id: str,
    ):
        detail = self.candidate_repository.get_detail_by_id(candidate_provider_id)

        if detail is None:
            raise NotFoundException("Proveedor candidato no encontrado.")

        return detail

    def _ensure_pending(self, offer: IncidentOffer) -> None:
        if offer.offer_status != "PENDING":
            raise ConflictException("La oferta ya fue respondida o no está pendiente.")

    def _ensure_valid_transition(self, current_status: str, next_status: str) -> None:
        allowed_next_statuses = self.ALLOWED_OFFER_TRANSITIONS.get(current_status, set())

        if next_status not in allowed_next_statuses:
            raise ConflictException("Transición de estado no permitida.")

    def _is_expired(self, offer: IncidentOffer) -> bool:
        return offer.expires_at is not None and offer.expires_at <= datetime.now(timezone.utc)

    def _expire_offer_and_candidate(
        self,
        *,
        offer: IncidentOffer,
        incident: Incident | None,
        candidate: IncidentCandidateProvider | None,
        tenant_id: str | None,
        reason: str,
    ) -> IncidentOffer:
        previous_offer_status = offer.offer_status
        previous_candidate_status = candidate.candidate_status if candidate is not None else None

        offer.offer_status = "EXPIRED"
        offer.responded_at = datetime.now(timezone.utc)

        if candidate is not None:
            candidate.candidate_status = "EXPIRED"

        self.db.flush()

        self.audit.updated(
            offer,
            IncidentOfferAuditEvent.INCIDENT_OFFER_EXPIRED,
            resource_type="incident_offer",
            tenant_id=tenant_id,
            event_data={
                "offer_id": str(offer.id),
                "incident_id": str(offer.incident_id),
                "provider_profile_id": str(offer.provider_profile_id),
                "previous_status": previous_offer_status,
                "offer_status": offer.offer_status,
                "reason": reason,
            },
        )

        if candidate is not None and previous_candidate_status != candidate.candidate_status:
            self.audit.updated(
                candidate,
                IncidentCandidateProviderAuditEvent.INCIDENT_CANDIDATE_PROVIDER_STATUS_CHANGED,
                resource_type="incident_candidate_provider",
                tenant_id=tenant_id,
                event_data={
                    "incident_id": str(incident.id) if incident is not None else str(offer.incident_id),
                    "previous_status": previous_candidate_status,
                    "candidate_status": candidate.candidate_status,
                    "reason": "offer_expired",
                    "offer_id": str(offer.id),
                },
            )

        self.db.commit()
        self.db.refresh(offer)
        if candidate is not None:
            self.db.refresh(candidate)

        return offer

    def _normalize_text(self, value: str | None) -> str | None:
        if value is None:
            return None

        normalized = value.strip()
        return normalized or None

    def _normalize_upper(self, value: str | None) -> str | None:
        normalized = self._normalize_text(value)
        return normalized.upper() if normalized else None
