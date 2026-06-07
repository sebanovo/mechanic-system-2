from __future__ import annotations

from sqlalchemy.orm import Session

from app.modules.identity.membership.repository import TenantMembershipRepository
from app.modules.notification.constants import NotificationType
from app.modules.notification.repository import NotificationRepository
from app.modules.notification.schemas import NotificationSendRequest
from app.modules.notification.service import NotificationService
from app.core.context import RequestContext


class BusinessNotificationService:
    def __init__(self, db: Session, context: RequestContext) -> None:
        self.db = db
        self.notification_service = NotificationService(
            repository=NotificationRepository(db),
            context=context,
        )
        self.membership_repository = TenantMembershipRepository(self.db)

    def send_offer_received(
        self,
        *,
        provider_owner_user_id: str | None,
        tenant_id: str | None,
        incident_id: str,
        offer_id: str,
    ) -> None:
        owner = provider_owner_user_id or self._get_tenant_owner_user_id(tenant_id)
        if owner is None:
            return

        self._send(
            recipient_user_id=owner,
            tenant_id=tenant_id,
            notification_type=NotificationType.OFFER_RECEIVED,
            title="Nueva solicitud de servicio",
            body="Has recibido una nueva solicitud para revisar.",
            data={
                "type": NotificationType.OFFER_RECEIVED,
                "incident_id": incident_id,
                "offer_id": offer_id,
            },
        )

    def send_offer_accepted(
        self,
        *,
        recipient_user_id: str,
        tenant_id: str | None,
        incident_id: str,
        provider_profile_id: str,
    ) -> None:
        self._send(
            recipient_user_id=recipient_user_id,
            tenant_id=tenant_id,
            notification_type=NotificationType.OFFER_ACCEPTED,
            title="Taller confirmado",
            body="Un taller aceptó tu solicitud y pronto se asignará un técnico.",
            data={
                "type": NotificationType.OFFER_ACCEPTED,
                "incident_id": incident_id,
                "provider_profile_id": provider_profile_id,
            },
        )

    def send_assignment_created(
        self,
        *,
        customer_user_id: str | None,
        technician_user_id: str | None,
        tenant_id: str | None,
        assignment_id: str,
        incident_id: str,
    ) -> None:
        if customer_user_id is not None:
            self._send(
                recipient_user_id=customer_user_id,
                tenant_id=tenant_id,
                notification_type=NotificationType.ASSIGNMENT_CREATED,
                title="Se asignó un técnico a tu solicitud.",
                body="Se asignó un técnico a tu solicitud.",
                data={
                    "type": NotificationType.ASSIGNMENT_CREATED,
                    "assignment_id": assignment_id,
                    "incident_id": incident_id,
                },
            )

        if technician_user_id is not None:
            self._send(
                recipient_user_id=technician_user_id,
                tenant_id=tenant_id,
                notification_type=NotificationType.ASSIGNMENT_CREATED,
                title="Tienes un nuevo servicio asignado",
                body="Tienes un nuevo servicio asignado.",
                data={
                    "type": NotificationType.ASSIGNMENT_CREATED,
                    "assignment_id": assignment_id,
                    "incident_id": incident_id,
                },
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
                "assignment_id": assignment_id,
                "incident_id": incident_id,
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
        data: dict[str, str],
    ) -> None:
        self.notification_service.send(
            NotificationSendRequest(
                recipient_user_id=recipient_user_id,
                tenant_id=tenant_id,
                notification_type=notification_type,
                title=title,
                body=body,
                data=data,
            )
        )

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
