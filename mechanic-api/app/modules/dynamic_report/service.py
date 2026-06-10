from __future__ import annotations

import logging
from datetime import datetime
from datetime import timezone
from uuid import uuid4

from sqlalchemy.orm import Session

from app.common.exceptions import BusinessException
from app.common.exceptions import NotFoundException
from app.core.context import RequestContext
from app.core.services.base import BaseService
from app.modules.dynamic_report.builders.incidents_report_builder import (
    IncidentsReportBuilder,
)
from app.modules.dynamic_report.intent_parser import DynamicReportIntentParser
from app.modules.dynamic_report.mappers import dynamic_report_execution_public
from app.modules.dynamic_report.registry import DynamicReportRegistry
from app.modules.dynamic_report.repository import (
    DynamicReportExecutionRepository,
)
from app.modules.dynamic_report.schemas import (
    DynamicReportExecutionPublic,
    DynamicReportExecutionStatus,
    DynamicReportIntent,
    DynamicReportPromptRequest,
    DynamicReportRunData,
    DynamicReportResult,
    DynamicReportScope,
)


logger = logging.getLogger(__name__)


class DynamicReportService(BaseService):
    def __init__(
        self,
        db: Session,
        context: RequestContext,
    ) -> None:
        super().__init__(db=db, context=context)
        self.registry = DynamicReportRegistry()
        self.intent_parser = DynamicReportIntentParser()
        self.execution_repository = DynamicReportExecutionRepository(db)

    def run_from_prompt(
        self,
        *,
        payload: DynamicReportPromptRequest,
        user_type: str,
    ) -> DynamicReportRunData:
        if self.context.user_id is None:
            raise BusinessException("Authenticated user is required.")

        intent = self.intent_parser.parse(payload.prompt)

        return self._execute_intent(
            intent=intent,
            prompt=payload.prompt,
            user_type=user_type,
        )

    def replay_execution(
        self,
        *,
        execution_id: str,
        user_type: str,
    ) -> DynamicReportRunData:
        if self.context.user_id is None:
            raise BusinessException("Authenticated user is required.")

        previous_execution = self.execution_repository.get_by_id(execution_id)

        if previous_execution is None:
            raise NotFoundException("Report execution not found.")

        self._ensure_can_access_execution(
            execution_tenant_id=(
                str(previous_execution.tenant_id)
                if previous_execution.tenant_id is not None
                else None
            ),
            requested_by_user_id=str(previous_execution.requested_by_user_id),
        )

        intent = DynamicReportIntent.model_validate(previous_execution.intent)

        return self._execute_intent(
            intent=intent,
            prompt=previous_execution.prompt,
            user_type=user_type,
        )

    def _execute_intent(
        self,
        *,
        intent: DynamicReportIntent,
        prompt: str,
        user_type: str,
    ) -> DynamicReportRunData:
        self.registry.validate_intent(
            intent=intent,
            user_type=user_type,
        )

        scope = self._resolve_scope(user_type)

        try:
            builder = self._get_builder(intent.report_type)

            result = builder.build(
                intent=intent,
                scope=scope,
            )

            execution = self._persist_success_execution(
                requested_by_user_id=self.context.user_id or "",
                tenant_id=(
                    self.context.tenant_id
                    if scope == "TENANT"
                    else None
                ),
                report_type=intent.report_type,
                title=intent.title,
                scope=scope,
                prompt=prompt,
                row_count=len(result.rows),
                result=result,
                intent=intent,
            )

            if execution is None:
                execution = self._build_transient_execution_public(
                    requested_by_user_id=self.context.user_id or "",
                    tenant_id=(
                        self.context.tenant_id
                        if scope == "TENANT"
                        else None
                    ),
                    report_type=intent.report_type,
                    title=intent.title,
                    scope=scope,
                    prompt=prompt,
                    intent=intent,
                    result=result,
                    row_count=len(result.rows),
                    status="SUCCESS",
                    error_message=None,
                )

            return DynamicReportRunData(
                execution=execution,
                intent=intent,
                result=result,
            )
        except Exception as exc:
            self.db.rollback()

            failure_execution = self._persist_failure_execution(
                requested_by_user_id=self.context.user_id or "",
                tenant_id=(
                    self.context.tenant_id
                    if scope == "TENANT"
                    else None
                ),
                report_type=intent.report_type,
                title=intent.title,
                scope=scope,
                prompt=prompt,
                intent=intent,
                error_message=str(exc),
            )

            if failure_execution is None:
                logger.warning(
                    "Dynamic report failure execution could not be persisted. report_type=%s user_id=%s error=%s",
                    intent.report_type,
                    self.context.user_id,
                    exc,
                )
            else:
                self.db.commit()
                self.db.refresh(failure_execution)

            raise

    def _resolve_scope(self, user_type: str) -> DynamicReportScope:
        if user_type == "SUPERADMIN":
            return "PLATFORM"

        if user_type == "TENANT_OWNER":
            if self.context.tenant_id is None:
                raise BusinessException("Tenant selection required.")

            return "TENANT"

        raise BusinessException("User not allowed.")

    def _get_builder(self, report_type: str):
        normalized_report_type = report_type.strip().upper()

        if normalized_report_type == "INCIDENTS":
            return IncidentsReportBuilder(
                db=self.db,
                context=self.context,
            )

        raise BusinessException(
            f"Builder not implemented for {report_type}."
        )

    def _persist_success_execution(
        self,
        *,
        requested_by_user_id: str,
        tenant_id: str | None,
        report_type: str,
        title: str,
        scope: DynamicReportScope,
        prompt: str,
        intent: DynamicReportIntent,
        result: DynamicReportResult,
        row_count: int,
    ) -> DynamicReportExecutionPublic | None:
        try:
            execution = self.execution_repository.add_success(
                requested_by_user_id=requested_by_user_id,
                tenant_id=tenant_id,
                report_type=report_type,
                title=title,
                scope=scope,
                prompt=prompt,
                intent=intent.model_dump(mode="json"),
                result_metadata={
                    "columns": [
                        column.model_dump(mode="json")
                        for column in result.columns
                    ],
                    "metadata": result.metadata,
                },
                row_count=row_count,
            )

            self.db.commit()
            self.db.refresh(execution)
            return dynamic_report_execution_public(execution)
        except Exception:
            self.db.rollback()
            return None

    def _persist_failure_execution(
        self,
        *,
        requested_by_user_id: str,
        tenant_id: str | None,
        report_type: str,
        title: str,
        scope: DynamicReportScope,
        prompt: str,
        intent: DynamicReportIntent,
        error_message: str,
    ) -> object | None:
        try:
            execution = self.execution_repository.add_failure(
                requested_by_user_id=requested_by_user_id,
                tenant_id=tenant_id,
                report_type=report_type,
                title=title,
                scope=scope,
                prompt=prompt,
                intent=intent.model_dump(mode="json"),
                error_message=error_message,
            )

            return execution
        except Exception:
            self.db.rollback()
            return None

    def _build_transient_execution_public(
        self,
        *,
        requested_by_user_id: str,
        tenant_id: str | None,
        report_type: str,
        title: str,
        scope: DynamicReportScope,
        prompt: str,
        intent: DynamicReportIntent,
        result: DynamicReportResult,
        row_count: int,
        status: DynamicReportExecutionStatus,
        error_message: str | None,
    ) -> DynamicReportExecutionPublic:
        now = datetime.now(timezone.utc)
        return DynamicReportExecutionPublic(
            id=str(uuid4()),
            requested_by_user_id=requested_by_user_id,
            tenant_id=tenant_id,
            report_type=report_type,
            title=title,
            scope=scope,
            prompt=prompt,
            intent=intent.model_dump(mode="json"),
            result_metadata={
                "columns": [
                    column.model_dump(mode="json")
                    for column in result.columns
                ],
                "metadata": result.metadata,
            },
            row_count=row_count,
            status=status,
            error_message=error_message,
            executed_at=now,
            created_at=now,
            updated_at=now,
        )

    def get_execution_or_fail(
        self,
        execution_id: str,
    ) -> DynamicReportExecutionPublic:
        execution = self.execution_repository.get_by_id(execution_id)

        if execution is None:
            raise NotFoundException("Report execution not found.")

        self._ensure_can_access_execution(
            execution_tenant_id=(
                str(execution.tenant_id)
                if execution.tenant_id is not None
                else None
            ),
            requested_by_user_id=str(execution.requested_by_user_id),
        )

        return dynamic_report_execution_public(execution)

    def list_my_executions(
        self,
        *,
        limit: int,
        offset: int,
    ) -> tuple[list[DynamicReportExecutionPublic], int]:
        if self.context.user_id is None:
            raise BusinessException("Authenticated user is required.")

        items, total = self.execution_repository.list_by_user(
            requested_by_user_id=self.context.user_id,
            tenant_id=self.context.tenant_id,
            limit=limit,
            offset=offset,
        )

        return [
            dynamic_report_execution_public(item)
            for item in items
        ], total

    def _ensure_can_access_execution(
        self,
        *,
        execution_tenant_id: str | None,
        requested_by_user_id: str,
    ) -> None:
        if self.context.user_id is None:
            raise BusinessException("Authenticated user is required.")

        if self.context.actor_type == "SUPERADMIN":
            return

        if requested_by_user_id != self.context.user_id:
            raise NotFoundException("Report execution not found.")

        if self.context.tenant_id is not None:
            if execution_tenant_id != self.context.tenant_id:
                raise NotFoundException("Report execution not found.")
