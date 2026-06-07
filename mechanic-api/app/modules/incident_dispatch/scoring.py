from __future__ import annotations

from decimal import Decimal, ROUND_HALF_UP

from app.modules.incident_dispatch.schemas import (
    EligibleProviderCandidate,
    ScoredProviderCandidate,
)


def score_provider_candidates(
    candidates: list[EligibleProviderCandidate],
) -> list[ScoredProviderCandidate]:
    scored: list[ScoredProviderCandidate] = []

    for candidate in candidates:
        score = calculate_provider_score(candidate)

        scored.append(
            ScoredProviderCandidate(
                **candidate.model_dump(),
                score=score,
            )
        )

    return sorted(
        scored,
        key=lambda item: item.score,
        reverse=True,
    )


def calculate_provider_score(candidate: EligibleProviderCandidate) -> Decimal:
    availability_score = _availability_score(candidate)
    rating_score = _rating_score(candidate)
    response_score = _response_score(candidate)
    distance_score = _distance_score(candidate)
    acceptance_score = _acceptance_score(candidate)

    total = (
        availability_score * Decimal("0.40")
        + rating_score * Decimal("0.25")
        + response_score * Decimal("0.15")
        + distance_score * Decimal("0.10")
        + acceptance_score * Decimal("0.10")
    )

    return total.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)


def _availability_score(candidate: EligibleProviderCandidate) -> Decimal:
    if candidate.available_technicians_count > 0:
        return Decimal("100")

    if candidate.enabled_technicians_count > 0:
        return Decimal("60")

    return Decimal("0")


def _rating_score(candidate: EligibleProviderCandidate) -> Decimal:
    if candidate.average_rating is None:
        return Decimal("50")

    rating = Decimal(str(candidate.average_rating))

    if rating <= 0:
        return Decimal("0")

    if rating >= 5:
        return Decimal("100")

    return ((rating / Decimal("5")) * Decimal("100")).quantize(
        Decimal("0.01"),
        rounding=ROUND_HALF_UP,
    )


def _response_score(candidate: EligibleProviderCandidate) -> Decimal:
    if candidate.response_score is None:
        return Decimal("50")

    score = Decimal(str(candidate.response_score))

    if score < 0:
        return Decimal("0")

    if score > 100:
        return Decimal("100")

    return score


def _distance_score(candidate: EligibleProviderCandidate) -> Decimal:
    if candidate.distance_km is None:
        return Decimal("50")

    distance = Decimal(str(candidate.distance_km))

    if distance <= 5:
        return Decimal("100")

    if distance <= 10:
        return Decimal("80")

    if distance <= 20:
        return Decimal("60")

    if distance <= 40:
        return Decimal("40")

    return Decimal("20")


def _acceptance_score(candidate: EligibleProviderCandidate) -> Decimal:
    return Decimal("50")
