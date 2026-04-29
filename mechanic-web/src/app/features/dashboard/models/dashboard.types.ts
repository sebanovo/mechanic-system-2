export type ApiResponse<TData, TMeta = null> = {
	success: boolean;
	message: string;
	data: TData;
	meta: TMeta;
};

export type PlatformMetricsDto = {
	incidents_by_status: Record<string, number>;
	background_jobs_by_status: Record<string, number>;
	push_deliveries_by_status: Record<string, number>;
	providers: Record<string, unknown>;
	technicians: Record<string, unknown>;
	financial: Record<string, unknown>;
	subscriptions_by_status: Record<string, number>;
	average_assignment_seconds: number | null;
	average_completion_seconds: number | null;
	audit_events_last_24h: number;
	timestamp: string;
};

export type PlatformMetrics = {
	incidentsByStatus: Record<string, number>;
	backgroundJobsByStatus: Record<string, number>;
	pushDeliveriesByStatus: Record<string, number>;

	totalProviders: number;
	activeProviders: number;
	availableProviders: number;

	totalTechnicians: number;
	activeTechnicians: number;
	availableTechnicians: number;

	totalServiceValue: number;
	totalPaidValue: number;
	totalPlatformCommission: number;
	totalProviderNetAmount: number;
	totalClientPayableAmount: number;

	subscriptionsByStatus: Record<string, number>;
	averageAssignmentSeconds: number | null;
	averageCompletionSeconds: number | null;
	auditEventsLast24h: number;
	timestamp: string;
};

export type ProviderProfileDto = {
	id: string;
	provider_type: string;
	business_name: string;
	legal_name: string | null;
	description: string | null;
	contact_email: string | null;
	contact_phone: string | null;
	city: string | null;
	address: string | null;
	is_active: boolean;
	is_available: boolean;
	max_concurrent_services: number;
	current_active_services: number;
	available_capacity: number;
	average_rating: number;
	technicians_count: number;
	available_technicians_count: number;
	configured_services_count: number;
	active_services_count: number;
	created_at: string;
	updated_at: string;
};

export type ProviderCandidateDto = {
	id: string;
	status: string;
	score: number;
	distance_km: number | null;
	incident: {
		id: string;
		status: string;
		priority: string;
		title: string;
		reported_category: string;
	};
};

export type ProviderOperationDto = {
	incident_id: string;
	status: string;
	priority: string;
	title: string;
	reported_category: string;
	assigned_at: string | null;
	en_route_at: string | null;
	arrived_at: string | null;
	started_at: string | null;
	assigned_technician?: {
		id: string;
		full_name: string;
		specialty: string | null;
	} | null;
};

export type ProviderServiceDto = {
	id: string;
	service_code: string;
	service_category: string;
	effective_title: string;
	price_estimate_min: number | null;
	price_estimate_max: number | null;
	is_mobile_service_enabled: boolean;
	is_emergency_service_enabled: boolean;
	is_active: boolean;
};

export type ProviderIncidentDto = {
	id: string;
	status: string;
	priority?: string | null;
	reported_category?: string | null;
	title: string;
	created_at?: string | null;
	completed_at?: string | null;
};

export type CountMetaDto = {
	count: number;
};

export type ProviderDashboardSummary = {
	profile: ProviderProfileDto | null;
	availableCandidatesCount: number;
	activeOperationsCount: number;
	configuredServicesCount: number;
	activeServicesCount: number;
	totalIncidentsCount: number;
	completedIncidentsCount: number;
	incidentsByStatus: Record<string, number>;
	recentCandidates: ProviderCandidateDto[];
	activeOperations: ProviderOperationDto[];
	activeServices: ProviderServiceDto[];
};

export type DashboardMode = "platform" | "provider" | "basic";
