from __future__ import annotations

from app.modules.identity.membership.models import TenantMembership
from app.modules.identity.membership.schemas import (
    TenantMembershipDetailPublic,
    TenantMembershipPublic,
)
from app.modules.identity.user.mappers import user_public
from app.modules.identity.user.models import User


def tenant_membership_public(membership: TenantMembership) -> TenantMembershipPublic:
    return TenantMembershipPublic(
        id=str(membership.id),
        tenant_id=str(membership.tenant_id),
        user_id=str(membership.user_id),
        status=membership.status,  # type: ignore[arg-type]
        joined_at=membership.joined_at,
        created_at=membership.created_at,
        updated_at=membership.updated_at,
        deleted_at=membership.deleted_at,
    )


def tenant_membership_detail_public(
    membership: TenantMembership,
    user: User,
) -> TenantMembershipDetailPublic:
    return TenantMembershipDetailPublic(
        membership=tenant_membership_public(membership),
        user=user_public(user),
    )
