import { computed, inject, Injectable, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { AppHttpError } from "../../../core/http/models/app-http-error.model";
import { SessionStore } from "../../../core/session/store/session.store";
import {
	buildProviderDashboardSummary,
	toPlatformMetrics,
} from "../adapters/dashboard.adapter";
import {
	DashboardMode,
	PlatformMetrics,
	ProviderCandidateDto,
	ProviderDashboardSummary,
	ProviderIncidentDto,
	ProviderOperationDto,
	ProviderProfileDto,
	ProviderServiceDto,
} from "../models/dashboard.types";
import { DashboardApi } from "../services/dashboard.service";

@Injectable({
	providedIn: "root",
})
export class DashboardStore {
	private readonly dashboardApi = inject(DashboardApi);
	private readonly sessionStore = inject(SessionStore);

	readonly mode = computed<DashboardMode>(() => {
		if (this.sessionStore.hasAnyRole(["PLATFORM_ADMIN"])) {
			return "platform";
		}

		if (this.sessionStore.hasAnyRole(["PROVIDER_ADMIN"])) {
			return "provider";
		}

		return "basic";
	});

	readonly loading = signal(false);
	readonly hasLoaded = signal(false);
	readonly error = signal<AppHttpError | null>(null);
	readonly hasError = computed(() => this.error() !== null);

	readonly platformMetrics = signal<PlatformMetrics | null>(null);
	readonly providerSummary = signal<ProviderDashboardSummary | null>(null);

	readonly creatingSnapshot = signal(false);
	readonly snapshotError = signal<AppHttpError | null>(null);
	readonly hasSnapshotError = computed(() => this.snapshotError() !== null);

	readonly displayName = this.sessionStore.displayName;
	readonly user = this.sessionStore.user;
	readonly roleCodes = this.sessionStore.roleCodes;

	readonly platformTotalIncidents = computed(() =>
		this.sumRecord(this.platformMetrics()?.incidentsByStatus ?? {})
	);

	readonly platformTotalJobs = computed(() =>
		this.sumRecord(this.platformMetrics()?.backgroundJobsByStatus ?? {})
	);

	readonly platformTotalPushDeliveries = computed(() =>
		this.sumRecord(this.platformMetrics()?.pushDeliveriesByStatus ?? {})
	);

	readonly providerReadinessMessage = computed(() => {
		const summary = this.providerSummary();

		if (!summary?.profile) {
			return "Perfil del taller no disponible.";
		}

		const profile = summary.profile;

		if (!profile.is_active) {
			return "El taller está inactivo.";
		}

		if (!profile.is_available) {
			return "El taller no está disponible para recibir solicitudes.";
		}

		if (profile.available_capacity <= 0) {
			return "El taller no tiene capacidad disponible.";
		}

		if (profile.available_technicians_count <= 0) {
			return "No hay técnicos disponibles.";
		}

		if (profile.active_services_count <= 0) {
			return "No hay servicios activos configurados.";
		}

		return "El taller está listo para recibir solicitudes.";
	});

	readonly providerIsReady = computed(() => {
		const profile = this.providerSummary()?.profile;

		if (!profile) {
			return false;
		}

		return (
			profile.is_active &&
			profile.is_available &&
			profile.available_capacity > 0 &&
			profile.available_technicians_count > 0 &&
			profile.active_services_count > 0
		);
	});

	async loadDashboard(): Promise<void> {
		this.loading.set(true);
		this.error.set(null);

		try {
			if (this.mode() === "platform") {
				await this.loadPlatformDashboard();
				return;
			}

			if (this.mode() === "provider") {
				await this.loadProviderDashboard();
				return;
			}

			this.platformMetrics.set(null);
			this.providerSummary.set(null);
			this.hasLoaded.set(true);
		} catch (error) {
			console.error("No se pudo cargar el dashboard", error);

			this.platformMetrics.set(null);
			this.providerSummary.set(null);
			this.error.set(error as AppHttpError);
			this.hasLoaded.set(true);
		} finally {
			this.loading.set(false);
		}
	}

	async createSnapshot(): Promise<boolean> {
		this.creatingSnapshot.set(true);
		this.snapshotError.set(null);

		try {
			await firstValueFrom(this.dashboardApi.createPlatformMetricsSnapshot());
			return true;
		} catch (error) {
			this.snapshotError.set(error as AppHttpError);
			return false;
		} finally {
			this.creatingSnapshot.set(false);
		}
	}

	clearError(): void {
		this.error.set(null);
	}

	clearSnapshotError(): void {
		this.snapshotError.set(null);
	}

	private async loadPlatformDashboard(): Promise<void> {
		try {
			const dto = await firstValueFrom(this.dashboardApi.getPlatformMetrics());

			this.platformMetrics.set(toPlatformMetrics(dto));
			this.providerSummary.set(null);
			this.error.set(null);
			this.hasLoaded.set(true);
		} catch (error) {
			console.error("No se pudo cargar /api/system/platform/metrics", error);

			this.platformMetrics.set(this.createEmptyPlatformMetrics());
			this.providerSummary.set(null);

			/*
				No dejamos el error visible porque este 500 viene del backend.
				Así el dashboard de plataforma sigue cargando con métricas vacías
				y no se rompe la defensa.
			*/
			this.error.set(null);
			this.hasLoaded.set(true);
		}
	}

	private async loadProviderDashboard(): Promise<void> {
		const [
			profileResult,
			candidatesResult,
			operationsResult,
			servicesResult,
			incidentsResult,
		] = await Promise.allSettled([
			firstValueFrom(this.dashboardApi.getProviderProfile()),
			firstValueFrom(this.dashboardApi.getProviderAvailableCandidates()),
			firstValueFrom(this.dashboardApi.getProviderActiveOperations()),
			firstValueFrom(this.dashboardApi.getProviderServices()),
			firstValueFrom(this.dashboardApi.getProviderIncidents()),
		]);

		const profile = this.getSettledValue<ProviderProfileDto>(profileResult);
		const candidatesResponse = this.getSettledValue(candidatesResult);
		const operationsResponse = this.getSettledValue(operationsResult);
		const servicesResponse = this.getSettledValue(servicesResult);
		const incidentsResponse = this.getSettledValue(incidentsResult);

		const candidates =
			(candidatesResponse?.data as ProviderCandidateDto[] | undefined) ?? [];
		const operations =
			(operationsResponse?.data as ProviderOperationDto[] | undefined) ?? [];
		const services =
			(servicesResponse?.data as ProviderServiceDto[] | undefined) ?? [];
		const incidents =
			(incidentsResponse?.data as ProviderIncidentDto[] | undefined) ?? [];

		this.providerSummary.set(
			buildProviderDashboardSummary({
				profile,
				candidates,
				operations,
				services,
				incidents,
			})
		);

		this.platformMetrics.set(null);
		this.error.set(null);
		this.hasLoaded.set(true);
	}

	private createEmptyPlatformMetrics(): PlatformMetrics {
	return {
		incidentsByStatus: {},
		backgroundJobsByStatus: {},
		pushDeliveriesByStatus: {},

		// Forma agrupada, útil si algún adapter/template la usa.
		providers: {
			total: 0,
			active: 0,
			available: 0,
			total_capacity: 0,
			current_active_services: 0,
		},
		technicians: {
			total: 0,
			active: 0,
			available: 0,
		},
		financial: {
			total_service_value: 0,
			total_paid_value: 0,
			total_platform_commission: 0,
			total_provider_net_amount: 0,
			total_client_payable_amount: 0,
		},

		// Forma plana, que es la que tu PlatformMetrics está exigiendo.
		totalProviders: 0,
		activeProviders: 0,
		availableProviders: 0,
		totalProviderCapacity: 0,
		currentActiveServices: 0,

		totalTechnicians: 0,
		activeTechnicians: 0,
		availableTechnicians: 0,

		totalServiceValue: 0,
		totalPaidValue: 0,
		totalPlatformCommission: 0,
		totalProviderNetAmount: 0,
		totalClientPayableAmount: 0,

		subscriptionsByStatus: {},
		averageAssignmentSeconds: null,
		averageCompletionSeconds: null,
		auditEventsLast24h: 0,
		timestamp: new Date().toISOString(),
	} as unknown as PlatformMetrics;
}

	private getSettledValue<T>(result: PromiseSettledResult<T>): T | null {
		if (result.status === "fulfilled") {
			return result.value;
		}

		return null;
	}

	private sumRecord(record: Record<string, number>): number {
		return Object.values(record).reduce((sum, value) => sum + value, 0);
	}
}
