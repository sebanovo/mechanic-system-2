from __future__ import annotations

from app.modules.dynamic_report.models import DynamicReportExecution
from app.modules.dynamic_report.schemas import DynamicReportExecutionPublic


def dynamic_report_execution_public(
    execution: DynamicReportExecution,
) -> DynamicReportExecutionPublic:
    return DynamicReportExecutionPublic(
        id=str(execution.id),
        requested_by_user_id=str(execution.requested_by_user_id),
        tenant_id=(
            str(execution.tenant_id)
            if execution.tenant_id is not None
            else None
        ),
        report_type=execution.report_type,
        title=execution.title,
        scope=execution.scope,  # type: ignore[arg-type]
        prompt=execution.prompt,
        intent=execution.intent,
        result_metadata=execution.result_metadata,
        row_count=execution.row_count,
        status=execution.status,  # type: ignore[arg-type]
        error_message=execution.error_message,
        executed_at=execution.executed_at,
        created_at=execution.created_at,
        updated_at=execution.updated_at,
    )
