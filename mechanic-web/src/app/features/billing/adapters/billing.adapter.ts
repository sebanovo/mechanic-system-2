import {
	BillingProviderSummary,
	BillingProviderSummaryDto,
	BillingUserSummary,
	BillingUserSummaryDto,
	IncidentBilling,
	IncidentBillingDto,
	ProviderEstimateIncidentPricingRequest,
	ProviderEstimatePricingFormValue,
	ProviderFinalizeIncidentPricingRequest,
	ProviderFinalizePricingFormValue,
	ProviderIncident,
	ProviderIncidentDto,
} from "../models/billing.types";

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

export function toProviderIncident(dto: ProviderIncidentDto): ProviderIncident {
	return {
		id: dto.id,
		status: dto.status,
		priority: dto.priority ?? "UNKNOWN",
		reportedCategory: dto.reported_category ?? "UNKNOWN",
		title: dto.title,
		description: dto.description ?? "",
		addressReference: dto.address_reference ?? null,
		createdAt: formatDateTimeOrNull(dto.created_at ?? null),
		updatedAt: formatDateTimeOrNull(dto.updated_at ?? null),
		completedAt: formatDateTimeOrNull(dto.completed_at ?? null),
		clientUser: toBillingUserSummary(dto.client_user),
	};
}

export function toProviderIncidents(
	dtos: ProviderIncidentDto[]
): ProviderIncident[] {
	return dtos.map(toProviderIncident);
}

export function toEstimatePricingRequest(
	formValue: ProviderEstimatePricingFormValue
): ProviderEstimateIncidentPricingRequest {
	return {
		estimated_price_min: normalizeNullableNumber(formValue.estimatedPriceMin),
		estimated_price_max: normalizeNullableNumber(formValue.estimatedPriceMax),
		note: cleanOptional(formValue.note),
	};
}

export function toFinalizePricingRequest(
	formValue: ProviderFinalizePricingFormValue
): ProviderFinalizeIncidentPricingRequest {
	return {
		final_price_amount: Number(formValue.finalPriceAmount),
		payment_method: formValue.paymentMethod,
		mark_as_paid: formValue.markAsPaid,
		payment_reference: cleanOptional(formValue.paymentReference),
		note: cleanOptional(formValue.note),
	};
}

function cleanOptional(value: string | null | undefined): string | null {
	const cleanedValue = value?.trim();

	return cleanedValue ? cleanedValue : null;
}

function normalizeNullableNumber(value: number | null | undefined): number | null {
	if (value === null || value === undefined) {
		return null;
	}

	const numberValue = Number(value);

	if (!Number.isFinite(numberValue) || numberValue === 0) {
		return null;
	}

	return numberValue;
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
