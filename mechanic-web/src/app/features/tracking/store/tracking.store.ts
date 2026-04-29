import { computed, inject, Injectable, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { AppHttpError } from "../../../core/http/models/app-http-error.model";
import {
	toTrackingHistory,
	toTrackingLive,
	toTrackingOperations,
	toUpdateTrackingLocationRequest,
} from "../adapters/tracking.adapter";
import {
	CountMetaDto,
	TrackingHistoryItem,
	TrackingLive,
	TrackingOperation,
	UpdateTrackingLocationFormValue,
} from "../models/tracking.types";
import { TrackingApi } from "../services/tracking.service";

@Injectable({
	providedIn: "root",
})
export class TrackingStore {
	private readonly trackingApi = inject(TrackingApi);

	readonly operations = signal<TrackingOperation[]>([]);
	readonly operationsMeta = signal<CountMetaDto | null>(null);
	readonly operationsLoading = signal(false);
	readonly operationsHasLoaded = signal(false);
	readonly operationsError = signal<AppHttpError | null>(null);
	readonly hasOperationsError = computed(() => this.operationsError() !== null);

	readonly operationsCount = computed(
		() => this.operationsMeta()?.count ?? this.operations().length
	);

	readonly operationsIsEmpty = computed(
		() =>
			this.operationsHasLoaded() &&
			!this.operationsLoading() &&
			this.operations().length === 0
	);

	readonly selectedIncidentId = signal<string | null>(null);
	readonly selectedOperation = computed(() => {
		const incidentId = this.selectedIncidentId();

		if (!incidentId) {
			return null;
		}

		return (
			this.operations().find(operation => operation.incidentId === incidentId) ??
			null
		);
	});

	readonly liveTracking = signal<TrackingLive | null>(null);
	readonly liveTrackingLoading = signal(false);
	readonly liveTrackingError = signal<AppHttpError | null>(null);
	readonly hasLiveTrackingError = computed(
		() => this.liveTrackingError() !== null
	);

	readonly history = signal<TrackingHistoryItem[]>([]);
	readonly historyMeta = signal<CountMetaDto | null>(null);
	readonly historyLoading = signal(false);
	readonly historyError = signal<AppHttpError | null>(null);
	readonly hasHistoryError = computed(() => this.historyError() !== null);

	readonly updatingLocation = signal(false);
	readonly updatingLocationError = signal<AppHttpError | null>(null);
	readonly hasUpdatingLocationError = computed(
		() => this.updatingLocationError() !== null
	);

	readonly refreshingRoute = signal(false);
	readonly refreshingRouteError = signal<AppHttpError | null>(null);
	readonly hasRefreshingRouteError = computed(
		() => this.refreshingRouteError() !== null
	);

	readonly hasLiveCoordinates = computed(() => {
		const live = this.liveTracking();

		if (!live) {
			return false;
		}

		return (
			live.incidentLatitude !== null &&
			live.incidentLongitude !== null &&
			live.technicianLatitude !== null &&
			live.technicianLongitude !== null
		);
	});

	async loadOperations(): Promise<void> {
		this.operationsLoading.set(true);
		this.operationsError.set(null);

		try {
			const response = await firstValueFrom(
				this.trackingApi.getActiveOperations()
			);

			this.operations.set(toTrackingOperations(response.data));
			this.operationsMeta.set(response.meta);
			this.operationsHasLoaded.set(true);

			if (!this.selectedIncidentId() && response.data.length > 0) {
				this.selectedIncidentId.set(response.data[0].incident_id);
			}
		} catch (error) {
			this.operationsError.set(error as AppHttpError);
			this.operations.set([]);
			this.operationsMeta.set(null);
			this.operationsHasLoaded.set(true);
		} finally {
			this.operationsLoading.set(false);
		}
	}

	async loadLiveTracking(incidentId: string): Promise<TrackingLive | null> {
		this.liveTrackingLoading.set(true);
		this.liveTrackingError.set(null);

		try {
			const dto = await firstValueFrom(
				this.trackingApi.getProviderLiveTracking(incidentId)
			);
			const live = toTrackingLive(dto);

			this.liveTracking.set(live);

			return live;
		} catch (error) {
			this.liveTrackingError.set(error as AppHttpError);
			this.liveTracking.set(null);
			return null;
		} finally {
			this.liveTrackingLoading.set(false);
		}
	}

	async loadHistory(incidentId: string): Promise<void> {
		this.historyLoading.set(true);
		this.historyError.set(null);

		try {
			const response = await firstValueFrom(
				this.trackingApi.getProviderTrackingHistory(incidentId)
			);

			this.history.set(toTrackingHistory(response.data));
			this.historyMeta.set(response.meta);
		} catch (error) {
			this.historyError.set(error as AppHttpError);
			this.history.set([]);
			this.historyMeta.set(null);
		} finally {
			this.historyLoading.set(false);
		}
	}

	async loadTrackingWorkspace(): Promise<void> {
		await this.loadOperations();

		const incidentId = this.selectedIncidentId();

		if (incidentId) {
			await Promise.all([
				this.loadLiveTracking(incidentId),
				this.loadHistory(incidentId),
			]);
		}
	}

	async selectIncident(incidentId: string): Promise<void> {
		this.selectedIncidentId.set(incidentId);
		this.liveTracking.set(null);
		this.history.set([]);
		this.historyMeta.set(null);

		await Promise.all([
			this.loadLiveTracking(incidentId),
			this.loadHistory(incidentId),
		]);
	}

	async updateLocation(
		formValue: UpdateTrackingLocationFormValue
	): Promise<TrackingLive | null> {
		const incidentId = this.selectedIncidentId();

		if (!incidentId) {
			return null;
		}

		this.updatingLocation.set(true);
		this.updatingLocationError.set(null);

		try {
			const payload = toUpdateTrackingLocationRequest(formValue);
			const dto = await firstValueFrom(
				this.trackingApi.updateProviderLocation(incidentId, payload)
			);
			const live = toTrackingLive(dto);

			this.liveTracking.set(live);
			await this.loadHistory(incidentId);

			return live;
		} catch (error) {
			this.updatingLocationError.set(error as AppHttpError);
			return null;
		} finally {
			this.updatingLocation.set(false);
		}
	}

	async refreshRoute(): Promise<TrackingLive | null> {
		const incidentId = this.selectedIncidentId();

		if (!incidentId) {
			return null;
		}

		this.refreshingRoute.set(true);
		this.refreshingRouteError.set(null);

		try {
			const dto = await firstValueFrom(
				this.trackingApi.refreshProviderRoute(incidentId)
			);
			const live = toTrackingLive(dto);

			this.liveTracking.set(live);

			return live;
		} catch (error) {
			this.refreshingRouteError.set(error as AppHttpError);
			return null;
		} finally {
			this.refreshingRoute.set(false);
		}
	}

	clearOperationsError(): void {
		this.operationsError.set(null);
	}

	clearLiveTrackingError(): void {
		this.liveTrackingError.set(null);
	}

	clearUpdatingLocationError(): void {
		this.updatingLocationError.set(null);
	}

	clearRefreshingRouteError(): void {
		this.refreshingRouteError.set(null);
	}
}
