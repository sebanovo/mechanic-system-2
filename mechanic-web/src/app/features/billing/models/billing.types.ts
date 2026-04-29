export type BillingPaymentMethod =
	| "CASH"
	| "QR"
	| "GATEWAY"
	| "TRANSFER"
	| "CARD";

export type BillingPaymentStatus =
	| "PENDING_PRICING"
	| "ESTIMATED"
	| "PENDING_PAYMENT"
	| "PAID"
	| "CANCELLED"
	| string;

export type BillingIncidentStatus =
	| "PENDING"
	| "PUBLISHED"
	| "ASSIGNED"
	| "EN_ROUTE"
	| "ON_SITE"
	| "ARRIVED"
	| "IN_PROGRESS"
	| "COMPLETED"
	| "CANCELLED"
	| string;

export type BillingPriority =
	| "LOW"
	| "MEDIUM"
	| "HIGH"
	| "CRITICAL"
	| "URGENT"
	| "UNKNOWN"
	| string;

export type BillingUserSummaryDto = {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	full_name: string;
	phone_number: string | null;
};

export type BillingProviderSummaryDto = {
	id: string;
	provider_type: string;
	business_name: string;
	owner_user: BillingUserSummaryDto | null;
};

export type IncidentBillingDto = {
	id: string;
	incident_id: string;
	client_user_id: string | null;
	provider_id: string | null;

	currency_code: string;

	estimated_price_min: number | null;
	estimated_price_max: number | null;
	final_price_amount: number | null;

	platform_commission_rate: number;
	platform_commission_amount: number | null;
	provider_gross_amount: number | null;
	provider_net_amount: number | null;

	client_plan_subscription_id: string | null;
	plan_coverage_id: string | null;
	coverage_applied_amount: number | null;
	client_payable_amount: number | null;

	payment_status: BillingPaymentStatus;
	payment_method: BillingPaymentMethod | null;
	payment_provider_name: string | null;
	payment_reference: string | null;

	checkout_reference: string | null;
	checkout_payload_json: Record<string, unknown> | null;

	pricing_note: string | null;
	pricing_finalized_at: string | null;
	payment_completed_at: string | null;
	cancelled_at: string | null;

	created_at: string;
	updated_at: string;

	provider: BillingProviderSummaryDto | null;
	client_user: BillingUserSummaryDto | null;
};

export type BillingCheckoutPreviewDto = {
	incident_id: string;
	checkout_reference: string;
	payment_method: BillingPaymentMethod;
	payment_provider_name: string;
	amount: number;
	currency_code: string;
	payment_status: BillingPaymentStatus;
	checkout_payload_json: Record<string, unknown> | null;
};

export type ProviderEstimateIncidentPricingRequest = {
	estimated_price_min: number | null;
	estimated_price_max: number | null;
	note: string | null;
};

export type ProviderFinalizeIncidentPricingRequest = {
	final_price_amount: number;
	payment_method: BillingPaymentMethod | null;
	mark_as_paid: boolean;
	payment_reference: string | null;
	note: string | null;
};

export type ProviderEstimatePricingFormValue = {
	estimatedPriceMin: number | null;
	estimatedPriceMax: number | null;
	note: string | null;
};

export type ProviderFinalizePricingFormValue = {
	finalPriceAmount: number;
	paymentMethod: BillingPaymentMethod | null;
	markAsPaid: boolean;
	paymentReference: string | null;
	note: string | null;
};

export type BillingUserSummary = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	fullName: string;
	phoneNumber: string | null;
};

export type BillingProviderSummary = {
	id: string;
	providerType: string;
	businessName: string;
	ownerUser: BillingUserSummary | null;
};

export type IncidentBilling = {
	id: string;
	incidentId: string;
	clientUserId: string | null;
	providerId: string | null;

	currencyCode: string;

	estimatedPriceMin: number | null;
	estimatedPriceMax: number | null;
	finalPriceAmount: number | null;

	platformCommissionRate: number;
	platformCommissionAmount: number | null;
	providerGrossAmount: number | null;
	providerNetAmount: number | null;

	clientPlanSubscriptionId: string | null;
	planCoverageId: string | null;
	coverageAppliedAmount: number | null;
	clientPayableAmount: number | null;

	paymentStatus: BillingPaymentStatus;
	paymentMethod: BillingPaymentMethod | null;
	paymentProviderName: string | null;
	paymentReference: string | null;

	checkoutReference: string | null;
	checkoutPayloadJson: Record<string, unknown>;

	pricingNote: string | null;
	pricingFinalizedAt: string | null;
	paymentCompletedAt: string | null;
	cancelledAt: string | null;

	createdAt: string;
	updatedAt: string;

	provider: BillingProviderSummary | null;
	clientUser: BillingUserSummary | null;
};

export type ProviderIncidentDto = {
	id: string;
	status: BillingIncidentStatus;
	priority?: BillingPriority | null;
	reported_category?: string | null;
	title: string;
	description?: string | null;
	address_reference?: string | null;
	created_at?: string | null;
	updated_at?: string | null;
	completed_at?: string | null;
	client_user?: BillingUserSummaryDto | null;
};

export type ProviderIncident = {
	id: string;
	status: BillingIncidentStatus;
	priority: BillingPriority;
	reportedCategory: string;
	title: string;
	description: string;
	addressReference: string | null;
	createdAt: string | null;
	updatedAt: string | null;
	completedAt: string | null;
	clientUser: BillingUserSummary | null;
};

export type ApiResponse<TData, TMeta = null> = {
	success: boolean;
	message: string;
	data: TData;
	meta: TMeta;
};

export type CountMetaDto = {
	count: number;
};
