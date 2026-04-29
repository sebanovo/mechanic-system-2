import {
	PlatformMetrics,
	PlatformMetricsDto,
	ProviderCandidateDto,
	ProviderDashboardSummary,
	ProviderIncidentDto,
	ProviderOperationDto,
	ProviderProfileDto,
	ProviderServiceDto,
} from "../models/dashboard.types";

export function toPlatformMetrics(dto: PlatformMetricsDto): PlatformMetrics {
	return {
		incidentsByStatus: dto.incidents_by_status ?? {},
		backgroundJobsByStatus: dto.background_jobs_by_status ?? {},
		pushDeliveriesByStatus: dto.push_deliveries_by_status ?? {},

		totalProviders: getNumber(dto.providers, ["total", "total_providers", "count"]),
		activeProviders: getNumber(dto.providers, ["active", "active_providers"]),
		availableProviders: getNumber(dto.providers, [
			"available",
			"available_providers",
		]),

		totalTechnicians: getNumber(dto.technicians, [
			"total",
			"total_technicians",
			"count",
		]),
		activeTechnicians: getNumber(dto.technicians, [
			"active",
			"active_technicians",
		]),
		availableTechnicians: getNumber(dto.technicians, [
			"available",
			"available_technicians",
		]),

		totalServiceValue: getNumber(dto.financial, ["total_service_value"]),
		totalPaidValue: getNumber(dto.financial, ["total_paid_value"]),
		totalPlatformCommission: getNumber(dto.financial, [
			"total_platform_commission",
		]),
		totalProviderNetAmount: getNumber(dto.financial, [
			"total_provider_net_amount",
		]),
		totalClientPayableAmount: getNumber(dto.financial, [
			"total_client_payable_amount",
		]),

		subscriptionsByStatus: dto.subscriptions_by_status ?? {},
		averageAssignmentSeconds: dto.average_assignment_seconds,
		averageCompletionSeconds: dto.average_completion_seconds,
		auditEventsLast24h: dto.audit_events_last_24h,
		timestamp: formatDateTime(dto.timestamp),
	};
}

export function buildProviderDashboardSummary(params: {
	profile: ProviderProfileDto | null;
	candidates: ProviderCandidateDto[];
	operations: ProviderOperationDto[];
	services: ProviderServiceDto[];
	incidents: ProviderIncidentDto[];
}): ProviderDashboardSummary {
	return {
		profile: params.profile,
		availableCandidatesCount: params.candidates.length,
		activeOperationsCount: params.operations.length,
		configuredServicesCount: params.services.length,
		activeServicesCount: params.services.filter(service => service.is_active).length,
		totalIncidentsCount: params.incidents.length,
		completedIncidentsCount: params.incidents.filter(
			incident => incident.status === "COMPLETED"
		).length,
		incidentsByStatus: countByStatus(params.incidents),
		recentCandidates: params.candidates.slice(0, 5),
		activeOperations: params.operations.slice(0, 5),
		activeServices: params.services
			.filter(service => service.is_active)
			.slice(0, 6),
	};
}

function countByStatus(items: ProviderIncidentDto[]): Record<string, number> {
	return items.reduce<Record<string, number>>((acc, item) => {
		acc[item.status] = (acc[item.status] ?? 0) + 1;
		return acc;
	}, {});
}

function getNumber(source: Record<string, unknown>, keys: string[]): number {
	for (const key of keys) {
		const value = source[key];

		if (typeof value === "number") {
			return value;
		}

		if (typeof value === "string" && !Number.isNaN(Number(value))) {
			return Number(value);
		}
	}

	return 0;
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
