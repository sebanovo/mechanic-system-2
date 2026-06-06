from __future__ import annotations

from datetime import datetime, timezone
from uuid import uuid4

from sqlalchemy import select

from app.common.exceptions import (
    ConflictException,
    NotFoundException,
)
from app.core.audit.constants import (
    AuditActorType,
    TenantAuditEvent,
    TechnicianAuditEvent,
    TechnicianAvailabilityAuditEvent,
    UserAuditEvent,
)
from app.common.uuid import to_uuid
from app.core.context import RequestContext
from app.core.security import hash_password
from app.core.services.base import BaseService
from app.modules.identity.provider.models import ProviderProfile
from app.modules.identity.technician.models import Technician
from app.modules.identity.technician.repository import TechnicianRepository
from app.modules.identity.technician.schemas import (
    TechnicianCreateRequest,
    TechnicianStatusChangeRequest,
)
from app.modules.identity.technician_availability.models import TechnicianAvailability
from app.modules.identity.technician_availability.repository import (
    TechnicianAvailabilityRepository,
)
from app.modules.identity.membership.models import TenantMembership
from app.modules.identity.membership.repository import TenantMembershipRepository
from app.modules.identity.user.models import User


def _system_context() -> RequestContext:
    return RequestContext(
        request_id="system",
        user_id=None,
        tenant_id=None,
        session_id=None,
        ip_address=None,
        user_agent=None,
    )


class TechnicianService(BaseService):
    def __init__(
        self,
        repository: TechnicianRepository,
        context: RequestContext | None = None,
    ) -> None:
        super().__init__(db=repository.db, context=context or _system_context())
        self.repository = repository
        self.membership_repository = TenantMembershipRepository(self.db)
        self.availability_repository = TechnicianAvailabilityRepository(self.db)

    def list(
        self,
        *,
        status: str | None = None,
        provider_profile_id: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[Technician, User]], int]:
        status = self._normalize_status(status)
        provider_profile_id = self._normalize_optional_text(provider_profile_id)

        return self.repository.list(
            status=status,
            provider_profile_id=provider_profile_id,
            limit=limit,
            offset=offset,
        )

    def list_by_provider(
        self,
        provider_profile_id: str,
        *,
        status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[Technician, User]], int]:
        status = self._normalize_status(status)
        provider_profile_id = self._normalize_optional_text(provider_profile_id)

        return self.repository.list_by_provider(
            provider_profile_id,
            status=status,
            limit=limit,
            offset=offset,
        )

    def get_detail_or_fail(self, technician_id: str) -> tuple[Technician, User]:
        detail = self.repository.get_detail_by_id(technician_id)

        if detail is None:
            raise NotFoundException("Técnico no encontrado.")

        return detail

    def create_for_provider(
        self,
        provider_profile: ProviderProfile,
        payload: TechnicianCreateRequest,
    ) -> Technician:
        technician, user, membership, availability = self._create_for_provider_uncommitted(
            provider_profile,
            payload,
        )

        actor_type = self.context.actor_type or AuditActorType.TENANT_OWNER
        tenant_id = str(provider_profile.tenant_id)

        self.audit.created(
            user,
            UserAuditEvent.USER_CREATED,
            resource_type="user",
            tenant_id=tenant_id,
            event_data={"user_type": user.user_type},
            actor_type=actor_type,
        )

        self.audit.created(
            technician,
            TechnicianAuditEvent.TECHNICIAN_CREATED,
            resource_type="technician",
            tenant_id=tenant_id,
            event_data={"technician_code": technician.technician_code},
            actor_type=actor_type,
        )

        self.audit.created(
            membership,
            TenantAuditEvent.TENANT_MEMBERSHIP_CREATED,
            resource_type="tenant_membership",
            tenant_id=tenant_id,
            event_data={"status": membership.status},
            actor_type=actor_type,
        )

        self.audit.created(
            availability,
            TechnicianAvailabilityAuditEvent.TECHNICIAN_AVAILABILITY_CREATED,
            resource_type="technician_availability",
            tenant_id=tenant_id,
            event_data={"availability_status": availability.availability_status},
            actor_type=actor_type,
        )

        self.db.commit()
        self.db.refresh(user)
        self.db.refresh(technician)
        self.db.refresh(membership)
        self.db.refresh(availability)

        return technician

    def change_status(
        self,
        technician_id: str,
        payload: TechnicianStatusChangeRequest,
    ) -> Technician:
        technician = self._get_or_fail(technician_id)
        previous_status = technician.status

        technician.status = payload.status

        user = self.db.get(User, technician.user_id)
        if user is not None:
            user.status = payload.status

        self.db.flush()

        tenant_id = self._tenant_id_from_provider_profile(technician.provider_profile_id)

        self.audit.updated(
            technician,
            TechnicianAuditEvent.TECHNICIAN_UPDATED,
            resource_type="technician",
            tenant_id=tenant_id,
            event_data={
                "previous_status": previous_status,
                "status": payload.status,
            },
        )

        self.db.commit()
        self.db.refresh(technician)

        return technician

    def soft_delete(self, technician_id: str) -> Technician:
        technician = self._get_or_fail(technician_id)

        technician.deleted_at = datetime.now(timezone.utc)
        technician.status = "INACTIVE"

        user = self.db.get(User, technician.user_id)
        if user is not None:
            user.status = "INACTIVE"

        self.db.flush()

        tenant_id = self._tenant_id_from_provider_profile(technician.provider_profile_id)

        self.audit.deleted(
            technician,
            TechnicianAuditEvent.TECHNICIAN_DELETED,
            resource_type="technician",
            tenant_id=tenant_id,
        )

        self.db.commit()
        self.db.refresh(technician)

        return technician

    def _create_for_provider_uncommitted(
        self,
        provider_profile: ProviderProfile,
        payload: TechnicianCreateRequest,
    ) -> tuple[Technician, User, TenantMembership, TechnicianAvailability]:
        existing_user = self.db.scalar(
            select(User).where(User.email == payload.email.strip().lower())
        )

        if existing_user is not None:
            raise ConflictException("El correo electrónico ya está registrado.")

        user = User(
            email=payload.email.strip().lower(),
            password_hash=hash_password(payload.password),
            first_name=payload.first_name.strip(),
            last_name=payload.last_name.strip(),
            user_type="TECHNICIAN",
            status="ACTIVE",
            email_verified=False,
            email_verified_at=None,
        )

        self.db.add(user)
        self.db.flush()

        technician = Technician(
            provider_profile_id=provider_profile.id,
            user_id=user.id,
            technician_code=self._generate_technician_code(),
            status="ACTIVE",
            average_rating=0,
            total_reviews=0,
        )

        technician = self.repository.add(technician)

        membership = TenantMembership(
            tenant_id=provider_profile.tenant_id,
            user_id=user.id,
            status="ACTIVE",
        )
        membership = self.membership_repository.add(membership)

        availability = TechnicianAvailability(
            technician_id=technician.id,
            availability_status="OFFLINE",
            available_from=None,
            available_until=None,
        )
        availability = self.availability_repository.add(availability)

        return technician, user, membership, availability

    def _tenant_id_from_provider_profile(self, provider_profile_id) -> str | None:
        provider_profile = self.db.get(ProviderProfile, provider_profile_id)

        if provider_profile is None:
            return self.context.tenant_id

        return str(provider_profile.tenant_id)

    def _get_or_fail(self, technician_id: str) -> Technician:
        technician = self.repository.get_by_id(technician_id)

        if technician is None:
            raise NotFoundException("Técnico no encontrado.")

        return technician

    def _normalize_optional_text(self, value: str | None) -> str | None:
        if value is None:
            return None

        normalized = value.strip()
        return normalized or None

    def _normalize_status(self, value: str | None) -> str | None:
        normalized = self._normalize_optional_text(value)
        if normalized is None:
            return None

        return normalized.upper()

    def _generate_technician_code(self) -> str:
        return f"TECH-{uuid4().hex[:12].upper()}"
