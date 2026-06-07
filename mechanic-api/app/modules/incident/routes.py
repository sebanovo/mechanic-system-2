from __future__ import annotations

CLIENT_INCIDENTS_BASE_PATH = "/api/clients/me/incidents"
CLIENT_INCIDENTS_DEEPLINK_BASE = "mechanic://client/incidents"


def client_incident_url(incident_id: str) -> str:
    return f"{CLIENT_INCIDENTS_BASE_PATH}/{incident_id}"


def client_incident_deeplink(incident_id: str) -> str:
    return f"{CLIENT_INCIDENTS_DEEPLINK_BASE}/{incident_id}"
