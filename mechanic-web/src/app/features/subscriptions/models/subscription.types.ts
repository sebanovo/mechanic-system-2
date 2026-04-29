export type ApiResponse<TData, TMeta = null> = {
	success: boolean;
	message: string;
	data: TData;
	meta: TMeta;
};

export type CountMetaDto = {
	count: number;
	include_inactive?: boolean;
};

export type BillingPeriod = "MONTHLY" | "ANNUAL";

export type CoverageType = "FULL" | "PERCENTAGE" | "FIXED_AMOUNT";

export type IncidentCategory =
	| "BATTERY"
	| "TIRE"
	| "ACCIDENT"
	| "ENGINE"
	| "LOCKOUT"
	| "OVERHEATING"
	| "OTHER"
	| "UNCERTAIN";

export type SubscriptionStatus = "ACTIVE" | "CANCELLED" | "EXPIRED" | string;

export type ProviderPlanUpsertRequest = {
	code: string;
	name: string;
	description: string | null;
	billing_period: BillingPeriod;
	price_amount: number;
	currency_code: string;
	is_active: boolean;
	auto_renews: boolean;
};

export type ProviderPlanFormValue = {
	code: string;
	name: string;
	description: string | null;
	billingPeriod: BillingPeriod;
	priceAmount: number;
	currencyCode: string;
	isActive: boolean;
	autoRenews: boolean;
};

export type ProviderPlanCoverageUpsertRequest = {
	coverage_id: string | null;
	service_catalog_item_id: string | null;
	incident_category: IncidentCategory | null;
	coverage_type: CoverageType;
	coverage_value: number;
	max_coverage_amount: number | null;
	waiting_period_days: number;
	max_applications_per_subscription: number | null;
	is_active: boolean;
};

export type ProviderPlanCoverageFormValue = {
	planId: string;
	coverageId: string | null;
	serviceCatalogItemId: string | null;
	incidentCategory: IncidentCategory | null;
	coverageType: CoverageType;
	coverageValue: number;
	maxCoverageAmount: number | null;
	waitingPeriodDays: number;
	maxApplicationsPerSubscription: number | null;
	isActive: boolean;
};

export type ClientSubscribeToPlanRequest = {
	external_reference: string | null;
	note: string | null;
};

export type ClientSubscribeToPlanFormValue = {
	externalReference: string | null;
	note: string | null;
};

export type SubscriptionUserSummaryDto = {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	full_name: string;
	phone_number: string | null;
};

export type SubscriptionProviderSummaryDto = {
	id: string;
	provider_type: string;
	business_name: string;
	owner_user: SubscriptionUserSummaryDto | null;
};

export type ProviderPlanCoverageDto = {
	id: string;
	plan_id: string;
	service_catalog_item_id: string | null;
	service_catalog_item_code: string | null;
	service_catalog_item_title: string | null;
	incident_category: string | null;
	coverage_type: CoverageType | string;
	coverage_value: number;
	max_coverage_amount: number | null;
	waiting_period_days: number;
	max_applications_per_subscription: number | null;
	is_active: boolean;
	created_at: string;
	updated_at: string;
};

export type ProviderPlanDto = {
	id: string;
	provider_id: string;
	code: string;
	name: string;
	description: string | null;
	billing_period: BillingPeriod | string;
	price_amount: number;
	currency_code: string;
	is_active: boolean;
	auto_renews: boolean;
	created_at: string;
	updated_at: string;
	provider: SubscriptionProviderSummaryDto | null;
	coverages: ProviderPlanCoverageDto[];
};

export type ClientPlanSubscriptionDto = {
	id: string;
	client_user_id: string;
	provider_id: string;
	plan_id: string;
	status: SubscriptionStatus;
	started_at: string;
	expires_at: string;
	cancelled_at: string | null;
	external_reference: string | null;
	note: string | null;
	created_at: string;
	updated_at: string;
	provider: SubscriptionProviderSummaryDto | null;
	plan: ProviderPlanDto;
};

export type IncidentCoveragePreviewDto = {
	incident_id: string;
	billing_amount_basis: number;
	matched_incident_category: string;
	has_applicable_coverage: boolean;
	client_plan_subscription_id: string | null;
	plan_id: string | null;
	plan_name: string | null;
	plan_coverage_id: string | null;
	coverage_type: CoverageType | string | null;
	coverage_value: number | null;
	coverage_applied_amount: number | null;
	client_payable_amount: number | null;
	rationale: Record<string, unknown> | null;
};

export type IncidentSubscriptionApplicationDto = {
	id: string;
	incident_id: string;
	incident_billing_id: string | null;
	client_plan_subscription_id: string;
	plan_coverage_id: string;
	matched_service_catalog_item_id: string | null;
	matched_incident_category: string | null;
	coverage_type: CoverageType | string;
	coverage_value: number;
	original_amount: number;
	coverage_applied_amount: number;
	client_payable_amount: number;
	status: string;
	snapshot_json: Record<string, unknown> | null;
	applied_at: string;
	updated_at: string;
};

export type ClientIncidentDto = {
	id: string;
	status: string;
	title: string;
	provider?: {
		id: string;
		business_name: string;
	} | null;
};

export type SubscriptionUserSummary = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	fullName: string;
	phoneNumber: string | null;
};

export type SubscriptionProviderSummary = {
	id: string;
	providerType: string;
	businessName: string;
	ownerUser: SubscriptionUserSummary | null;
};

export type ProviderPlanCoverage = {
	id: string;
	planId: string;
	serviceCatalogItemId: string | null;
	serviceCatalogItemCode: string | null;
	serviceCatalogItemTitle: string | null;
	incidentCategory: string | null;
	coverageType: string;
	coverageValue: number;
	maxCoverageAmount: number | null;
	waitingPeriodDays: number;
	maxApplicationsPerSubscription: number | null;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};

export type ProviderPlan = {
	id: string;
	providerId: string;
	code: string;
	name: string;
	description: string | null;
	billingPeriod: string;
	priceAmount: number;
	currencyCode: string;
	isActive: boolean;
	autoRenews: boolean;
	createdAt: string;
	updatedAt: string;
	provider: SubscriptionProviderSummary | null;
	coverages: ProviderPlanCoverage[];
};

export type ClientPlanSubscription = {
	id: string;
	clientUserId: string;
	providerId: string;
	planId: string;
	status: SubscriptionStatus;
	startedAt: string;
	expiresAt: string;
	cancelledAt: string | null;
	externalReference: string | null;
	note: string | null;
	createdAt: string;
	updatedAt: string;
	provider: SubscriptionProviderSummary | null;
	plan: ProviderPlan;
};

export type IncidentCoveragePreview = {
	incidentId: string;
	billingAmountBasis: number;
	matchedIncidentCategory: string;
	hasApplicableCoverage: boolean;
	clientPlanSubscriptionId: string | null;
	planId: string | null;
	planName: string | null;
	planCoverageId: string | null;
	coverageType: string | null;
	coverageValue: number | null;
	coverageAppliedAmount: number | null;
	clientPayableAmount: number | null;
	rationale: Record<string, unknown>;
};

export type IncidentSubscriptionApplication = {
	id: string;
	incidentId: string;
	incidentBillingId: string | null;
	clientPlanSubscriptionId: string;
	planCoverageId: string;
	matchedServiceCatalogItemId: string | null;
	matchedIncidentCategory: string | null;
	coverageType: string;
	coverageValue: number;
	originalAmount: number;
	coverageAppliedAmount: number;
	clientPayableAmount: number;
	status: string;
	snapshotJson: Record<string, unknown>;
	appliedAt: string;
	updatedAt: string;
};

export type ClientIncident = {
	id: string;
	status: string;
	title: string;
	providerId: string | null;
	providerName: string | null;
};

export type SubscriptionMode = "provider" | "client" | "platform" | "basic";
