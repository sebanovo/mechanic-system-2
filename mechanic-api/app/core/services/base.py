from __future__ import annotations

from sqlalchemy.orm import Session

from app.core.audit.manager import AuditManager
from app.core.context import RequestContext


class BaseService:
    def __init__(
        self,
        db: Session,
        context: RequestContext,
    ) -> None:
        self.db = db
        self.context = context
        self.audit = AuditManager(db=db, context=context)

    @property
    def actor_id(self) -> str | None:
        return self.context.user_id

    @property
    def tenant_id(self) -> str | None:
        return self.context.tenant_id
