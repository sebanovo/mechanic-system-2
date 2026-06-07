from __future__ import annotations

from collections.abc import Sequence

from app.modules.incident.models import Incident
from app.modules.incident_ai_analysis.ai_schemas import AIServiceCatalogOption


def build_incident_analysis_prompt(
    *,
    incident: Incident,
    service_options: Sequence[AIServiceCatalogOption],
    extra_prompt: str | None = None,
) -> str:
    return f"""
Analiza el siguiente incidente mecánico y responde únicamente con un objeto JSON válido.

No uses markdown.
No incluyas explicación fuera del JSON.
No devuelvas texto adicional.

El JSON debe tener exactamente estas claves:

{{
  "suggested_title": "título corto sugerido o null",
  "suggested_address_text": "ubicación textual sugerida o null",
  "detected_problem": "texto corto",
  "detected_service_category": "categoría del catálogo elegido",
  "probable_service_code": "service_code exacto del catálogo o UNKNOWN",
  "severity": "LOW | MEDIUM | HIGH | CRITICAL",
  "priority": "LOW | MEDIUM | HIGH | CRITICAL",
  "confidence": 0.0,
  "estimated_min_price": null,
  "estimated_max_price": null,
  "estimated_min_duration_minutes": null,
  "estimated_max_duration_minutes": null,
  "summary": "resumen breve",
  "recommended_actions": ["acción 1", "acción 2"],
  "risk_notes": ["riesgo 1"]
}}

Reglas obligatorias:
- probable_service_code debe ser exactamente uno de los service_code del catálogo.
- No uses category como probable_service_code.
- detected_service_category debe ser la category del servicio elegido.
- Si no hay coincidencia clara, usa probable_service_code = "UNKNOWN".
- Si probable_service_code = "UNKNOWN", confidence debe ser menor o igual a 0.40.
- severity y priority deben ser: LOW, MEDIUM, HIGH o CRITICAL.
- estimated_min_price y estimated_max_price deben ser números o null.
- estimated_min_duration_minutes y estimated_max_duration_minutes deben ser números o null.
- Si el catálogo tiene precio o duración, úsalo como referencia principal.
- Si el catálogo tiene null, estima un rango razonable.
- No inventes datos que contradigan el incidente.
- Responde en español.

Catálogo activo:
{_format_service_options(service_options)}

Datos del incidente:
- Código: {_safe_value(incident.incident_code)}
- Título actual: {_safe_value(incident.title)}
- Descripción: {_safe_value(incident.description)}
- Dirección textual: {_safe_value(incident.address_text)}
- Latitud: {_safe_value(incident.latitude)}
- Longitud: {_safe_value(incident.longitude)}
- Prioridad actual: {_safe_value(incident.priority)}
- Estado actual: {_safe_value(incident.status)}

Instrucción adicional:
{_safe_value(extra_prompt)}
""".strip()


def _format_service_options(
    service_options: Sequence[AIServiceCatalogOption],
) -> str:
    if not service_options:
        return "- service_code: UNKNOWN | service_name: Servicio desconocido"

    lines: list[str] = []

    for service in service_options:
        lines.append(
            "\n".join(
                [
                    f"- service_code: {service.service_code}",
                    f"  service_name: {service.service_name}",
                    f"  category: {service.category}",
                    f"  description: {service.description or 'N/D'}",
                    f"  min_price: {service.min_price}",
                    f"  max_price: {service.max_price}",
                    f"  min_duration_minutes: {service.min_duration_minutes}",
                    f"  max_duration_minutes: {service.max_duration_minutes}",
                ]
            )
        )

    lines.append(
        "\n".join(
            [
                "- service_code: UNKNOWN",
                "  service_name: Servicio desconocido",
                "  category: UNKNOWN",
                "  description: Usar solo si ningún servicio coincide claramente.",
                "  min_price: null",
                "  max_price: null",
                "  min_duration_minutes: null",
                "  max_duration_minutes: null",
            ]
        )
    )

    return "\n".join(lines)


def _safe_value(value: object) -> str:
    if value is None:
        return "N/D"

    normalized = str(value).strip()
    return normalized if normalized else "N/D"