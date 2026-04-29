import { computed, inject, Injectable, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { AppHttpError } from "../../../core/http/models/app-http-error.model";
import {
	jsonToText,
	toAssignmentCandidates,
	toAssignmentPublishResult,
	toPlatformIncident,
	toPlatformIncidents,
} from "../adapters/platform-assignment.adapter";
import {
	AssignmentCandidate,
	AssignmentPublishResult,
	IncidentFiltersFormValue,
	PagedMetaDto,
	PlatformIncident,
} from "../models/platform-assignment.types";
import { PlatformAssignmentApi } from "../services/platform-assignment.service";

@Injectable({
	providedIn: "root",
})
export class PlatformAssignmentStore {
	private readonly platformAssignmentApi = inject(PlatformAssignmentApi);

	readonly incidents = signal<PlatformIncident[]>([]);
	readonly incidentsMeta = signal<PagedMetaDto | null>(null);
	readonly incidentsLoading = signal(false);
	readonly incidentsHasLoaded = signal(false);
	readonly incidentsError = signal<AppHttpError | null>(null);
	readonly hasIncidentsError = computed(() => this.incidentsError() !== null);

	readonly selectedIncidentId = signal<string | null>(null);
	readonly selectedIncident = signal<PlatformIncident | null>(null);
	readonly selectedIncidentLoading = signal(false);
	readonly selectedIncidentError = signal<AppHttpError | null>(null);
	readonly hasSelectedIncidentError = computed(
		() => this.selectedIncidentError() !== null
	);

	readonly candidates = signal<AssignmentCandidate[]>([]);
	readonly candidatesLoading = signal(false);
	readonly candidatesHasLoaded = signal(false);
	readonly candidatesError = signal<AppHttpError | null>(null);
	readonly hasCandidatesError = computed(() => this.candidatesError() !== null);

	readonly publishResult = signal<AssignmentPublishResult | null>(null);
	readonly publishing = signal(false);
	readonly publishError = signal<AppHttpError | null>(null);
	readonly hasPublishError = computed(() => this.publishError() !== null);

	readonly incidentsCount = computed(
		() => this.incidentsMeta()?.count ?? this.incidents().length
	);

	readonly pendingReviewCount = computed(
		() =>
			this.incidents().filter(incident =>
				["PENDING", "IN_REVIEW"].includes(incident.status)
			).length
	);

	readonly publishedCount = computed(
		() =>
			this.incidents().filter(incident => incident.status === "PUBLISHED")
				.length
	);

	readonly assignedCount = computed(
		() =>
			this.incidents().filter(incident => incident.status === "ASSIGNED").length
	);

	readonly candidatesCount = computed(() => this.candidates().length);

	readonly bestCandidate = computed(() => {
		const result = this.publishResult();
		const candidates = this.candidates();

		if (result?.recommendedProviderId) {
			const byProvider = candidates.find(
				candidate => candidate.providerId === result.recommendedProviderId
			);

			if (byProvider) {
				return byProvider;
			}
		}

		return (
			[...candidates].sort((a, b) => {
				if (a.recommendationRank !== b.recommendationRank) {
					return a.recommendationRank - b.recommendationRank;
				}

				return b.score - a.score;
			})[0] ?? null
		);
	});

	readonly canPublishSelectedIncident = computed(() => {
		const incident = this.selectedIncident();

		if (!incident) {
			return false;
		}

		return !["ASSIGNED", "EN_ROUTE", "ON_SITE", "ARRIVED", "IN_PROGRESS", "COMPLETED", "CANCELLED"].includes(
			incident.status
		);
	});

	async loadIncidents(formValue: IncidentFiltersFormValue): Promise<void> {
		this.incidentsLoading.set(true);
		this.incidentsError.set(null);

		try {
			const response = await firstValueFrom(
				this.platformAssignmentApi.listIncidents({
					limit: String(formValue.limit),
					offset: String(formValue.offset),
				})
			);

			const incidents = toPlatformIncidents(response.data);

			this.incidents.set(incidents);
			this.incidentsMeta.set(response.meta);
			this.incidentsHasLoaded.set(true);

			if (!this.selectedIncidentId() && incidents.length > 0) {
				this.selectedIncidentId.set(incidents[0].id);
				this.selectedIncident.set(incidents[0]);
			}
		} catch (error) {
			this.incidentsError.set(error as AppHttpError);
			this.incidents.set([]);
			this.incidentsMeta.set(null);
			this.incidentsHasLoaded.set(true);
		} finally {
			this.incidentsLoading.set(false);
		}
	}

	async loadIncidentById(
		incidentId: string
	): Promise<PlatformIncident | null> {
		this.selectedIncidentLoading.set(true);
		this.selectedIncidentError.set(null);

		try {
			const dto = await firstValueFrom(
				this.platformAssignmentApi.getIncidentById(incidentId)
			);
			const incident = toPlatformIncident(dto);

			this.selectedIncidentId.set(incident.id);
			this.selectedIncident.set(incident);
			this.upsertIncident(incident);

			return incident;
		} catch (error) {
			this.selectedIncidentError.set(error as AppHttpError);
			this.selectedIncident.set(null);
			return null;
		} finally {
			this.selectedIncidentLoading.set(false);
		}
	}

	async loadCandidates(incidentId: string): Promise<void> {
		this.candidatesLoading.set(true);
		this.candidatesError.set(null);

		try {
			const response = await firstValueFrom(
				this.platformAssignmentApi.listCandidatesByIncident(incidentId)
			);

			this.candidates.set(toAssignmentCandidates(response.data));
			this.candidatesHasLoaded.set(true);
		} catch (error) {
			this.candidatesError.set(error as AppHttpError);
			this.candidates.set([]);
			this.candidatesHasLoaded.set(true);
		} finally {
			this.candidatesLoading.set(false);
		}
	}

	async selectIncident(incidentId: string): Promise<void> {
		this.selectedIncidentId.set(incidentId);
		this.selectedIncident.set(null);
		this.publishResult.set(null);
		this.candidates.set([]);
		this.candidatesHasLoaded.set(false);

		await Promise.all([
			this.loadIncidentById(incidentId),
			this.loadCandidates(incidentId),
		]);
	}

	async publishSelectedIncident(): Promise<AssignmentPublishResult | null> {
		const incidentId = this.selectedIncidentId();

		if (!incidentId) {
			return null;
		}

		this.publishing.set(true);
		this.publishError.set(null);
		this.publishResult.set(null);

		try {
			const dto = await firstValueFrom(
				this.platformAssignmentApi.publishIncident(incidentId)
			);
			const result = toAssignmentPublishResult(dto);

			this.publishResult.set(result);

			await Promise.all([
				this.loadIncidentById(incidentId),
				this.loadCandidates(incidentId),
			]);

			return result;
		} catch (error) {
			this.publishError.set(error as AppHttpError);
			return null;
		} finally {
			this.publishing.set(false);
		}
	}

	async reloadSelectedIncident(): Promise<void> {
		const incidentId = this.selectedIncidentId();

		if (!incidentId) {
			return;
		}

		await Promise.all([
			this.loadIncidentById(incidentId),
			this.loadCandidates(incidentId),
		]);
	}

	clearIncidentsError(): void {
		this.incidentsError.set(null);
	}

	clearSelectedIncidentError(): void {
		this.selectedIncidentError.set(null);
	}

	clearCandidatesError(): void {
		this.candidatesError.set(null);
	}

	clearPublishError(): void {
		this.publishError.set(null);
	}

	jsonText(value: Record<string, unknown>): string {
		return jsonToText(value);
	}

	private upsertIncident(incident: PlatformIncident): void {
		this.incidents.update(current => {
			const exists = current.some(item => item.id === incident.id);

			if (exists) {
				return current.map(item => (item.id === incident.id ? incident : item));
			}

			return [incident, ...current];
		});

		this.incidentsMeta.set({
			limit: this.incidentsMeta()?.limit ?? 50,
			offset: this.incidentsMeta()?.offset ?? 0,
			count: this.incidents().length,
		});
	}
}
