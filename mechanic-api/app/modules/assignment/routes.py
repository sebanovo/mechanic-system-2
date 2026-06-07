from __future__ import annotations

CLIENT_ASSIGNMENT_BASE_PATH = "/api/clients/me/assignments"
TENANT_ASSIGNMENT_BASE_PATH = "/api/tenants/current/assignments"
ASSIGNMENT_DEEPLINK_CLIENT_BASE = "mechanic://client/assignments"
ASSIGNMENT_DEEPLINK_TENANT_BASE = "mechanic://tenant/assignments"


def client_assignment_url(assignment_id: str) -> str:
    return f"{CLIENT_ASSIGNMENT_BASE_PATH}/{assignment_id}"


def client_assignment_tracking_url(assignment_id: str) -> str:
    return f"{CLIENT_ASSIGNMENT_BASE_PATH}/{assignment_id}/tracking-events"


def tenant_assignment_url(assignment_id: str) -> str:
    return f"{TENANT_ASSIGNMENT_BASE_PATH}/{assignment_id}"


def tenant_assignment_tracking_url(assignment_id: str) -> str:
    return f"{TENANT_ASSIGNMENT_BASE_PATH}/{assignment_id}/tracking-events"


def client_assignment_deeplink(assignment_id: str) -> str:
    return f"{ASSIGNMENT_DEEPLINK_CLIENT_BASE}/{assignment_id}"


def tenant_assignment_deeplink(assignment_id: str) -> str:
    return f"{ASSIGNMENT_DEEPLINK_TENANT_BASE}/{assignment_id}"
