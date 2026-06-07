from __future__ import annotations

from dataclasses import dataclass
from decimal import Decimal
from typing import Any

from app.modules.assignment.routes import (
    client_assignment_deeplink,
    client_assignment_tracking_url,
    client_assignment_url,
    tenant_assignment_deeplink,
    tenant_assignment_tracking_url,
    tenant_assignment_url,
)
from app.modules.incident.routes import client_incident_url


@dataclass(frozen=True)
class AssignmentNotificationContent:
    title: str
    body: str
    persisted_data: dict[str, Any]
    push_data: dict[str, str]


@dataclass(frozen=True)
class AssignmentNotificationBundle:
    client: AssignmentNotificationContent
    technician: AssignmentNotificationContent


@dataclass(frozen=True)
class AssignmentNotificationInput:
    notification_type: str

    assignment_id: str
    incident_id: str
    incident_code: str | None
    incident_title: str | None
    incident_priority: str | None
    incident_status: str | None
    provider_profile_id: str | None = None
    provider_type: str | None = None

    technician_name: str | None = None
    service_name: str | None = None
    vehicle_label: str | None = None
    vehicle_plate: str | None = None
    address_text: str | None = None
    probable_problem: str | None = None
    customer_name: str | None = None

    estimated_min_price: Decimal | None = None
    estimated_max_price: Decimal | None = None
    estimated_min_duration_minutes: int | None = None
    estimated_max_duration_minutes: int | None = None


def build_assignment_notifications(
    payload: AssignmentNotificationInput,
) -> AssignmentNotificationBundle:
    service_label = _safe(payload.service_name, "Servicio no especificado")
    vehicle_label = _safe(payload.vehicle_label, "Vehículo no especificado")
    priority_label = _priority_label(payload.incident_priority)
    estimated_price_label = _price_range_label(
        payload.estimated_min_price,
        payload.estimated_max_price,
    )
    estimated_duration_label = _duration_range_label(
        payload.estimated_min_duration_minutes,
        payload.estimated_max_duration_minutes,
    )

    client = AssignmentNotificationContent(
        title="Técnico asignado",
        body=_build_client_body(
            technician_name=_safe(
                payload.technician_name,
                "Un técnico",
            ),
            service_name=service_label,
        ),
        persisted_data=_build_client_persisted_data(
            payload=payload,
            service_label=service_label,
            vehicle_label=vehicle_label,
            priority_label=priority_label,
            estimated_price_label=estimated_price_label,
            estimated_duration_label=estimated_duration_label,
        ),
        push_data=_build_client_push_data(payload),
    )

    technician = AssignmentNotificationContent(
        title="Nuevo servicio asignado",
        body=_build_technician_body(
            service_name=service_label,
            priority_label=priority_label,
        ),
        persisted_data=_build_technician_persisted_data(
            payload=payload,
            service_label=service_label,
            vehicle_label=vehicle_label,
            priority_label=priority_label,
        ),
        push_data=_build_technician_push_data(payload),
    )

    return AssignmentNotificationBundle(client=client, technician=technician)


def _build_client_body(*, technician_name: str, service_name: str) -> str:
    return f"{technician_name} atenderá tu vehículo. Servicio: {service_name}."


def _build_technician_body(*, service_name: str, priority_label: str) -> str:
    return f"Servicio: {service_name}. Prioridad: {priority_label}. Revisa la ubicación."


def _build_client_persisted_data(
    *,
    payload: AssignmentNotificationInput,
    service_label: str,
    vehicle_label: str,
    priority_label: str,
    estimated_price_label: str,
    estimated_duration_label: str,
) -> dict[str, Any]:
    return {
        "type": payload.notification_type,
        "audience": "CLIENT",
        "assignment_id": payload.assignment_id,
        "incident_id": payload.incident_id,
        "incident_code": payload.incident_code,
        "incident_title": payload.incident_title,
        "provider_profile_id": payload.provider_profile_id,
        "provider_type": payload.provider_type,
        "title": "Técnico asignado",
        "message": _build_client_body(
            technician_name=_safe(payload.technician_name, "Un técnico"),
            service_name=service_label,
        ),
        "technician_name": _safe(payload.technician_name, "Técnico asignado"),
        "service_name": service_label,
        "vehicle_label": vehicle_label,
        "incident_priority": _normalize_upper(payload.incident_priority),
        "incident_status": payload.incident_status,
        "address_text": payload.address_text,
        "estimated_min_price": _decimal_to_string(payload.estimated_min_price),
        "estimated_max_price": _decimal_to_string(payload.estimated_max_price),
        "estimated_min_duration_minutes": payload.estimated_min_duration_minutes,
        "estimated_max_duration_minutes": payload.estimated_max_duration_minutes,
        "status_label": payload.incident_status,
        "priority_label": priority_label,
        "estimated_price_label": estimated_price_label,
        "estimated_duration_label": estimated_duration_label,
        "actions": {
            "view_incident": {
                "method": "GET",
                "url": client_incident_url(payload.incident_id),
            },
            "view_assignment": {
                "method": "GET",
                "url": client_assignment_url(payload.assignment_id),
            },
            "view_tracking": {
                "method": "GET",
                "url": client_assignment_tracking_url(payload.assignment_id),
            },
        },
        "deeplink": client_assignment_deeplink(payload.assignment_id),
    }


def _build_technician_persisted_data(
    *,
    payload: AssignmentNotificationInput,
    service_label: str,
    vehicle_label: str,
    priority_label: str,
) -> dict[str, Any]:
    return {
        "type": payload.notification_type,
        "audience": "TECHNICIAN",
        "assignment_id": payload.assignment_id,
        "incident_id": payload.incident_id,
        "incident_code": payload.incident_code,
        "incident_title": payload.incident_title,
        "title": "Nuevo servicio asignado",
        "message": _build_technician_body(
            service_name=service_label,
            priority_label=priority_label,
        ),
        "service_name": service_label,
        "vehicle_label": vehicle_label,
        "vehicle_plate": payload.vehicle_plate,
        "incident_priority": _normalize_upper(payload.incident_priority),
        "address_text": payload.address_text,
        "probable_problem": payload.probable_problem,
        "customer_name": _safe(payload.customer_name, "Cliente"),
        "actions": {
            "view_assignment": {
                "method": "GET",
                "url": tenant_assignment_url(payload.assignment_id),
            },
            "start_route": {
                "method": "POST",
                "url": tenant_assignment_tracking_url(payload.assignment_id),
                "body": {
                    "event_type": "EN_ROUTE",
                },
            },
        },
        "deeplink": tenant_assignment_deeplink(payload.assignment_id),
    }


def _build_client_push_data(payload: AssignmentNotificationInput) -> dict[str, str]:
    return {
        "type": payload.notification_type,
        "audience": "CLIENT",
        "assignment_id": payload.assignment_id,
        "incident_id": payload.incident_id,
        "deeplink": client_assignment_deeplink(payload.assignment_id),
        "primary_action": "OPEN_ASSIGNMENT_DETAIL",
        "view_url": client_assignment_url(payload.assignment_id),
    }


def _build_technician_push_data(
    payload: AssignmentNotificationInput,
) -> dict[str, str]:
    return {
        "type": payload.notification_type,
        "audience": "TECHNICIAN",
        "assignment_id": payload.assignment_id,
        "incident_id": payload.incident_id,
        "deeplink": tenant_assignment_deeplink(payload.assignment_id),
        "primary_action": "OPEN_ASSIGNMENT_DETAIL",
        "available_actions": "START_ROUTE",
    }


def _priority_label(priority: str | None) -> str:
    normalized = _normalize_upper(priority)

    labels = {
        "LOW": "Baja",
        "MEDIUM": "Media",
        "HIGH": "Alta",
        "CRITICAL": "Crítica",
    }

    return labels.get(normalized or "", "No especificada")


def _price_range_label(
    min_price: Decimal | None,
    max_price: Decimal | None,
) -> str | None:
    if min_price is None and max_price is None:
        return None

    min_text = _decimal_to_string(min_price) or "0"
    max_text = _decimal_to_string(max_price) or "0"
    return f"Bs {min_text} - Bs {max_text}"


def _duration_range_label(
    min_minutes: int | None,
    max_minutes: int | None,
) -> str | None:
    if min_minutes is None and max_minutes is None:
        return None

    min_text = str(min_minutes or 0)
    max_text = str(max_minutes or 0)
    return f"{min_text} - {max_text} min"


def _safe(value: str | None, fallback: str) -> str:
    if value is None:
        return fallback

    normalized = value.strip()
    return normalized or fallback


def _normalize_upper(value: str | None) -> str | None:
    if value is None:
        return None

    normalized = value.strip().upper()
    return normalized or None


def _decimal_to_string(value: Decimal | None) -> str | None:
    if value is None:
        return None

    normalized = value.normalize()
    text = format(normalized, "f")
    return text if text != "" else "0"
