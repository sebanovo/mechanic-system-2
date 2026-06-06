from dataclasses import dataclass


@dataclass(slots=True)
class RequestContext:
    request_id: str
    user_id: str | None
    tenant_id: str | None
    session_id: str | None
    ip_address: str | None
    user_agent: str | None
    actor_type: str | None = None
