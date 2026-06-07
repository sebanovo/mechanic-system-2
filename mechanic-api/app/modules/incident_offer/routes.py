from __future__ import annotations

TENANT_OFFERS_BASE_PATH = "/api/tenants/current/offers"
TENANT_OFFERS_DEEPLINK_BASE = "mechanic://tenant/offers"


def tenant_offer_url(offer_id: str) -> str:
    return f"{TENANT_OFFERS_BASE_PATH}/{offer_id}"


def tenant_offer_accept_url(offer_id: str) -> str:
    return f"{TENANT_OFFERS_BASE_PATH}/{offer_id}/accept"


def tenant_offer_reject_url(offer_id: str) -> str:
    return f"{TENANT_OFFERS_BASE_PATH}/{offer_id}/reject"


def tenant_offer_deeplink(offer_id: str) -> str:
    return f"{TENANT_OFFERS_DEEPLINK_BASE}/{offer_id}"
