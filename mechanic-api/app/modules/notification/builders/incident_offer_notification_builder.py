from __future__ import annotations

from dataclasses import dataclass
from decimal import Decimal
from typing import Any

from app.modules.incident.routes import (
    client_incident_deeplink,
    client_incident_url,
)
from app.modules.incident_offer.routes import (
    tenant_offer_accept_url,
    tenant_offer_deeplink,
    tenant_offer_reject_url,
    tenant_offer_url,
)

@dataclass(frozen=True)
class IncidentOfferNotificationContent:
    title: str
    body: str
    persisted_data: dict[str, Any]
    push_data: dict[str, str]


@dataclass(frozen=True)
class ClientOfferAcceptedNotificationContent:
    title: str
    body: str
    persisted_data: dict[str, Any]
    push_data: dict[str, str]


@dataclass(frozen=True)
class IncidentOfferNotificationInput:
    notification_type: str

    incident_id: str
    incident_code: str | None
    incident_title: str | None
    incident_priority: str | None
    incident_status: str | None

    offer_id: str
    provider_profile_id: str

    service_catalog_id: str | None = None
    service_code: str | None = None
    service_name: str | None = None
    service_category: str | None = None

    customer_id: str | None = None
    customer_name: str | None = None

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

    distance_km: Decimal | None = None


@dataclass(frozen=True)
class ClientOfferAcceptedNotificationInput:
    notification_type: str

    incident_id: str
    incident_code: str | None
    incident_title: str | None
    incident_priority: str | None
    incident_status: str | None

    offer_id: str
    provider_profile_id: str
    provider_type: str | None = None
    provider_name: str | None = None

    service_catalog_id: str | None = None
    service_code: str | None = None
    service_name: str | None = None
    service_category: str | None = None

    customer_id: str | None = None
    customer_name: str | None = None

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


def build_incident_offer_notification(
    payload: IncidentOfferNotificationInput,
) -> IncidentOfferNotificationContent:
    priority_label = _priority_label(payload.incident_priority)
    service_label = _safe(payload.service_name, "Servicio no especificado")
    distance_label = _distance_label(payload.distance_km)

    title = _build_title(payload.incident_priority)

    body_parts = [
        f"Servicio: {service_label}.",
        f"Prioridad: {priority_label}.",
    ]

    if distance_label is not None:
        body_parts.append(f"Cliente a {distance_label} de tu taller.")

    body = " ".join(body_parts)

    persisted_data = _build_persisted_data(payload)
    push_data = _build_push_data(payload)

    return IncidentOfferNotificationContent(
        title=title,
        body=body,
        persisted_data=persisted_data,
        push_data=push_data,
    )


def build_client_offer_accepted_notification(
    payload: ClientOfferAcceptedNotificationInput,
) -> ClientOfferAcceptedNotificationContent:
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

    return ClientOfferAcceptedNotificationContent(
        title=_build_client_offer_accepted_title(payload.provider_name),
        body=_build_client_offer_accepted_body(payload.provider_name),
        persisted_data={
            "type": payload.notification_type,
            "action_context": "INCIDENT_OFFER_ACCEPTED",
            "incident_id": payload.incident_id,
            "incident_code": payload.incident_code,
            "incident_title": payload.incident_title,
            "incident_priority": payload.incident_priority,
            "incident_status": payload.incident_status,
            "offer_id": payload.offer_id,
            "provider_profile_id": payload.provider_profile_id,
            "provider_type": payload.provider_type,
            "provider_name": payload.provider_name,
            "service_catalog_id": payload.service_catalog_id,
            "service_code": payload.service_code,
            "service_name": payload.service_name,
            "service_category": payload.service_category,
            "customer_id": payload.customer_id,
            "customer_name": payload.customer_name,
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
            "priority_label": priority_label,
            "estimated_price_label": estimated_price_label,
            "estimated_duration_label": estimated_duration_label,
            "title": "Solicitud aceptada",
            "message": _build_client_offer_accepted_body(payload.provider_name),
            "audience": "CLIENT",
            "deeplink": client_incident_deeplink(payload.incident_id),
            "actions": {
                "view_incident": {
                    "method": "GET",
                    "url": client_incident_url(payload.incident_id),
                },
            },
        },
        push_data={
            "type": payload.notification_type,
            "action_context": "INCIDENT_OFFER_ACCEPTED",
            "incident_id": payload.incident_id,
            "offer_id": payload.offer_id,
            "provider_profile_id": payload.provider_profile_id,
            "provider_type": payload.provider_type or "ALL",
            "provider_name": payload.provider_name or "",
            "deeplink": client_incident_deeplink(payload.incident_id),
            "primary_action": "OPEN_INCIDENT_DETAIL",
            "view_url": client_incident_url(payload.incident_id),
            "audience": "CLIENT",
        },
    )


def _build_client_offer_accepted_title(provider_name: str | None) -> str:
    provider_label = _safe(provider_name, "Tu taller")
    return f"{provider_label} aceptó tu solicitud"


def _build_client_offer_accepted_body(provider_name: str | None) -> str:
    provider_label = _safe(provider_name, "Tu taller")
    return f"{provider_label} confirmó tu solicitud."


def _build_title(priority: str | None) -> str:
    normalized = _normalize_upper(priority)

    if normalized in {"HIGH", "CRITICAL"}:
        return "Nueva solicitud urgente"

    if normalized == "MEDIUM":
        return "Nueva solicitud de servicio"

    return "Nueva solicitud disponible"


def _build_persisted_data(
    payload: IncidentOfferNotificationInput,
) -> dict[str, Any]:
    return {
        "type": payload.notification_type,
        "action_context": "INCIDENT_OFFER",
        "incident_id": payload.incident_id,
        "incident_code": payload.incident_code,
        "incident_title": payload.incident_title,
        "incident_priority": payload.incident_priority,
        "incident_status": payload.incident_status,
        "offer_id": payload.offer_id,
        "provider_profile_id": payload.provider_profile_id,
        "service_catalog_id": payload.service_catalog_id,
        "service_code": payload.service_code,
        "service_name": payload.service_name,
        "service_category": payload.service_category,
        "customer_id": payload.customer_id,
        "customer_name": payload.customer_name,
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
        "distance_km": _decimal_to_string(payload.distance_km),
        "deeplink": tenant_offer_deeplink(payload.offer_id),
        "actions": {
            "view": {
                "method": "GET",
                "url": tenant_offer_url(payload.offer_id),
            },
            "accept": {
                "method": "PATCH",
                "url": tenant_offer_accept_url(payload.offer_id),
            },
            "reject": {
                "method": "PATCH",
                "url": tenant_offer_reject_url(payload.offer_id),
            },
        },
    }


def _build_push_data(
    payload: IncidentOfferNotificationInput,
) -> dict[str, str]:
    return {
        "type": payload.notification_type,
        "action_context": "INCIDENT_OFFER",
        "incident_id": payload.incident_id,
        "offer_id": payload.offer_id,
        "provider_profile_id": payload.provider_profile_id,
        "deeplink": tenant_offer_deeplink(payload.offer_id),
        "primary_action": "OPEN_OFFER_DETAIL",
        "available_actions": "ACCEPT_OFFER,REJECT_OFFER",
        "view_url": tenant_offer_url(payload.offer_id),
        "accept_url": tenant_offer_accept_url(payload.offer_id),
        "reject_url": tenant_offer_reject_url(payload.offer_id),
        "accept_method": "PATCH",
        "reject_method": "PATCH",
        "distance_km": _decimal_to_string(payload.distance_km),
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


def _distance_label(distance_km: Decimal | None) -> str | None:
    if distance_km is None:
        return None

    return f"{distance_km.quantize(Decimal('0.1'))} km"


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
