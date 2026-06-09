from __future__ import annotations

from dataclasses import dataclass
from decimal import Decimal
from typing import Any

from app.modules.incident.routes import client_incident_deeplink, client_incident_url


@dataclass(frozen=True)
class IncidentUnattendedNotificationContent:
    title: str
    body: str
    persisted_data: dict[str, Any]
    push_data: dict[str, str]


@dataclass(frozen=True)
class IncidentUnattendedNotificationInput:
    notification_type: str
    unattended_reason: str

    incident_id: str
    incident_code: str | None
    incident_title: str | None
    incident_priority: str | None
    incident_status: str | None

    customer_id: str | None = None
    customer_name: str | None = None

    service_catalog_id: str | None = None
    service_code: str | None = None
    service_name: str | None = None
    service_category: str | None = None

    vehicle_id: str | None = None
    vehicle_label: str | None = None
    vehicle_plate: str | None = None

    address_text: str | None = None
    latitude: Decimal | None = None
    longitude: Decimal | None = None

    probable_problem: str | None = None
    confidence_score: Decimal | None = None
    estimated_min_price: Decimal | None = None
    estimated_max_price: Decimal | None = None
    estimated_min_duration_minutes: int | None = None
    estimated_max_duration_minutes: int | None = None


def build_incident_unattended_notification(
    payload: IncidentUnattendedNotificationInput,
) -> IncidentUnattendedNotificationContent:
    title, body = _build_title_and_body(payload.unattended_reason)

    persisted_data = {
        "type": payload.notification_type,
        "action_context": "INCIDENT_UNATTENDED",
        "unattended_reason": payload.unattended_reason,
        "incident_id": payload.incident_id,
        "incident_code": payload.incident_code,
        "incident_title": payload.incident_title,
        "incident_priority": payload.incident_priority,
        "incident_status": payload.incident_status,
        "customer_id": payload.customer_id,
        "customer_name": payload.customer_name,
        "service_catalog_id": payload.service_catalog_id,
        "service_code": payload.service_code,
        "service_name": payload.service_name,
        "service_category": payload.service_category,
        "vehicle_id": payload.vehicle_id,
        "vehicle_label": payload.vehicle_label,
        "vehicle_plate": payload.vehicle_plate,
        "address_text": payload.address_text,
        "latitude": _decimal_to_string(payload.latitude),
        "longitude": _decimal_to_string(payload.longitude),
        "probable_problem": payload.probable_problem,
        "confidence_score": _decimal_to_string(payload.confidence_score),
        "estimated_min_price": _decimal_to_string(payload.estimated_min_price),
        "estimated_max_price": _decimal_to_string(payload.estimated_max_price),
        "estimated_min_duration_minutes": payload.estimated_min_duration_minutes,
        "estimated_max_duration_minutes": payload.estimated_max_duration_minutes,
        "title": title,
        "message": body,
        "audience": "CLIENT",
        "deeplink": client_incident_deeplink(payload.incident_id),
        "actions": {
            "view_incident": {
                "method": "GET",
                "url": client_incident_url(payload.incident_id),
            },
        },
    }

    push_data = {
        "type": payload.notification_type,
        "action_context": "INCIDENT_UNATTENDED",
        "unattended_reason": payload.unattended_reason,
        "incident_id": payload.incident_id,
        "incident_code": payload.incident_code or "",
        "incident_title": payload.incident_title or "",
        "title": title,
        "body": body,
        "audience": "CLIENT",
        "deeplink": client_incident_deeplink(payload.incident_id),
        "primary_action": "OPEN_INCIDENT_DETAIL",
        "view_url": client_incident_url(payload.incident_id),
    }

    return IncidentUnattendedNotificationContent(
        title=title,
        body=body,
        persisted_data=persisted_data,
        push_data=push_data,
    )


def _build_title_and_body(reason: str) -> tuple[str, str]:
    normalized = reason.strip().upper()

    if normalized == "UNKNOWN_SERVICE":
        return (
            "No identificamos el servicio",
            "No pudimos identificar un servicio compatible para tu solicitud.",
        )

    if normalized == "NO_PROVIDER_SERVICE_FOUND":
        return (
            "Sin talleres disponibles",
            "Ningún taller ofrece ese servicio por ahora.",
        )

    if normalized == "NO_AVAILABLE_TECHNICIAN_FOUND":
        return (
            "Sin técnicos disponibles",
            "Hay talleres con ese servicio, pero no tienen técnicos disponibles ahora.",
        )

    if normalized == "NO_PROVIDER_ACCEPTED":
        return (
            "Ningún taller aceptó tu solicitud",
            "Ningún taller aceptó tu solicitud. Seguimos registrando el caso.",
        )

    if normalized == "PROVIDER_RESPONSE_TIMEOUT":
        return (
            "Sin respuesta de talleres",
            "Ningún taller respondió a tiempo.",
        )

    return (
        "Sin talleres disponibles",
        "No encontramos talleres disponibles para tu solicitud.",
    )


def _decimal_to_string(value: Decimal | None) -> str | None:
    if value is None:
        return None

    normalized = value.normalize()
    text = format(normalized, "f")
    return text if text != "" else "0"
