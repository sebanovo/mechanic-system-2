from __future__ import annotations

import math
import logging

from decimal import Decimal, ROUND_HALF_UP
from typing import Any

from sqlalchemy.orm import Session

from app.core.context import RequestContext
from app.modules.assignment.repository import AssignmentRepository
from app.modules.identity.technician.repository import TechnicianRepository
from app.modules.identity.provider.repository import ProviderProfileRepository
from app.modules.identity.customer.repository import CustomerRepository
from app.modules.identity.tenant.repository import TenantRepository
from app.modules.incident.repository import IncidentRepository
from app.modules.incident_ai_analysis.repository import IncidentAiAnalysisRepository
from app.modules.incident_offer.repository import IncidentOfferRepository
from app.modules.identity.membership.repository import TenantMembershipRepository
from app.modules.identity.user.repository import UserRepository
from app.modules.notification.constants import NotificationType
from app.modules.notification.builders.assignment_notification_builder import (
    AssignmentNotificationInput,
    build_assignment_notifications,
)
from app.modules.notification.builders.incident_offer_notification_builder import (
    ClientOfferAcceptedNotificationInput,
    IncidentOfferNotificationInput,
    build_client_offer_accepted_notification,
    build_incident_offer_notification,
)
from app.modules.notification.builders.incident_unattended_notification_builder import (
    IncidentUnattendedNotificationInput,
    build_incident_unattended_notification,
)
from app.modules.notification.repository import NotificationRepository
from app.modules.notification.schemas import NotificationSendRequest
from app.modules.notification.service import NotificationService
from app.modules.service_catalog.repository import ServiceCatalogRepository
from app.modules.vehicle.repository import VehicleRepository

logger = logging.getLogger(__name__)


class BusinessNotificationService:
    def __init__(self, db: Session, context: RequestContext) -> None:
        self.db = db
        self.notification_service = NotificationService(
            repository=NotificationRepository(db),
            context=context,
        )
        self.assignment_repository = AssignmentRepository(self.db)
        self.user_repository = UserRepository(self.db)
        self.customer_repository = CustomerRepository(self.db)
        self.technician_repository = TechnicianRepository(self.db)
        self.membership_repository = TenantMembershipRepository(self.db)
        self.incident_repository = IncidentRepository(self.db)
        self.incident_ai_analysis_repository = IncidentAiAnalysisRepository(self.db)
        self.incident_offer_repository = IncidentOfferRepository(self.db)
        self.service_catalog_repository = ServiceCatalogRepository(self.db)
        self.vehicle_repository = VehicleRepository(self.db)
        self.provider_profile_repository = ProviderProfileRepository(self.db)
        self.tenant_repository = TenantRepository(self.db)

    def send_offer_received(
        self,
        *,
        provider_owner_user_id: str | None,
        tenant_id: str | None,
        incident_id: str,
        offer_id: str,
    ):
        logger.info(
            "Business notification offer received prepared. incident_id=%s offer_id=%s tenant_id=%s provider_owner_user_id=%s",
            incident_id,
            offer_id,
            tenant_id,
            provider_owner_user_id,
        )

        owner = provider_owner_user_id

        if owner is None and tenant_id is not None:
            owner = self._get_tenant_owner_user_id(
                tenant_id=tenant_id,
            )
        if owner is None:
            logger.warning(
                "Business notification offer received skipped. incident_id=%s offer_id=%s tenant_id=%s reason=no_recipient",
                incident_id,
                offer_id,
                tenant_id,
            )
            return

        notification = self._send(
            recipient_user_id=owner,
            tenant_id=tenant_id,
            notification_type=NotificationType.OFFER_RECEIVED,
            title="Nueva solicitud de servicio",
            body="Has recibido una nueva solicitud para revisar.",
            data={
                "type": NotificationType.OFFER_RECEIVED,
                "audience": "TENANT_OWNER",
                "incident_id": incident_id,
                "offer_id": offer_id,
            },
            push_data={
                "type": NotificationType.OFFER_RECEIVED,
                "audience": "TENANT_OWNER",
                "incident_id": incident_id,
                "offer_id": offer_id,
            },
        )

        logger.info(
            "Business notification offer received sent. incident_id=%s offer_id=%s notification_id=%s recipient_user_id=%s tenant_id=%s",
            incident_id,
            offer_id,
            getattr(notification, "id", None),
            owner,
            tenant_id,
        )

        return notification

    def send_offer_accepted(
        self,
        *,
        recipient_user_id: str,
        tenant_id: str | None,
        incident_id: str,
        offer_id: str,
        provider_profile_id: str,
    ):
        logger.info(
            "Business notification offer accepted requested. incident_id=%s offer_id=%s recipient_user_id=%s provider_profile_id=%s tenant_id=%s",
            incident_id,
            offer_id,
            recipient_user_id,
            provider_profile_id,
            tenant_id,
        )

        incident = self.incident_repository.get_by_id(incident_id)
        offer = self.incident_offer_repository.get_by_id(offer_id)

        if incident is None:
            logger.warning(
                "Business notification offer accepted skipped: incident not found. incident_id=%s offer_id=%s recipient_user_id=%s",
                incident_id,
                offer_id,
                recipient_user_id,
            )
            return

        service_catalog = None
        if incident.service_catalog_id is not None:
            service_catalog = self.service_catalog_repository.get_by_id(
                incident.service_catalog_id
            )

        ai_analysis = self.incident_ai_analysis_repository.get_latest_by_incident(
            incident.id
        )

        customer_detail = self.customer_repository.get_detail_by_customer_id(
            incident.customer_id
        )
        customer = customer_detail[0] if customer_detail is not None else None
        customer_user = customer_detail[1] if customer_detail is not None else None

        vehicle = self.vehicle_repository.get_by_id(incident.vehicle_id)
        provider_profile = self.provider_profile_repository.get_by_id(
            provider_profile_id
        )

        if customer_user is None or provider_profile is None:
            return

        provider_tenant = self.tenant_repository.get_by_id(provider_profile.tenant_id)
        provider_name = (
            provider_tenant.commercial_name if provider_tenant is not None else None
        )

        content = build_client_offer_accepted_notification(
            ClientOfferAcceptedNotificationInput(
                notification_type=NotificationType.OFFER_ACCEPTED,
                incident_id=str(incident.id),
                incident_code=incident.incident_code,
                incident_title=incident.title,
                incident_priority=incident.priority,
                incident_status=incident.status,
                offer_id=str(offer.id) if offer is not None else offer_id,
                provider_profile_id=str(provider_profile.id),
                provider_type=provider_profile.provider_type,
                provider_name=provider_name,
                service_catalog_id=(
                    str(service_catalog.id)
                    if service_catalog is not None
                    else None
                ),
                service_code=(
                    service_catalog.service_code
                    if service_catalog is not None
                    else None
                ),
                service_name=(
                    service_catalog.service_name
                    if service_catalog is not None
                    else None
                ),
                service_category=(
                    service_catalog.category
                    if service_catalog is not None
                    else None
                ),
                customer_id=str(customer.id) if customer is not None else None,
                customer_name=self._build_customer_name(customer_user),
                vehicle_id=str(vehicle.id) if vehicle is not None else None,
                vehicle_label=self._build_vehicle_label(vehicle),
                vehicle_plate=(
                    vehicle.plate_number
                    if vehicle is not None
                    else None
                ),
                address_text=incident.address_text,
                latitude=incident.latitude,
                longitude=incident.longitude,
                probable_problem=(
                    ai_analysis.probable_problem
                    if ai_analysis is not None
                    else None
                ),
                confidence_score=(
                    ai_analysis.confidence_score
                    if ai_analysis is not None
                    else None
                ),
                estimated_min_price=(
                    ai_analysis.estimated_min_price
                    if ai_analysis is not None
                    else None
                ),
                estimated_max_price=(
                    ai_analysis.estimated_max_price
                    if ai_analysis is not None
                    else None
                ),
                estimated_min_duration_minutes=(
                    ai_analysis.estimated_min_duration_minutes
                    if ai_analysis is not None
                    else None
                ),
                estimated_max_duration_minutes=(
                    ai_analysis.estimated_max_duration_minutes
                    if ai_analysis is not None
                    else None
                ),
            )
        )

        logger.info(
            "Business notification offer accepted prepared. incident_id=%s offer_id=%s recipient_user_id=%s provider_name=%s customer_user_id=%s",
            incident_id,
            offer_id,
            recipient_user_id,
            provider_name,
            customer_user.id,
        )

        notification = self._send(
            recipient_user_id=recipient_user_id,
            tenant_id=tenant_id,
            notification_type=NotificationType.OFFER_ACCEPTED,
            title=content.title,
            body=content.body,
            data={
                **content.persisted_data,
                "audience": "CLIENT",
                "tenant_id": tenant_id,
            },
            push_data={
                **content.push_data,
                "audience": "CLIENT",
                "tenant_id": tenant_id or "",
            },
        )
        logger.info(
            "Business notification offer accepted sent request completed. incident_id=%s offer_id=%s notification_id=%s recipient_user_id=%s provider_name=%s",
            incident_id,
            offer_id,
            getattr(notification, "id", None),
            recipient_user_id,
            provider_name,
        )

        return notification

    def send_assignment_created(
        self,
        *,
        customer_user_id: str | None,
        technician_user_id: str | None,
        tenant_id: str | None,
        assignment_id: str,
        incident_id: str,
    ) -> None:
        detail = self.assignment_repository.get_detail_by_id(assignment_id)

        if detail is None:
            return

        assignment, incident, _, _provider_profile, technician = detail

        technician_detail = self.technician_repository.get_detail_by_id(
            technician.id
        )
        technician_user = (
            technician_detail[1] if technician_detail is not None else None
        )

        customer_detail = self.customer_repository.get_detail_by_customer_id(
            incident.customer_id
        )
        customer_user = customer_detail[1] if customer_detail is not None else None

        service_catalog = None
        if incident.service_catalog_id is not None:
            service_catalog = self.service_catalog_repository.get_by_id(
                incident.service_catalog_id
            )

        ai_analysis = self.incident_ai_analysis_repository.get_latest_by_incident(
            incident.id
        )

        vehicle_detail = self.vehicle_repository.get_detail_by_id(incident.vehicle_id)
        vehicle = vehicle_detail[0] if vehicle_detail is not None else None

        content = build_assignment_notifications(
            AssignmentNotificationInput(
                notification_type=NotificationType.ASSIGNMENT_CREATED,
                assignment_id=str(assignment.id),
                incident_id=str(incident.id),
                incident_code=incident.incident_code,
                incident_title=incident.title,
                incident_priority=incident.priority,
                incident_status=incident.status,
                provider_profile_id=str(_provider_profile.id),
                provider_type=_provider_profile.provider_type,
                technician_name=(
                    self._build_customer_name(technician_user)
                    if technician_user is not None
                    else None
                ),
                service_name=(
                    service_catalog.service_name
                    if service_catalog is not None
                    else incident.title
                ),
                vehicle_label=(
                    self._build_vehicle_label(vehicle)
                    if vehicle is not None
                    else None
                ),
                vehicle_plate=(
                    vehicle.plate_number
                    if vehicle is not None
                    else None
                ),
                address_text=incident.address_text,
                probable_problem=(
                    ai_analysis.probable_problem
                    if ai_analysis is not None
                    else None
                ),
                customer_name=(
                    self._build_customer_name(customer_user)
                    if customer_user is not None
                    else None
                ),
                estimated_min_price=(
                    ai_analysis.estimated_min_price
                    if ai_analysis is not None
                    else None
                ),
                estimated_max_price=(
                    ai_analysis.estimated_max_price
                    if ai_analysis is not None
                    else None
                ),
                estimated_min_duration_minutes=(
                    ai_analysis.estimated_min_duration_minutes
                    if ai_analysis is not None
                    else None
                ),
                estimated_max_duration_minutes=(
                    ai_analysis.estimated_max_duration_minutes
                    if ai_analysis is not None
                    else None
                ),
            )
        )

        customer_recipient_user_id = (
            str(customer_user.id) if customer_user is not None else customer_user_id
        )
        technician_recipient_user_id = (
            str(technician_user.id)
            if technician_user is not None
            else technician_user_id
        )

        logger.info(
            "Business notification assignment created resolved recipients. assignment_id=%s incident_id=%s customer_recipient_user_id=%s technician_recipient_user_id=%s",
            assignment_id,
            incident_id,
            customer_recipient_user_id,
            technician_recipient_user_id,
        )

        if customer_recipient_user_id is not None:
            logger.info(
                "Business notification assignment created prepared for customer. assignment_id=%s incident_id=%s recipient_user_id=%s",
                assignment_id,
                incident_id,
                customer_recipient_user_id,
            )
            self._send(
                recipient_user_id=customer_recipient_user_id,
                tenant_id=tenant_id,
                notification_type=NotificationType.ASSIGNMENT_CREATED,
                title=content.client.title,
                body=content.client.body,
                data=content.client.persisted_data,
                push_data=content.client.push_data,
            )
            logger.info(
                "Business notification assignment created customer send requested. assignment_id=%s incident_id=%s recipient_user_id=%s",
                assignment_id,
                incident_id,
                customer_recipient_user_id,
            )
        else:
            logger.info(
                "Business notification assignment created customer skipped. assignment_id=%s incident_id=%s reason=no_customer_recipient",
                assignment_id,
                incident_id,
            )

        if technician_recipient_user_id is not None:
            logger.info(
                "Business notification assignment created prepared for technician. assignment_id=%s incident_id=%s recipient_user_id=%s",
                assignment_id,
                incident_id,
                technician_recipient_user_id,
            )
            self._send(
                recipient_user_id=technician_recipient_user_id,
                tenant_id=tenant_id,
                notification_type=NotificationType.ASSIGNMENT_CREATED,
                title=content.technician.title,
                body=content.technician.body,
                data=content.technician.persisted_data,
                push_data=content.technician.push_data,
            )
            logger.info(
                "Business notification assignment created technician send requested. assignment_id=%s incident_id=%s recipient_user_id=%s",
                assignment_id,
                incident_id,
                technician_recipient_user_id,
            )
        else:
            logger.info(
                "Business notification assignment created technician skipped. assignment_id=%s incident_id=%s reason=no_technician_recipient",
                assignment_id,
                incident_id,
            )
        logger.info(
            "Business notification assignment created request completed. assignment_id=%s incident_id=%s customer_sent=%s technician_sent=%s",
            assignment_id,
            incident_id,
            customer_recipient_user_id is not None,
            technician_recipient_user_id is not None,
        )

    def send_technician_en_route(
        self,
        *,
        recipient_user_id: str,
        tenant_id: str | None,
        assignment_id: str,
        incident_id: str,
    ) -> None:
        self._send(
            recipient_user_id=recipient_user_id,
            tenant_id=tenant_id,
            notification_type=NotificationType.TECHNICIAN_EN_ROUTE,
            title="Tu técnico está en camino",
            body="Tu técnico está en camino.",
            data={
                "type": NotificationType.TECHNICIAN_EN_ROUTE,
                "audience": "CLIENT",
                "assignment_id": assignment_id,
                "incident_id": incident_id,
            },
            push_data={
                "type": NotificationType.TECHNICIAN_EN_ROUTE,
                "audience": "CLIENT",
                "assignment_id": assignment_id,
                "incident_id": incident_id,
            },
        )

    def send_technician_arrived(
        self,
        *,
        recipient_user_id: str,
        tenant_id: str | None,
        assignment_id: str,
        incident_id: str,
    ) -> None:
        self._send(
            recipient_user_id=recipient_user_id,
            tenant_id=tenant_id,
            notification_type=NotificationType.TECHNICIAN_ARRIVED,
            title="Tu técnico ha llegado",
            body="Tu técnico ha llegado.",
            data={
                "type": NotificationType.TECHNICIAN_ARRIVED,
                "audience": "CLIENT",
                "assignment_id": assignment_id,
                "incident_id": incident_id,
            },
            push_data={
                "type": NotificationType.TECHNICIAN_ARRIVED,
                "audience": "CLIENT",
                "assignment_id": assignment_id,
                "incident_id": incident_id,
            },
        )

    def send_service_started(
        self,
        *,
        recipient_user_id: str,
        tenant_id: str | None,
        assignment_id: str,
        incident_id: str,
    ) -> None:
        self._send(
            recipient_user_id=recipient_user_id,
            tenant_id=tenant_id,
            notification_type=NotificationType.SERVICE_STARTED,
            title="Servicio iniciado",
            body="El servicio ha comenzado.",
            data={
                "type": NotificationType.SERVICE_STARTED,
                "audience": "CLIENT",
                "assignment_id": assignment_id,
                "incident_id": incident_id,
            },
            push_data={
                "type": NotificationType.SERVICE_STARTED,
                "audience": "CLIENT",
                "assignment_id": assignment_id,
                "incident_id": incident_id,
            },
        )

    def send_service_completed(
        self,
        *,
        recipient_user_id: str,
        tenant_id: str | None,
        assignment_id: str,
        incident_id: str,
    ) -> None:
        self._send(
            recipient_user_id=recipient_user_id,
            tenant_id=tenant_id,
            notification_type=NotificationType.SERVICE_COMPLETED,
            title="Servicio finalizado",
            body="El trabajo ha sido completado correctamente.",
            data={
                "type": NotificationType.SERVICE_COMPLETED,
                "audience": "CLIENT",
                "assignment_id": assignment_id,
                "incident_id": incident_id,
            },
            push_data={
                "type": NotificationType.SERVICE_COMPLETED,
                "audience": "CLIENT",
                "assignment_id": assignment_id,
                "incident_id": incident_id,
            },
        )

    def send_service_cancelled(
        self,
        *,
        recipient_user_id: str,
        tenant_id: str | None,
        assignment_id: str,
        incident_id: str,
    ) -> None:
        self._send(
            recipient_user_id=recipient_user_id,
            tenant_id=tenant_id,
            notification_type=NotificationType.SERVICE_CANCELLED,
            title="Servicio cancelado",
            body="El servicio fue cancelado.",
            data={
                "type": NotificationType.SERVICE_CANCELLED,
                "audience": "CLIENT",
                "assignment_id": assignment_id,
                "incident_id": incident_id,
            },
            push_data={
                "type": NotificationType.SERVICE_CANCELLED,
                "audience": "CLIENT",
                "assignment_id": assignment_id,
                "incident_id": incident_id,
            },
        )

    def send_assignment_cancelled_for_technician(
        self,
        *,
        recipient_user_id: str,
        tenant_id: str | None,
        assignment_id: str,
        incident_id: str,
    ) -> None:
        self._send(
            recipient_user_id=recipient_user_id,
            tenant_id=tenant_id,
            notification_type=NotificationType.ASSIGNMENT_CANCELLED,
            title="Asignación cancelada",
            body="El taller canceló la asignación del servicio.",
            data={
                "type": NotificationType.ASSIGNMENT_CANCELLED,
                "audience": "TECHNICIAN",
                "assignment_id": assignment_id,
                "incident_id": incident_id,
            },
            push_data={
                "type": NotificationType.ASSIGNMENT_CANCELLED,
                "audience": "TECHNICIAN",
                "assignment_id": assignment_id,
                "incident_id": incident_id,
            },
        )

    def send_assignment_cancelled_for_technician_by_customer(
        self,
        *,
        recipient_user_id: str,
        tenant_id: str | None,
        assignment_id: str,
        incident_id: str,
    ) -> None:
        self._send(
            recipient_user_id=recipient_user_id,
            tenant_id=tenant_id,
            notification_type=NotificationType.ASSIGNMENT_CANCELLED,
            title="Asignación cancelada",
            body="El cliente canceló la solicitud de servicio.",
            data={
                "type": NotificationType.ASSIGNMENT_CANCELLED,
                "audience": "TECHNICIAN",
                "assignment_id": assignment_id,
                "incident_id": incident_id,
            },
            push_data={
                "type": NotificationType.ASSIGNMENT_CANCELLED,
                "audience": "TECHNICIAN",
                "assignment_id": assignment_id,
                "incident_id": incident_id,
            },
        )

    def send_assignment_cancelled_by_technician_to_owner(
        self,
        *,
        recipient_user_id: str,
        tenant_id: str | None,
        assignment_id: str,
        incident_id: str,
    ) -> None:
        self._send(
            recipient_user_id=recipient_user_id,
            tenant_id=tenant_id,
            notification_type=NotificationType.ASSIGNMENT_CANCELLED,
            title="Asignación cancelada por el técnico",
            body="El técnico canceló la atención del servicio.",
            data={
                "type": NotificationType.ASSIGNMENT_CANCELLED,
                "audience": "TENANT_OWNER",
                "assignment_id": assignment_id,
                "incident_id": incident_id,
                "cancelled_by": "TECHNICIAN",
            },
            push_data={
                "type": NotificationType.ASSIGNMENT_CANCELLED,
                "audience": "TENANT_OWNER",
                "assignment_id": assignment_id,
                "incident_id": incident_id,
                "cancelled_by": "TECHNICIAN",
            },
        )

    def send_incident_cancelled_by_customer(
        self,
        *,
        recipient_user_id: str,
        tenant_id: str | None,
        incident_id: str,
        assignment_id: str | None = None,
        audience: str = "CLIENT",
        cancellation_reason: str | None = None,
        cancellation_notes: str | None = None,
    ) -> None:
        body = (
            "Cancelaste tu solicitud."
            if audience == "CLIENT"
            else "El cliente canceló la solicitud del servicio."
        )

        self._send(
            recipient_user_id=recipient_user_id,
            tenant_id=tenant_id,
            notification_type=NotificationType.INCIDENT_CANCELLED,
            title="Solicitud cancelada",
            body=body,
            data={
                "type": NotificationType.INCIDENT_CANCELLED,
                "audience": audience,
                "incident_id": incident_id,
                "assignment_id": assignment_id or "",
                "cancelled_by": "CLIENT",
                "cancellation_reason": cancellation_reason,
                "cancellation_notes": cancellation_notes,
            },
            push_data={
                "type": NotificationType.INCIDENT_CANCELLED,
                "audience": audience,
                "incident_id": incident_id,
                "assignment_id": assignment_id or "",
                "cancelled_by": "CLIENT",
            },
        )

    def send_incident_cancelled_by_customer_to_tenant_owners(
        self,
        *,
        tenant_id: str,
        incident_id: str,
        assignment_id: str | None = None,
        cancellation_reason: str | None = None,
        cancellation_notes: str | None = None,
    ) -> None:
        memberships, _ = self.membership_repository.list_by_tenant_with_users(
            tenant_id,
            status="ACTIVE",
            limit=100,
            offset=0,
        )

        for _, user in memberships:
            if user.user_type != "TENANT_OWNER":
                continue

            self.send_incident_cancelled_by_customer(
                recipient_user_id=str(user.id),
                tenant_id=tenant_id,
                incident_id=incident_id,
                assignment_id=assignment_id,
                audience="TENANT_OWNER",
                cancellation_reason=cancellation_reason,
                cancellation_notes=cancellation_notes,
            )

    def send_incident_offer_created(
        self,
        *,
        tenant_id: str,
        incident_id: str,
        offer_id: str,
        provider_profile_id: str,
    ) -> None:
        logger.info(
            "Business notification incident offer started. incident_id=%s offer_id=%s provider_profile_id=%s tenant_id=%s",
            incident_id,
            offer_id,
            provider_profile_id,
            tenant_id,
        )
        incident = self.incident_repository.get_by_id(incident_id)
        offer = self.incident_offer_repository.get_by_id(offer_id)
        provider_profile = self.provider_profile_repository.get_by_id(
            provider_profile_id
        )

        if incident is None or offer is None or provider_profile is None:
            return

        provider_tenant_profile = self.tenant_repository.get_profile(
            provider_profile.tenant_id
        )
        distance_km = self._calculate_distance_km(
            incident_latitude=incident.latitude,
            incident_longitude=incident.longitude,
            provider_latitude=(
                provider_tenant_profile.latitude
                if provider_tenant_profile is not None
                else None
            ),
            provider_longitude=(
                provider_tenant_profile.longitude
                if provider_tenant_profile is not None
                else None
            ),
        )

        service_catalog = None
        if incident.service_catalog_id is not None:
            service_catalog = self.service_catalog_repository.get_by_id(
                incident.service_catalog_id
            )

        ai_analysis = self.incident_ai_analysis_repository.get_latest_by_incident(
            incident.id
        )

        customer_detail = self.customer_repository.get_detail_by_customer_id(
            incident.customer_id
        )
        customer = customer_detail[0] if customer_detail is not None else None
        customer_user = customer_detail[1] if customer_detail is not None else None

        vehicle = self.vehicle_repository.get_by_id(incident.vehicle_id)

        content = build_incident_offer_notification(
            IncidentOfferNotificationInput(
                notification_type=NotificationType.INCIDENT_OFFER_CREATED,
                incident_id=str(incident.id),
                incident_code=incident.incident_code,
                incident_title=incident.title,
                incident_priority=incident.priority,
                incident_status=incident.status,
                offer_id=str(offer.id),
                provider_profile_id=str(provider_profile.id),
                service_catalog_id=(
                    str(service_catalog.id)
                    if service_catalog is not None
                    else None
                ),
                service_code=(
                    service_catalog.service_code
                    if service_catalog is not None
                    else None
                ),
                service_name=(
                    service_catalog.service_name
                    if service_catalog is not None
                    else None
                ),
                service_category=(
                    service_catalog.category
                    if service_catalog is not None
                    else None
                ),
                customer_id=(
                    str(customer.id)
                    if customer is not None
                    else str(incident.customer_id)
                ),
                customer_name=(
                    self._build_customer_name(customer_user)
                    if customer_user is not None
                    else None
                ),
                vehicle_id=str(incident.vehicle_id),
                vehicle_label=(
                    self._build_vehicle_label(vehicle)
                    if vehicle is not None
                    else None
                ),
                vehicle_plate=(
                    vehicle.plate_number
                    if vehicle is not None
                    else None
                ),
                address_text=incident.address_text,
                latitude=incident.latitude,
                longitude=incident.longitude,
                probable_problem=(
                    ai_analysis.probable_problem
                    if ai_analysis is not None
                    else None
                ),
                confidence_score=(
                    ai_analysis.confidence_score
                    if ai_analysis is not None
                    else None
                ),
                estimated_min_price=(
                    ai_analysis.estimated_min_price
                    if ai_analysis is not None
                    else None
                ),
                estimated_max_price=(
                    ai_analysis.estimated_max_price
                    if ai_analysis is not None
                    else None
                ),
                estimated_min_duration_minutes=(
                    ai_analysis.estimated_min_duration_minutes
                    if ai_analysis is not None
                    else None
                ),
                estimated_max_duration_minutes=(
                    ai_analysis.estimated_max_duration_minutes
                    if ai_analysis is not None
                    else None
                ),
                distance_km=distance_km,
            )
        )

        for recipient_user_id in self._list_tenant_notification_recipients(
            tenant_id=tenant_id,
        ):
            recipient_user = self.user_repository.get_by_id(recipient_user_id)
            audience = self._normalize_audience(
                getattr(recipient_user, "user_type", None)
            )
            logger.info(
                "Business notification incident offer recipient resolved. incident_id=%s offer_id=%s recipient_user_id=%s audience=%s",
                incident_id,
                offer_id,
                recipient_user_id,
                audience,
            )
            self._send(
                recipient_user_id=recipient_user_id,
                tenant_id=tenant_id,
                notification_type=NotificationType.INCIDENT_OFFER_CREATED,
                title=content.title,
                body=content.body,
                data={
                    **content.persisted_data,
                    "audience": audience,
                },
                push_data={
                    **content.push_data,
                    "audience": audience or "ALL",
                },
            )

    def send_no_providers_available(
        self,
        *,
        incident_id: str,
    ) -> None:
        self.send_incident_unattended(
            incident_id=incident_id,
            unattended_reason="NO_ELIGIBLE_PROVIDERS_FOUND",
        )

    def send_incident_unattended(
        self,
        *,
        incident_id: str,
        unattended_reason: str,
    ) -> None:
        logger.info(
            "Business notification unattended started. incident_id=%s reason=%s",
            incident_id,
            unattended_reason,
        )
        incident = self.incident_repository.get_by_id(incident_id)

        if incident is None:
            return

        customer_detail = self.customer_repository.get_detail_by_customer_id(
            incident.customer_id
        )

        customer = customer_detail[0] if customer_detail is not None else None
        customer_user = customer_detail[1] if customer_detail is not None else None

        if customer_user is None:
            return

        service_catalog = None
        if incident.service_catalog_id is not None:
            service_catalog = self.service_catalog_repository.get_by_id(
                incident.service_catalog_id
            )

        ai_analysis = self.incident_ai_analysis_repository.get_latest_by_incident(
            incident.id
        )

        vehicle = self.vehicle_repository.get_by_id(incident.vehicle_id)

        content = build_incident_unattended_notification(
            IncidentUnattendedNotificationInput(
                notification_type=NotificationType.INCIDENT_UNATTENDED,
                unattended_reason=unattended_reason,
                incident_id=str(incident.id),
                incident_code=incident.incident_code,
                incident_title=incident.title,
                incident_priority=incident.priority,
                incident_status=incident.status,
                customer_id=(
                    str(customer.id)
                    if customer is not None
                    else str(incident.customer_id)
                ),
                customer_name=(
                    self._build_customer_name(customer_user)
                    if customer_user is not None
                    else None
                ),
                service_catalog_id=(
                    str(service_catalog.id)
                    if service_catalog is not None
                    else None
                ),
                service_code=(
                    service_catalog.service_code
                    if service_catalog is not None
                    else None
                ),
                service_name=(
                    service_catalog.service_name
                    if service_catalog is not None
                    else None
                ),
                service_category=(
                    service_catalog.category
                    if service_catalog is not None
                    else None
                ),
                vehicle_id=str(incident.vehicle_id),
                vehicle_label=(
                    self._build_vehicle_label(vehicle)
                    if vehicle is not None
                    else None
                ),
                vehicle_plate=(
                    vehicle.plate_number if vehicle is not None else None
                ),
                address_text=incident.address_text,
                latitude=incident.latitude,
                longitude=incident.longitude,
                probable_problem=(
                    ai_analysis.probable_problem
                    if ai_analysis is not None
                    else None
                ),
                confidence_score=(
                    ai_analysis.confidence_score
                    if ai_analysis is not None
                    else None
                ),
                estimated_min_price=(
                    ai_analysis.estimated_min_price
                    if ai_analysis is not None
                    else None
                ),
                estimated_max_price=(
                    ai_analysis.estimated_max_price
                    if ai_analysis is not None
                    else None
                ),
                estimated_min_duration_minutes=(
                    ai_analysis.estimated_min_duration_minutes
                    if ai_analysis is not None
                    else None
                ),
                estimated_max_duration_minutes=(
                    ai_analysis.estimated_max_duration_minutes
                    if ai_analysis is not None
                    else None
                ),
            )
        )

        self._send(
            recipient_user_id=str(customer_user.id),
            tenant_id=None,
            notification_type=NotificationType.INCIDENT_UNATTENDED,
            title=content.title,
            body=content.body,
            data=content.persisted_data,
            push_data=content.push_data,
        )

    def send_incident_offer_accepted(
        self,
        *,
        incident_id: str,
        offer_id: str,
        provider_profile_id: str,
        tenant_id: str,
        customer_id: str,
        ) -> None:
        customer = self.customer_repository.get_by_user_id(customer_id)

        if customer is None or customer.deleted_at is not None:
            return

        self._send(
            recipient_user_id=customer_id,
            tenant_id=tenant_id,
            notification_type=NotificationType.OFFER_ACCEPTED,
            title="Solicitud aceptada",
            body="Un taller aceptó tu solicitud. En un momento se asignará un técnico.",
            data={
                "type": NotificationType.OFFER_ACCEPTED,
                "audience": "CLIENT",
                "incident_id": incident_id,
                "offer_id": offer_id,
                "provider_profile_id": provider_profile_id,
                "tenant_id": tenant_id,
            },
            push_data={
                "type": NotificationType.OFFER_ACCEPTED,
                "audience": "CLIENT",
                "incident_id": incident_id,
                "offer_id": offer_id,
                "provider_profile_id": provider_profile_id,
                "tenant_id": tenant_id,
            },
        )

    def _send(
        self,
        *,
        recipient_user_id: str,
        tenant_id: str | None,
        notification_type: str,
        title: str,
        body: str,
        data: dict[str, Any],
        push_data: dict[str, str] | None = None,
    ):
        logger.info(
            "Business notification send requested. recipient_user_id=%s tenant_id=%s notification_type=%s has_push_data=%s",
            recipient_user_id,
            tenant_id,
            notification_type,
            push_data is not None,
        )
        notification = self.notification_service.send(
            NotificationSendRequest(
                recipient_user_id=recipient_user_id,
                tenant_id=tenant_id,
                notification_type=notification_type,
                title=title,
                body=body,
                data=data,
                push_data=push_data,
            )
        )
        logger.info(
            "Business notification send request submitted. recipient_user_id=%s tenant_id=%s notification_type=%s",
            recipient_user_id,
            tenant_id,
            notification_type,
        )

        return notification

    def _get_tenant_owner_user_id(self, tenant_id: str) -> str | None:
        memberships, _ = self.membership_repository.list_by_tenant_with_users(
            tenant_id,
            status="ACTIVE",
            limit=100,
            offset=0,
        )

        for membership, user in memberships:
            if user.user_type == "TENANT_OWNER":
                return str(user.id)

        return None

    def _list_tenant_notification_recipients(
        self,
        *,
        tenant_id: str,
    ) -> list[str]:
        memberships, _ = self.membership_repository.list_by_tenant_with_users(
            tenant_id,
            status="ACTIVE",
            limit=100,
            offset=0,
        )

        recipients: list[str] = []

        for membership, user in memberships:
            if user.user_type in {"TENANT_OWNER", "TECHNICIAN"}:
                recipients.append(str(user.id))

        return recipients

    def _build_customer_name(self, user) -> str | None:
        first_name = getattr(user, "first_name", None)
        last_name = getattr(user, "last_name", None)

        full_name = " ".join(
            part.strip()
            for part in [first_name, last_name]
            if isinstance(part, str) and part.strip()
        )

        return full_name or None

    def _build_vehicle_label(self, vehicle) -> str | None:
        if vehicle is None:
            return None

        parts = [
            getattr(vehicle, "brand", None),
            getattr(vehicle, "model", None),
            getattr(vehicle, "year", None),
        ]

        label = " ".join(
            str(part).strip()
            for part in parts
            if part is not None and str(part).strip()
        )

        return label or None

    def _normalize_audience(self, value: str | None) -> str | None:
        if value is None:
            return None

        normalized = value.strip().upper()
        if normalized in {"CLIENT", "TENANT_OWNER", "TECHNICIAN", "SUPERADMIN"}:
            return normalized

        return None

    def _stringify_push_data(self, data: dict[str, Any]) -> dict[str, str]:
        push_data: dict[str, str] = {}

        for key, value in data.items():
            if value is None:
                continue

            if isinstance(value, (dict, list)):
                continue

            push_data[str(key)] = str(value)

        return push_data

    def _calculate_distance_km(
        self,
        *,
        incident_latitude,
        incident_longitude,
        provider_latitude,
        provider_longitude,
    ) -> Decimal | None:
        if (
            incident_latitude is None
            or incident_longitude is None
            or provider_latitude is None
            or provider_longitude is None
        ):
            return None

        earth_radius_km = 6371.0

        lat1 = math.radians(float(incident_latitude))
        lon1 = math.radians(float(incident_longitude))
        lat2 = math.radians(float(provider_latitude))
        lon2 = math.radians(float(provider_longitude))

        delta_lat = lat2 - lat1
        delta_lon = lon2 - lon1

        a = (
            math.sin(delta_lat / 2) ** 2
            + math.cos(lat1) * math.cos(lat2) * math.sin(delta_lon / 2) ** 2
        )
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        distance = earth_radius_km * c

        return Decimal(str(distance)).quantize(
            Decimal("0.01"),
            rounding=ROUND_HALF_UP,
        )

    def _decimal_to_string(self, value: Decimal | None) -> str | None:
        if value is None:
            return None

        normalized = value.normalize()
        text = format(normalized, "f")
        return text if text != "" else "0"
