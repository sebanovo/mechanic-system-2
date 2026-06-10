from __future__ import annotations

from datetime import datetime
from datetime import timezone
from uuid import UUID

from sqlalchemy import Select
from sqlalchemy import func
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.modules.dynamic_report.models import DynamicReportExecution


class DynamicReportExecutionRepository:
    def __init__(
        self,
        db: Session,
    ) -> None:
        self.db = db

    def add_success(
        self,
        *,
        requested_by_user_id: str,
        tenant_id: str | None,
        report_type: str,
        title: str,
        scope: str,
        prompt: str,
        intent: dict,
        result_metadata: dict,
        row_count: int,
    ) -> DynamicReportExecution:
        execution = DynamicReportExecution(
            requested_by_user_id=to_uuid(
                requested_by_user_id,
                "requested_by_user_id",
            ),
            tenant_id=(
                to_uuid(tenant_id, "tenant_id")
                if tenant_id is not None
                else None
            ),
            report_type=report_type,
            title=title,
            scope=scope,
            prompt=prompt,
            intent=intent,
            result_metadata=result_metadata,
            row_count=row_count,
            status="SUCCESS",
            error_message=None,
            executed_at=datetime.now(timezone.utc),
        )

        self.db.add(execution)
        self.db.flush()
        return execution

    def add_failure(
        self,
        *,
        requested_by_user_id: str,
        tenant_id: str | None,
        report_type: str,
        title: str,
        scope: str,
        prompt: str,
        intent: dict,
        error_message: str,
    ) -> DynamicReportExecution:
        execution = DynamicReportExecution(
            requested_by_user_id=to_uuid(
                requested_by_user_id,
                "requested_by_user_id",
            ),
            tenant_id=(
                to_uuid(tenant_id, "tenant_id")
                if tenant_id is not None
                else None
            ),
            report_type=report_type,
            title=title,
            scope=scope,
            prompt=prompt,
            intent=intent,
            result_metadata=None,
            row_count=0,
            status="FAILED",
            error_message=error_message,
            executed_at=datetime.now(timezone.utc),
        )

        self.db.add(execution)
        self.db.flush()
        return execution

    def get_by_id(
        self,
        execution_id: str | UUID,
    ) -> DynamicReportExecution | None:
        return self.db.get(
            DynamicReportExecution,
            to_uuid(execution_id, "execution_id"),
        )

    def list_by_user(
        self,
        *,
        requested_by_user_id: str,
        tenant_id: str | None,
        limit: int,
        offset: int,
    ) -> tuple[list[DynamicReportExecution], int]:
        query = select(DynamicReportExecution).where(
            DynamicReportExecution.requested_by_user_id
            == to_uuid(requested_by_user_id, "requested_by_user_id")
        )

        if tenant_id is not None:
            query = query.where(
                DynamicReportExecution.tenant_id
                == to_uuid(tenant_id, "tenant_id")
            )

        return self._paginate(
            query.order_by(DynamicReportExecution.executed_at.desc()),
            limit,
            offset,
        )

    def _paginate(
        self,
        query: Select[tuple[DynamicReportExecution]],
        limit: int,
        offset: int,
    ) -> tuple[list[DynamicReportExecution], int]:
        total = self.db.scalar(select(func.count()).select_from(query.subquery()))
        rows = self.db.scalars(query.offset(offset).limit(limit)).all()
        return list(rows), int(total or 0)
