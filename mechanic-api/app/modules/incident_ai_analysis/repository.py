from __future__ import annotations

from uuid import UUID

from sqlalchemy import Select, func, select
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.modules.incident_ai_analysis.models import IncidentAiAnalysis


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class IncidentAiAnalysisRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(
        self,
        analysis_id: str | UUID,
    ) -> IncidentAiAnalysis | None:
        return self.db.get(
            IncidentAiAnalysis,
            _to_uuid(analysis_id, "incident_ai_analysis_id"),
        )

    def list_by_incident(
        self,
        incident_id: str | UUID,
        *,
        analysis_version: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[IncidentAiAnalysis], int]:
        query = select(IncidentAiAnalysis).where(
            IncidentAiAnalysis.incident_id == _to_uuid(incident_id, "incident_id")
        )

        if analysis_version is not None:
            normalized_version = analysis_version.strip()
            if normalized_version:
                query = query.where(
                    IncidentAiAnalysis.analysis_version == normalized_version
                )

        return self._paginate(
            query.order_by(IncidentAiAnalysis.created_at.desc()),
            limit,
            offset,
        )

    def list(
        self,
        *,
        incident_id: str | UUID | None = None,
        analysis_version: str | None = None,
        probable_service_code: str | None = None,
        recommended_priority: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[IncidentAiAnalysis], int]:
        query = select(IncidentAiAnalysis)

        if incident_id is not None:
            query = query.where(
                IncidentAiAnalysis.incident_id == _to_uuid(
                    incident_id,
                    "incident_id",
                )
            )

        if analysis_version is not None:
            normalized_version = analysis_version.strip()
            if normalized_version:
                query = query.where(
                    IncidentAiAnalysis.analysis_version == normalized_version
                )

        if probable_service_code is not None:
            normalized_code = probable_service_code.strip().upper()
            if normalized_code:
                query = query.where(
                    IncidentAiAnalysis.probable_service_code == normalized_code
                )

        if recommended_priority is not None:
            normalized_priority = recommended_priority.strip().upper()
            if normalized_priority:
                query = query.where(
                    IncidentAiAnalysis.recommended_priority == normalized_priority
                )

        return self._paginate(
            query.order_by(IncidentAiAnalysis.created_at.desc()),
            limit,
            offset,
        )

    def add(self, analysis: IncidentAiAnalysis) -> IncidentAiAnalysis:
        self.db.add(analysis)
        self.db.flush()
        return analysis

    def _paginate(
        self,
        query: Select[tuple[IncidentAiAnalysis]],
        limit: int,
        offset: int,
    ) -> tuple[list[IncidentAiAnalysis], int]:
        total = self.db.scalar(select(func.count()).select_from(query.subquery()))
        items = list(self.db.scalars(query.offset(offset).limit(limit)))
        return items, int(total or 0)