from __future__ import annotations

from datetime import datetime, timezone
from uuid import uuid4

from app.common.exceptions import ConflictException, NotFoundException
from app.core.audit.constants import ClientAuditEvent
from app.core.context import RequestContext
from app.core.services.base import BaseService
from app.modules.identity.customer.models import Customer
from app.modules.identity.customer.repository import CustomerRepository
from app.modules.identity.customer.schemas import CustomerStatusChangeRequest
from app.modules.identity.user.models import User
from app.modules.identity.user.schemas import UserUpdateRequest


def _system_context() -> RequestContext:
    return RequestContext(
        request_id="system",
        user_id=None,
        tenant_id=None,
        session_id=None,
        ip_address=None,
        user_agent=None,
    )


class CustomerService(BaseService):
    def __init__(
        self,
        repository: CustomerRepository,
        context: RequestContext | None = None,
    ) -> None:
        super().__init__(
            db=repository.db,
            context=context or _system_context(),
        )
        self.repository = repository

    def list(
        self,
        *,
        email: str | None = None,
        status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[Customer, User]], int]:
        return self.repository.list(
            email=email,
            status=status,
            limit=limit,
            offset=offset,
        )

    def get_detail_or_fail(self, customer_id: str) -> tuple[Customer, User]:
        detail = self.repository.get_detail_by_customer_id(customer_id)

        if detail is None:
            raise NotFoundException("Cliente no encontrado.")

        return detail

    def create_for_user(self, user: User) -> Customer:
        return self._create_for_user_uncommitted(user)

    def update(
        self,
        customer_id: str,
        payload: UserUpdateRequest,
    ) -> tuple[Customer, User]:
        customer, user = self.get_detail_or_fail(customer_id)
        changed_fields: list[str] = []

        if payload.first_name is not None:
            user.first_name = payload.first_name.strip()
            changed_fields.append("first_name")

        if payload.last_name is not None:
            user.last_name = payload.last_name.strip()
            changed_fields.append("last_name")

        if payload.phone is not None:
            user.phone = payload.phone
            changed_fields.append("phone")

        if payload.avatar_url is not None:
            user.avatar_url = payload.avatar_url
            changed_fields.append("avatar_url")

        self.db.flush()

        self.audit.updated(
            customer,
            ClientAuditEvent.CLIENT_PROFILE_UPDATED,
            resource_type="client",
            event_data={"changed_fields": changed_fields},
        )

        self.db.commit()
        self.db.refresh(customer)
        self.db.refresh(user)

        return customer, user

    def change_status(
        self,
        customer_id: str,
        payload: CustomerStatusChangeRequest,
    ) -> tuple[Customer, User]:
        customer = self._get_or_fail(customer_id)
        previous_status = customer.status

        customer.status = payload.status

        user = self.db.get(User, customer.user_id)
        if user is None:
            raise NotFoundException("Usuario no encontrado.")

        user.status = payload.status

        self.db.flush()

        self.audit.updated(
            customer,
            ClientAuditEvent.CLIENT_STATUS_CHANGED,
            resource_type="client",
            event_data={
                "previous_status": previous_status,
                "status": payload.status,
            },
        )

        self.db.commit()
        self.db.refresh(customer)
        self.db.refresh(user)

        return customer, user

    def soft_delete(self, customer_id: str) -> tuple[Customer, User]:
        customer = self._get_or_fail(customer_id)

        customer.deleted_at = datetime.now(timezone.utc)
        customer.status = "INACTIVE"

        user = self.db.get(User, customer.user_id)
        if user is None:
            raise NotFoundException("Usuario no encontrado.")

        user.deleted_at = datetime.now(timezone.utc)
        user.status = "INACTIVE"

        self.db.flush()

        self.audit.deleted(
            customer,
            ClientAuditEvent.CLIENT_DELETED,
            resource_type="client",
        )

        self.db.commit()
        self.db.refresh(customer)
        self.db.refresh(user)

        return customer, user

    def restore(self, customer_id: str) -> tuple[Customer, User]:
        customer = self._get_or_fail(customer_id)

        customer.deleted_at = None
        customer.status = "ACTIVE"

        user = self.db.get(User, customer.user_id)
        if user is None:
            raise NotFoundException("Usuario no encontrado.")

        user.deleted_at = None
        user.status = "ACTIVE"

        self.db.flush()

        self.audit.updated(
            customer,
            ClientAuditEvent.CLIENT_RESTORED,
            resource_type="client",
        )

        self.db.commit()
        self.db.refresh(customer)
        self.db.refresh(user)

        return customer, user

    def _create_for_user_uncommitted(self, user: User) -> Customer:
        existing = self.repository.get_by_user_id(str(user.id))

        if existing is not None:
            raise ConflictException("El cliente ya existe para este usuario.")

        customer = Customer(
            user_id=user.id,
            customer_code=self._generate_customer_code(),
            status="ACTIVE",
        )

        return self.repository.add(customer)

    def _get_or_fail(self, customer_id: str) -> Customer:
        customer = self.repository.get_by_id(customer_id)

        if customer is None:
            raise NotFoundException("Cliente no encontrado.")

        return customer

    def _generate_customer_code(self) -> str:
        return f"CUST-{uuid4().hex[:12].upper()}"
