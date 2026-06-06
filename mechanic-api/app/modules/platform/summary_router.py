from __future__ import annotations

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.common.responses import success_response
from app.core.database import get_db
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.identity.customer.models import Customer
from app.modules.identity.tenant.models import Tenant
from app.modules.identity.user.models import User

router = APIRouter(prefix="/platform", tags=["Platform"])


class PlatformSummaryPublic(BaseModel):
    total_users: int
    total_clients: int
    total_tenants: int
    active_tenants: int
    blocked_users: int


class PlatformSummaryResponse(BaseModel):
    success: bool = True
    message: str
    data: PlatformSummaryPublic


@router.get("/summary", response_model=PlatformSummaryResponse)
def summary(
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    db: Session = Depends(get_db),
) -> dict:
    total_users = db.scalar(
        select(func.count()).select_from(User).where(User.deleted_at.is_(None))
    ) or 0

    total_clients = db.scalar(
        select(func.count()).select_from(Customer).where(Customer.deleted_at.is_(None))
    ) or 0

    total_tenants = db.scalar(
        select(func.count()).select_from(Tenant).where(Tenant.deleted_at.is_(None))
    ) or 0

    active_tenants = db.scalar(
        select(func.count()).select_from(Tenant).where(
            Tenant.status == "ACTIVE",
            Tenant.deleted_at.is_(None),
        )
    ) or 0

    blocked_users = db.scalar(
        select(func.count()).select_from(User).where(
            User.status == "BLOCKED",
            User.deleted_at.is_(None),
        )
    ) or 0

    return success_response(
        message="Resumen de plataforma obtenido correctamente.",
        data=PlatformSummaryPublic(
            total_users=int(total_users),
            total_clients=int(total_clients),
            total_tenants=int(total_tenants),
            active_tenants=int(active_tenants),
            blocked_users=int(blocked_users),
        ).model_dump(mode="json"),
    )