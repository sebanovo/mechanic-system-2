from __future__ import annotations

from uuid import UUID, uuid4

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.common.exceptions import (
    ConflictException,
    ForbiddenException,
    UnauthorizedException,
    ValidationException,
)
from app.common.uuid import optional_uuid
from app.core.context import RequestContext
from app.core.audit.constants import (
    AuthAuditEvent,
    AuditActorType,
    ClientAuditEvent,
    SessionAuditEvent,
    TenantAuditEvent,
)
from app.core.security import (
    create_access_token,
    generate_refresh_token,
    hash_password,
    verify_password,
)
from app.core.services.base import BaseService
from app.modules.identity.auth.schemas import (
    AuthContext,
    AuthTenantPublic,
    LoginRequest,
    RegisterClientRequest,
    RegisterTenantRequest,
    SelectTenantRequest,
    TokenPair,
)
from app.modules.identity.customer.models import Customer
from app.modules.identity.customer.repository import CustomerRepository
from app.modules.identity.membership.models import TenantMembership
from app.modules.identity.membership.repository import TenantMembershipRepository
from app.modules.identity.session.mappers import session_public
from app.modules.identity.session.models import UserSession
from app.modules.identity.session.repository import SessionRepository
from app.modules.identity.session.service import SessionService
from app.modules.identity.tenant.onboarding import TenantOnboardingService
from app.modules.identity.tenant.models import Tenant
from app.modules.identity.tenant.repository import TenantRepository
from app.modules.identity.user.mappers import user_public
from app.modules.identity.user.models import User
from app.modules.identity.user.repository import UserRepository


def _system_context() -> RequestContext:
    return RequestContext(
        request_id="system",
        user_id=None,
        tenant_id=None,
        session_id=None,
        ip_address=None,
        user_agent=None,
    )


class AuthService(BaseService):
    def __init__(
        self,
        db: Session,
        context: RequestContext | None = None,
    ) -> None:
        super().__init__(db=db, context=context or _system_context())
        self.user_repository = UserRepository(db)
        self.customer_repository = CustomerRepository(db)
        self.membership_repository = TenantMembershipRepository(db)
        self.tenant_repository = TenantRepository(db)
        self.session_service = SessionService(SessionRepository(db), context=self.context)

    def register_client(self, payload: RegisterClientRequest) -> AuthContext:
        if self.user_repository.exists_by_email(str(payload.email)):
            raise ConflictException("El correo electrónico ya está registrado.")

        user = User(
            email=str(payload.email).strip().lower(),
            password_hash=hash_password(payload.password),
            first_name=payload.first_name.strip(),
            last_name=payload.last_name.strip(),
            phone=None,
            avatar_url=None,
            user_type="CLIENT",
            status="ACTIVE",
            email_verified=False,
            email_verified_at=None,
        )
        self.db.add(user)
        self.db.flush()

        customer = Customer(
            user_id=user.id,
            customer_code=self._generate_customer_code(),
            status="ACTIVE",
        )
        self.db.add(customer)
        self.db.flush()

        session = self._create_session(user=user, tenant_id=None, payload=None)
        tokens = self._issue_tokens(user=user, session=session, tenant_id=None)

        self.audit.created(
            user,
            ClientAuditEvent.CLIENT_CREATED,
            resource_type="user",
            event_data={"user_type": user.user_type},
            actor_type=AuditActorType.CLIENT,
        )

        self.audit.created(
            customer,
            ClientAuditEvent.CLIENT_PROFILE_CREATED,
            resource_type="customer",
            event_data={"customer_code": customer.customer_code},
            actor_type=AuditActorType.CLIENT,
        )

        self.db.commit()
        self.db.refresh(user)
        self.db.refresh(session)

        return self._context(user=user, session=session, tokens=tokens)

    def register_tenant(self, payload: RegisterTenantRequest) -> AuthContext:
        onboarding = TenantOnboardingService(self.db, context=self.context)
        result = onboarding.create_with_owner(payload)

        session = self._create_session(
            user=result.user,
            tenant_id=str(result.tenant.id),
            payload=None,
        )
        tokens = self._issue_tokens(
            user=result.user,
            session=session,
            tenant_id=str(result.tenant.id),
        )

        self.audit.created(
            session,
            SessionAuditEvent.SESSION_CREATED,
            resource_type="session",
            tenant_id=str(result.tenant.id),
            actor_type=AuditActorType.TENANT_OWNER,
        )

        self.db.commit()
        self.db.refresh(result.user)
        self.db.refresh(result.tenant)
        self.db.refresh(session)

        return self._context(user=result.user, session=session, tokens=tokens)

    def login(self, payload: LoginRequest) -> AuthContext:
        user = self.user_repository.get_by_email(str(payload.email))

        if user is None or not verify_password(payload.password, user.password_hash):
            self.audit.created(
                payload,
                AuthAuditEvent.USER_LOGIN_FAILED,
                resource_type="auth",
                event_data={"email": str(payload.email)},
                actor_type=AuditActorType.SYSTEM,
            )
            self.db.commit()
            raise UnauthorizedException("Credenciales inválidas.")

        if user.status != "ACTIVE" or user.deleted_at is not None:
            raise ForbiddenException("El usuario no está activo.")

        session = self.session_service.create_session(
            user=user,
            tenant_id=None,
            device_type=None,
            device_name=None,
            ip_address=self.context.ip_address,
            user_agent=self.context.user_agent,
        )

        tokens = self._issue_tokens(user=user, session=session, tenant_id=None)

        self.audit.created(
            session,
            SessionAuditEvent.SESSION_CREATED,
            resource_type="session",
            tenant_id=None,
            actor_type=user.user_type,
        )

        self.audit.created(
            session,
            AuthAuditEvent.USER_LOGIN_SUCCESS,
            resource_type="session",
            tenant_id=None,
            actor_type=user.user_type,
        )

        self.db.commit()
        self.db.refresh(user)
        self.db.refresh(session)

        return self._context(user=user, session=session, tokens=tokens)

    def select_tenant(
        self,
        *,
        user: User,
        session: UserSession,
        payload: SelectTenantRequest,
    ) -> AuthContext:
        if user.user_type not in {"TENANT_OWNER", "TECHNICIAN"}:
            raise ForbiddenException("El usuario no puede seleccionar tenant.")

        tenant_id = self._validate_tenant_access(str(user.id), payload.tenant_id)

        session.tenant_id = UUID(tenant_id)
        self.session_service.touch_session(session)

        tokens = self._issue_tokens(user=user, session=session, tenant_id=tenant_id)

        self.audit.updated(
            session,
            TenantAuditEvent.TENANT_SELECTED,
            resource_type="tenant",
            tenant_id=tenant_id,
            actor_type=user.user_type,
        )

        self.db.commit()
        self.db.refresh(session)

        return self._context(user=user, session=session, tokens=tokens)

    def refresh(self, raw_refresh_token: str) -> AuthContext:
        refresh_token = self.session_service.validate_refresh_token(raw_refresh_token)
        session = self.session_service.get_session_or_fail(str(refresh_token.session_id))

        if session.session_status != "ACTIVE":
            raise UnauthorizedException("La sesión ha expirado.")

        user = self.user_repository.get_by_id(str(session.user_id))

        if user is None or user.status != "ACTIVE" or user.deleted_at is not None:
            raise UnauthorizedException("Usuario no disponible.")

        self.session_service.mark_refresh_token_used(refresh_token)
        self.session_service.touch_session(session)

        tenant_id = str(session.tenant_id) if session.tenant_id is not None else None

        tokens = self._issue_tokens(
            user=user,
            session=session,
            tenant_id=tenant_id,
            token_family=refresh_token.token_family,
        )

        self.audit.updated(
            refresh_token,
            AuthAuditEvent.REFRESH_TOKEN_USED,
            resource_type="refresh_token",
            tenant_id=tenant_id,
            actor_type=user.user_type,
        )

        self.db.commit()
        self.db.refresh(user)
        self.db.refresh(session)

        return self._context(user=user, session=session, tokens=tokens)

    def logout(self, session: UserSession) -> None:
        self.session_service.revoke_session_uncommitted(str(session.id))

        self.audit.deleted(
            session,
            SessionAuditEvent.SESSION_REVOKED,
            resource_type="session",
            tenant_id=str(session.tenant_id) if session.tenant_id is not None else None,
            actor_type=self.context.actor_type,
        )

        self.db.commit()

    def me(self, user: User, session: UserSession) -> AuthContext:
        return self._context(user=user, session=session, tokens=None)

    def _issue_tokens(
        self,
        *,
        user: User,
        session: UserSession,
        tenant_id: str | None,
        token_family=None,
    ) -> TokenPair:
        access_token, access_expires_at = create_access_token(
            subject=str(user.id),
            extra_claims={
                "sid": str(session.id),
                "tid": tenant_id,
                "user_type": user.user_type,
            },
        )

        raw_refresh_token = generate_refresh_token()
        refresh_record = self.session_service.create_refresh_token(
            session=session,
            raw_refresh_token=raw_refresh_token,
            token_family=token_family,
        )

        return TokenPair(
            access_token=access_token,
            access_expires_at=access_expires_at,
            refresh_token=raw_refresh_token,
            refresh_expires_at=refresh_record.expires_at,
        )

    def _create_session(
        self,
        *,
        user: User,
        tenant_id: str | None,
        payload,
    ) -> UserSession:
        return self.session_service.create_session(
            user=user,
            tenant_id=tenant_id,
            device_type=getattr(payload, "device_type", None),
            device_name=getattr(payload, "device_name", None),
            ip_address=self.context.ip_address,
            user_agent=self.context.user_agent,
        )

    def _validate_tenant_access(self, user_id: str, tenant_id: str) -> str:
        try:
            tenant_uuid = UUID(tenant_id)
            user_uuid = UUID(user_id)
        except ValueError as exc:
            raise ValidationException("El tenant_id o user_id es inválido.") from exc

        tenant = self.db.get(Tenant, tenant_uuid)

        if tenant is None or tenant.deleted_at is not None:
            raise ForbiddenException("El tenant no está disponible.")

        if tenant.status != "ACTIVE":
            raise ForbiddenException("El tenant no está activo.")

        membership = self.db.scalar(
            select(TenantMembership).where(
                TenantMembership.tenant_id == tenant_uuid,
                TenantMembership.user_id == user_uuid,
                TenantMembership.status == "ACTIVE",
                TenantMembership.deleted_at.is_(None),
            )
        )

        if membership is None:
            raise ForbiddenException("El usuario no pertenece al tenant solicitado.")

        return str(tenant_uuid)

    def _context(
        self,
        *,
        user: User,
        session: UserSession,
        tokens: TokenPair | None,
    ) -> AuthContext:
        tenant_id = str(session.tenant_id) if session.tenant_id is not None else None
        tenant_uuid = optional_uuid(tenant_id, "tenant_id")
        tenant = self.db.get(Tenant, tenant_uuid) if tenant_uuid is not None else None
        available_tenants = self._available_tenants_for_user(str(user.id))

        if tenant is not None and (tenant.deleted_at is not None or tenant.status != "ACTIVE"):
            tenant = None

        return AuthContext(
            user=user_public(user),
            user_type=user.user_type,
            tenant_id=tenant_id,
            current_tenant=(
                AuthTenantPublic(
                    id=str(tenant.id),
                    slug=tenant.slug,
                    commercial_name=tenant.commercial_name,
                    tenant_kind=tenant.tenant_kind,
                    status=tenant.status,
                )
                if tenant is not None
                else None
            ),
            available_tenants=available_tenants,
            requires_tenant_selection=(
                user.user_type in {"TENANT_OWNER", "TECHNICIAN"} and tenant_id is None
            ),
            session=session_public(session),
            tokens=tokens,
        )

    def _available_tenants_for_user(self, user_id: str) -> list[AuthTenantPublic]:
        memberships = self.membership_repository.list_by_user(
            user_id,
            status="ACTIVE",
        )

        available_tenants: list[AuthTenantPublic] = []

        for membership in memberships:
            tenant = self.tenant_repository.get_by_id(membership.tenant_id)

            if tenant is None or tenant.deleted_at is not None or tenant.status != "ACTIVE":
                continue

            available_tenants.append(
                AuthTenantPublic(
                    id=str(tenant.id),
                    slug=tenant.slug,
                    commercial_name=tenant.commercial_name,
                    tenant_kind=tenant.tenant_kind,
                    status=tenant.status,
                )
            )

        return available_tenants

    def _generate_customer_code(self) -> str:
        return f"CUST-{uuid4().hex[:12].upper()}"
