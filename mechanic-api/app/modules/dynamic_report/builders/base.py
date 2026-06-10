from __future__ import annotations

from abc import ABC
from abc import abstractmethod

from sqlalchemy.orm import Session

from app.core.context import RequestContext
from app.modules.dynamic_report.schemas import (
    DynamicReportIntent,
    DynamicReportResult,
    DynamicReportScope,
)


class DynamicReportBuilder(ABC):
    def __init__(
        self,
        db: Session,
        context: RequestContext,
    ) -> None:
        self.db = db
        self.context = context

    @abstractmethod
    def build(
        self,
        *,
        intent: DynamicReportIntent,
        scope: DynamicReportScope,
    ) -> DynamicReportResult:
        raise NotImplementedError
