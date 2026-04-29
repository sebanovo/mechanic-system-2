export type ApiResponse<TData, TMeta = null> = {
	success: boolean;
	message: string;
	data: TData;
	meta: TMeta;
};

export type CountMetaDto = {
	count: number;
};

export type ClientPaymentMethod = "QR" | "GATEWAY" | "TRANSFER" | "CARD" | "CASH";

export type CheckoutPaymentMethod = Exclude<ClientPaymentMethod, "CASH">;

export type ClientPaymentStatus =
	| "PENDING_PRICING"
	| "ESTIMATED"
	| "PENDING_PAYMENT"
	| "PAID"
	| "CANCELLED"
	| string;

export type ClientIncidentStatus =
	| "PENDING"
	| "IN_REVIEW"
	| "PUBLISHED"
	| "ASSIGNED"
	| "EN_ROUTE"
	| "ON_SITE"
	| "ARRIVED"
	| "IN_PROGRESS"
	| "COMPLETED"
	| "CANCELLED"
	| string;

export type ClientIncidentPriority =
	| "LOW"
	| "MEDIUM"
	| "HIGH"
	| "CRITICAL"
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

	payment_status: ClientPaymentStatus;
	payment_method: ClientPaymentMethod | null;
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

	paymentStatus: ClientPaymentStatus;
	paymentMethod: ClientPaymentMethod | null;
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

export type BillingCheckoutPreviewDto = {
	incident_id: string;
	checkout_reference: string;
	payment_method: CheckoutPaymentMethod;
	payment_provider_name: string;
	amount: number;
	currency_code: string;
	payment_status: ClientPaymentStatus;
	checkout_payload_json: Record<string, unknown> | null;
};

export type BillingCheckoutPreview = {
	incidentId: string;
	checkoutReference: string;
	paymentMethod: CheckoutPaymentMethod;
	paymentProviderName: string;
	amount: number;
	currencyCode: string;
	paymentStatus: ClientPaymentStatus;
	checkoutPayloadJson: Record<string, unknown>;
};

export type ClientCreateCheckoutRequest = {
	payment_method: CheckoutPaymentMethod;
	payment_provider_name: string | null;
	return_url: string | null;
};

export type ClientCreateCheckoutFormValue = {
	paymentMethod: CheckoutPaymentMethod;
	paymentProviderName: string | null;
	returnUrl: string | null;
};

export type ClientSimulatePaymentSuccessRequest = {
	payment_reference: string | null;
};

export type ClientSimulatePaymentFailureRequest = {
	failure_reason: string;
};

export type ClientMarkIncidentPaidRequest = {
	payment_method: ClientPaymentMethod;
	payment_provider_name: string | null;
	payment_reference: string | null;
};

export type ClientMarkIncidentPaidFormValue = {
	paymentMethod: ClientPaymentMethod;
	paymentProviderName: string | null;
	paymentReference: string | null;
};

export type ProviderRatingUserSummaryDto = {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	full_name: string;
};

export type ProviderRatingProviderSummaryDto = {
	id: string;
	business_name: string;
	provider_type: string;
	average_rating: number;
};

export type ProviderRatingTechnicianSummaryDto = {
	id: string;
	full_name: string;
	phone_number: string | null;
};

export type ProviderRatingIncidentSummaryDto = {
	id: string;
	title: string;
	status: string;
	completed_at: string | null;
};

export type ProviderRatingDto = {
	id: string;
	incident_id: string;
	client_user_id: string;
	provider_id: string;
	technician_id: string | null;

	rating_score: number;
	punctuality_score: number | null;
	service_quality_score: number | null;
	communication_score: number | null;
	comment: string | null;
	would_recommend: boolean | null;
	provider_average_after_rating: number | null;

	created_at: string;
	updated_at: string;

	client_user: ProviderRatingUserSummaryDto | null;
	provider: ProviderRatingProviderSummaryDto | null;
	technician: ProviderRatingTechnicianSummaryDto | null;
	incident: ProviderRatingIncidentSummaryDto | null;
};

export type ProviderRating = {
	id: string;
	incidentId: string;
	clientUserId: string;
	providerId: string;
	technicianId: string | null;

	ratingScore: number;
	punctualityScore: number | null;
	serviceQualityScore: number | null;
	communicationScore: number | null;
	comment: string | null;
	wouldRecommend: boolean | null;
	providerAverageAfterRating: number | null;

	createdAt: string;
	updatedAt: string;

	providerName: string | null;
	technicianName: string | null;
	incidentTitle: string | null;
};

export type CreateOrUpdateProviderRatingRequest = {
	rating_score: number;
	punctuality_score: number | null;
	service_quality_score: number | null;
	communication_score: number | null;
	comment: string | null;
	would_recommend: boolean | null;
};

export type RatingFormValue = {
	ratingScore: number;
	punctualityScore: number | null;
	serviceQualityScore: number | null;
	communicationScore: number | null;
	comment: string | null;
	wouldRecommend: boolean | null;
};

export type ClientIncidentDto = {
	id: string;
	status: ClientIncidentStatus;
	priority?: ClientIncidentPriority | null;
	reported_category?: string | null;
	title: string;
	description?: string | null;
	address_reference?: string | null;
	created_at?: string | null;
	updated_at?: string | null;
	completed_at?: string | null;
	provider?: {
		id: string;
		business_name: string;
		provider_type: string;
		average_rating: number;
	} | null;
	assigned_technician?: {
		id: string;
		full_name: string;
		phone_number: string | null;
	} | null;
};

export type ClientIncident = {
	id: string;
	status: ClientIncidentStatus;
	priority: ClientIncidentPriority;
	reportedCategory: string;
	title: string;
	description: string;
	addressReference: string | null;
	createdAt: string | null;
	updatedAt: string | null;
	completedAt: string | null;
	providerId: string | null;
	providerName: string | null;
	providerAverageRating: number | null;
	technicianName: string | null;
};
