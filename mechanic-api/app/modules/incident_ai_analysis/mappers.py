from __future__ import annotations

from app.modules.incident_ai_analysis.models import IncidentAiAnalysis
from app.modules.incident_ai_analysis.schemas import IncidentAiAnalysisPublic


def incident_ai_analysis_public(
    analysis: IncidentAiAnalysis,
) -> IncidentAiAnalysisPublic:
    return IncidentAiAnalysisPublic(
        id=str(analysis.id),
        incident_id=str(analysis.incident_id),
        analysis_version=analysis.analysis_version,
        probable_service_code=analysis.probable_service_code,
        probable_problem=analysis.probable_problem,
        confidence_score=analysis.confidence_score,
        estimated_min_price=analysis.estimated_min_price,
        estimated_max_price=analysis.estimated_max_price,
        estimated_min_duration_minutes=analysis.estimated_min_duration_minutes,
        estimated_max_duration_minutes=analysis.estimated_max_duration_minutes,
        recommended_priority=analysis.recommended_priority,  # type: ignore[arg-type]
        analysis_result=analysis.analysis_result,
        created_at=analysis.created_at,
        updated_at=analysis.updated_at,
    )