import {
	ClientIncident,
	ClientIncidentDto,
	ClientPlanSubscription,
	ClientPlanSubscriptionDto,
	ClientSubscribeToPlanFormValue,
	ClientSubscribeToPlanRequest,
	IncidentCoveragePreview,
	IncidentCoveragePreviewDto,
	IncidentSubscriptionApplication,
	IncidentSubscriptionApplicationDto,
	ProviderPlan,
	ProviderPlanCoverage,
	ProviderPlanCoverageDto,
	ProviderPlanCoverageFormValue,
	ProviderPlanCoverageUpsertRequest,
	ProviderPlanDto,
	ProviderPlanFormValue,
	ProviderPlanUpsertRequest,
	SubscriptionProviderSummary,
	SubscriptionProviderSummaryDto,
	SubscriptionUserSummary,
	SubscriptionUserSummaryDto,
} from "../models/subscription.types";

export function toSubscriptionUserSummary(
	dto: SubscriptionUserSummaryDto | null
): SubscriptionUserSummary | null {
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

export function toSubscriptionProviderSummary(
	dto: SubscriptionProviderSummaryDto | null
): SubscriptionProviderSummary | null {
	if (!dto) {
		return null;
	}

	return {
		id: dto.id,
		providerType: dto.provider_type,
		businessName: dto.business_name,
		ownerUser: toSubscriptionUserSummary(dto.owner_user),
	};
}

export function toProviderPlanCoverage(
	dto: ProviderPlanCoverageDto
): ProviderPlanCoverage {
	return {
		id: dto.id,
		planId: dto.plan_id,
		serviceCatalogItemId: dto.service_catalog_item_id,
		serviceCatalogItemCode: dto.service_catalog_item_code,
		serviceCatalogItemTitle: dto.service_catalog_item_title,
		incidentCategory: dto.incident_category,
		coverageType: dto.coverage_type,
		coverageValue: dto.coverage_value,
		maxCoverageAmount: dto.max_coverage_amount,
		waitingPeriodDays: dto.waiting_period_days,
		maxApplicationsPerSubscription: dto.max_applications_per_subscription,
		isActive: dto.is_active,
		createdAt: formatDateTime(dto.created_at),
		updatedAt: formatDateTime(dto.updated_at),
	};
}

export function toProviderPlan(dto: ProviderPlanDto): ProviderPlan {
	return {
		id: dto.id,
		providerId: dto.provider_id,
		code: dto.code,
		name: dto.name,
		description: dto.description,
		billingPeriod: dto.billing_period,
		priceAmount: dto.price_amount,
		currencyCode: dto.currency_code,
		isActive: dto.is_active,
		autoRenews: dto.auto_renews,
		createdAt: formatDateTime(dto.created_at),
		updatedAt: formatDateTime(dto.updated_at),
		provider: toSubscriptionProviderSummary(dto.provider),
		coverages: (dto.coverages ?? []).map(toProviderPlanCoverage),
	};
}

export function toProviderPlans(dtos: ProviderPlanDto[]): ProviderPlan[] {
	return dtos.map(toProviderPlan);
}

export function toClientPlanSubscription(
	dto: ClientPlanSubscriptionDto
): ClientPlanSubscription {
	return {
		id: dto.id,
		clientUserId: dto.client_user_id,
		providerId: dto.provider_id,
		planId: dto.plan_id,
		status: dto.status,
		startedAt: formatDateTime(dto.started_at),
		expiresAt: formatDateTime(dto.expires_at),
		cancelledAt: formatDateTimeOrNull(dto.cancelled_at),
		externalReference: dto.external_reference,
		note: dto.note,
		createdAt: formatDateTime(dto.created_at),
		updatedAt: formatDateTime(dto.updated_at),
		provider: toSubscriptionProviderSummary(dto.provider),
		plan: toProviderPlan(dto.plan),
	};
}

export function toClientPlanSubscriptions(
	dtos: ClientPlanSubscriptionDto[]
): ClientPlanSubscription[] {
	return dtos.map(toClientPlanSubscription);
}

export function toIncidentCoveragePreview(
	dto: IncidentCoveragePreviewDto
): IncidentCoveragePreview {
	return {
		incidentId: dto.incident_id,
		billingAmountBasis: dto.billing_amount_basis,
		matchedIncidentCategory: dto.matched_incident_category,
		hasApplicableCoverage: dto.has_applicable_coverage,
		clientPlanSubscriptionId: dto.client_plan_subscription_id,
		planId: dto.plan_id,
		planName: dto.plan_name,
		planCoverageId: dto.plan_coverage_id,
		coverageType: dto.coverage_type,
		coverageValue: dto.coverage_value,
		coverageAppliedAmount: dto.coverage_applied_amount,
		clientPayableAmount: dto.client_payable_amount,
		rationale: dto.rationale ?? {},
	};
}

export function toIncidentSubscriptionApplication(
	dto: IncidentSubscriptionApplicationDto
): IncidentSubscriptionApplication {
	return {
		id: dto.id,
		incidentId: dto.incident_id,
		incidentBillingId: dto.incident_billing_id,
		clientPlanSubscriptionId: dto.client_plan_subscription_id,
		planCoverageId: dto.plan_coverage_id,
		matchedServiceCatalogItemId: dto.matched_service_catalog_item_id,
		matchedIncidentCategory: dto.matched_incident_category,
		coverageType: dto.coverage_type,
		coverageValue: dto.coverage_value,
		originalAmount: dto.original_amount,
		coverageAppliedAmount: dto.coverage_applied_amount,
		clientPayableAmount: dto.client_payable_amount,
		status: dto.status,
		snapshotJson: dto.snapshot_json ?? {},
		appliedAt: formatDateTime(dto.applied_at),
		updatedAt: formatDateTime(dto.updated_at),
	};
}

export function toIncidentSubscriptionApplications(
	dtos: IncidentSubscriptionApplicationDto[]
): IncidentSubscriptionApplication[] {
	return dtos.map(toIncidentSubscriptionApplication);
}

export function toClientIncident(dto: ClientIncidentDto): ClientIncident {
	return {
		id: dto.id,
		status: dto.status,
		title: dto.title,
		providerId: dto.provider?.id ?? null,
		providerName: dto.provider?.business_name ?? null,
	};
}

export function toClientIncidents(dtos: ClientIncidentDto[]): ClientIncident[] {
	return dtos.map(toClientIncident);
}

export function toProviderPlanUpsertRequest(
	formValue: ProviderPlanFormValue
): ProviderPlanUpsertRequest {
	return {
		code: formValue.code.trim().toUpperCase(),
		name: formValue.name.trim(),
		description: cleanOptional(formValue.description),
		billing_period: formValue.billingPeriod,
		price_amount: Number(formValue.priceAmount),
		currency_code: formValue.currencyCode.trim().toUpperCase() || "BOB",
		is_active: formValue.isActive,
		auto_renews: formValue.autoRenews,
	};
}

export function toProviderPlanCoverageUpsertRequest(
	formValue: ProviderPlanCoverageFormValue
): ProviderPlanCoverageUpsertRequest {
	return {
		coverage_id: cleanOptional(formValue.coverageId),
		service_catalog_item_id: cleanOptional(formValue.serviceCatalogItemId),
		incident_category: formValue.incidentCategory,
		coverage_type: formValue.coverageType,
		coverage_value: Number(formValue.coverageValue),
		max_coverage_amount: normalizeNullableNumber(formValue.maxCoverageAmount),
		waiting_period_days: Number(formValue.waitingPeriodDays),
		max_applications_per_subscription: normalizeNullableNumber(
			formValue.maxApplicationsPerSubscription
		),
		is_active: formValue.isActive,
	};
}

export function toClientSubscribeToPlanRequest(
	formValue: ClientSubscribeToPlanFormValue
): ClientSubscribeToPlanRequest {
	return {
		external_reference: cleanOptional(formValue.externalReference),
		note: cleanOptional(formValue.note),
	};
}

export function jsonToText(value: Record<string, unknown>): string {
	return JSON.stringify(value ?? {}, null, 2);
}

function cleanOptional(value: string | null | undefined): string | null {
	const cleanedValue = value?.trim();

	return cleanedValue ? cleanedValue : null;
}

function normalizeNullableNumber(value: number | null | undefined): number | null {
	if (value === null || value === undefined) {
		return null;
	}

	const normalized = Number(value);

	if (!Number.isFinite(normalized) || normalized <= 0) {
		return null;
	}

	return normalized;
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
