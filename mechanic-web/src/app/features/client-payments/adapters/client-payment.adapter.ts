import {
	BillingCheckoutPreview,
	BillingCheckoutPreviewDto,
	BillingProviderSummary,
	BillingProviderSummaryDto,
	BillingUserSummary,
	BillingUserSummaryDto,
	ClientCreateCheckoutFormValue,
	ClientCreateCheckoutRequest,
	ClientIncident,
	ClientIncidentDto,
	ClientMarkIncidentPaidFormValue,
	ClientMarkIncidentPaidRequest,
	ClientSimulatePaymentFailureRequest,
	ClientSimulatePaymentSuccessRequest,
	CreateOrUpdateProviderRatingRequest,
	IncidentBilling,
	IncidentBillingDto,
	ProviderRating,
	ProviderRatingDto,
	RatingFormValue,
} from "../models/client-payment.types";

export function toBillingUserSummary(
	dto: BillingUserSummaryDto | null | undefined
): BillingUserSummary | null {
	if (!dto) {
		return null;
	}

	return {
		id: dto.id,
		email: dto.email,
		firstName: dto.first_name,
		lastName: dto.last_name,
		fullName: dto.full_name,
		phoneNumber: dto.phone_number,
	};
}

export function toBillingProviderSummary(
	dto: BillingProviderSummaryDto | null | undefined
): BillingProviderSummary | null {
	if (!dto) {
		return null;
	}

	return {
		id: dto.id,
		providerType: dto.provider_type,
		businessName: dto.business_name,
		ownerUser: toBillingUserSummary(dto.owner_user),
	};
}

export function toIncidentBilling(dto: IncidentBillingDto): IncidentBilling {
	return {
		id: dto.id,
		incidentId: dto.incident_id,
		clientUserId: dto.client_user_id,
		providerId: dto.provider_id,

		currencyCode: dto.currency_code,

		estimatedPriceMin: dto.estimated_price_min,
		estimatedPriceMax: dto.estimated_price_max,
		finalPriceAmount: dto.final_price_amount,

		platformCommissionRate: dto.platform_commission_rate,
		platformCommissionAmount: dto.platform_commission_amount,
		providerGrossAmount: dto.provider_gross_amount,
		providerNetAmount: dto.provider_net_amount,

		clientPlanSubscriptionId: dto.client_plan_subscription_id,
		planCoverageId: dto.plan_coverage_id,
		coverageAppliedAmount: dto.coverage_applied_amount,
		clientPayableAmount: dto.client_payable_amount,

		paymentStatus: dto.payment_status,
		paymentMethod: dto.payment_method,
		paymentProviderName: dto.payment_provider_name,
		paymentReference: dto.payment_reference,

		checkoutReference: dto.checkout_reference,
		checkoutPayloadJson: dto.checkout_payload_json ?? {},

		pricingNote: dto.pricing_note,
		pricingFinalizedAt: formatDateTimeOrNull(dto.pricing_finalized_at),
		paymentCompletedAt: formatDateTimeOrNull(dto.payment_completed_at),
		cancelledAt: formatDateTimeOrNull(dto.cancelled_at),

		createdAt: formatDateTime(dto.created_at),
		updatedAt: formatDateTime(dto.updated_at),

		provider: toBillingProviderSummary(dto.provider),
		clientUser: toBillingUserSummary(dto.client_user),
	};
}

export function toBillingCheckoutPreview(
	dto: BillingCheckoutPreviewDto
): BillingCheckoutPreview {
	return {
		incidentId: dto.incident_id,
		checkoutReference: dto.checkout_reference,
		paymentMethod: dto.payment_method,
		paymentProviderName: dto.payment_provider_name,
		amount: dto.amount,
		currencyCode: dto.currency_code,
		paymentStatus: dto.payment_status,
		checkoutPayloadJson: dto.checkout_payload_json ?? {},
	};
}

export function toCreateCheckoutRequest(
	formValue: ClientCreateCheckoutFormValue
): ClientCreateCheckoutRequest {
	return {
		payment_method: formValue.paymentMethod,
		payment_provider_name: cleanOptional(formValue.paymentProviderName),
		return_url: cleanOptional(formValue.returnUrl),
	};
}

export function toSimulatePaymentSuccessRequest(
	paymentReference: string | null
): ClientSimulatePaymentSuccessRequest {
	return {
		payment_reference: cleanOptional(paymentReference),
	};
}

export function toSimulatePaymentFailureRequest(
	failureReason: string
): ClientSimulatePaymentFailureRequest {
	return {
		failure_reason: failureReason.trim() || "Pago rechazado en demo.",
	};
}

export function toMarkIncidentPaidRequest(
	formValue: ClientMarkIncidentPaidFormValue
): ClientMarkIncidentPaidRequest {
	return {
		payment_method: formValue.paymentMethod,
		payment_provider_name: cleanOptional(formValue.paymentProviderName),
		payment_reference: cleanOptional(formValue.paymentReference),
	};
}

export function toProviderRating(dto: ProviderRatingDto): ProviderRating {
	return {
		id: dto.id,
		incidentId: dto.incident_id,
		clientUserId: dto.client_user_id,
		providerId: dto.provider_id,
		technicianId: dto.technician_id,

		ratingScore: dto.rating_score,
		punctualityScore: dto.punctuality_score,
		serviceQualityScore: dto.service_quality_score,
		communicationScore: dto.communication_score,
		comment: dto.comment,
		wouldRecommend: dto.would_recommend,
		providerAverageAfterRating: dto.provider_average_after_rating,

		createdAt: formatDateTime(dto.created_at),
		updatedAt: formatDateTime(dto.updated_at),

		providerName: dto.provider?.business_name ?? null,
		technicianName: dto.technician?.full_name ?? null,
		incidentTitle: dto.incident?.title ?? null,
	};
}

export function toRatingRequest(
	formValue: RatingFormValue
): CreateOrUpdateProviderRatingRequest {
	return {
		rating_score: Number(formValue.ratingScore),
		punctuality_score: normalizeOptionalScore(formValue.punctualityScore),
		service_quality_score: normalizeOptionalScore(formValue.serviceQualityScore),
		communication_score: normalizeOptionalScore(formValue.communicationScore),
		comment: cleanOptional(formValue.comment),
		would_recommend: formValue.wouldRecommend,
	};
}

export function toClientIncident(dto: ClientIncidentDto): ClientIncident {
	return {
		id: dto.id,
		status: dto.status,
		priority: dto.priority ?? "MEDIUM",
		reportedCategory: dto.reported_category ?? "UNKNOWN",
		title: dto.title,
		description: dto.description ?? "",
		addressReference: dto.address_reference ?? null,
		createdAt: formatDateTimeOrNull(dto.created_at ?? null),
		updatedAt: formatDateTimeOrNull(dto.updated_at ?? null),
		completedAt: formatDateTimeOrNull(dto.completed_at ?? null),
		providerId: dto.provider?.id ?? null,
		providerName: dto.provider?.business_name ?? null,
		providerAverageRating: dto.provider?.average_rating ?? null,
		technicianName: dto.assigned_technician?.full_name ?? null,
	};
}

export function toClientIncidents(dtos: ClientIncidentDto[]): ClientIncident[] {
	return dtos.map(toClientIncident);
}

function normalizeOptionalScore(value: number | null | undefined): number | null {
	if (value === null || value === undefined) {
		return null;
	}

	const normalized = Number(value);

	if (!Number.isFinite(normalized) || normalized <= 0) {
		return null;
	}

	return normalized;
}

function cleanOptional(value: string | null | undefined): string | null {
	const cleanedValue = value?.trim();

	return cleanedValue ? cleanedValue : null;
}

function formatDateTimeOrNull(value: string | null): string | null {
	if (!value) {
		return null;
	}

	return formatDateTime(value);
}

function formatDateTime(value: string): string {
	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return value;
	}

	return date.toLocaleString("es-BO", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	});
}
