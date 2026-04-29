import { computed, inject, Injectable, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { AppHttpError } from "../../../core/http/models/app-http-error.model";
import {
	toCreateIncidentRequest,
	toCreateTextEvidenceRequest,
	toCreateVehicleRequest,
	toIncident,
	toIncidentEvidence,
	toIncidentEvidences,
	toIncidents,
	toVehicle,
	toVehicles,
} from "../adapters/client-portal.adapter";
import {
	CountMetaDto,
	CreateIncidentFormValue,
	CreateTextEvidenceFormValue,
	CreateVehicleFormValue,
	Incident,
	IncidentEvidence,
	UploadFileEvidenceFormValue,
	Vehicle,
} from "../models/client-portal.types";
import { ClientPortalApi } from "../services/client-portal.service";

@Injectable({
	providedIn: "root",
})
export class ClientPortalStore {
	private readonly clientPortalApi = inject(ClientPortalApi);

	readonly vehicles = signal<Vehicle[]>([]);
	readonly vehiclesMeta = signal<CountMetaDto | null>(null);
	readonly vehiclesLoading = signal(false);
	readonly vehiclesHasLoaded = signal(false);
	readonly vehiclesError = signal<AppHttpError | null>(null);
	readonly hasVehiclesError = computed(() => this.vehiclesError() !== null);

	readonly incidents = signal<Incident[]>([]);
	readonly incidentsMeta = signal<CountMetaDto | null>(null);
	readonly incidentsLoading = signal(false);
	readonly incidentsHasLoaded = signal(false);
	readonly incidentsError = signal<AppHttpError | null>(null);
	readonly hasIncidentsError = computed(() => this.incidentsError() !== null);

	readonly selectedIncidentId = signal<string | null>(null);
	readonly selectedIncident = computed(() => {
		const selectedId = this.selectedIncidentId();

		if (!selectedId) {
			return null;
		}

		return this.incidents().find(incident => incident.id === selectedId) ?? null;
	});

	readonly selectedIncidentLoading = signal(false);
	readonly selectedIncidentError = signal<AppHttpError | null>(null);
	readonly hasSelectedIncidentError = computed(
		() => this.selectedIncidentError() !== null
	);

	readonly evidences = signal<IncidentEvidence[]>([]);
	readonly evidencesMeta = signal<CountMetaDto | null>(null);
	readonly evidencesLoading = signal(false);
	readonly evidencesHasLoaded = signal(false);
	readonly evidencesError = signal<AppHttpError | null>(null);
	readonly hasEvidencesError = computed(() => this.evidencesError() !== null);

	readonly creatingVehicle = signal(false);
	readonly createVehicleError = signal<AppHttpError | null>(null);
	readonly hasCreateVehicleError = computed(
		() => this.createVehicleError() !== null
	);

	readonly creatingIncident = signal(false);
	readonly createIncidentError = signal<AppHttpError | null>(null);
	readonly hasCreateIncidentError = computed(
		() => this.createIncidentError() !== null
	);

	readonly creatingTextEvidence = signal(false);
	readonly createTextEvidenceError = signal<AppHttpError | null>(null);
	readonly hasCreateTextEvidenceError = computed(
		() => this.createTextEvidenceError() !== null
	);

	readonly uploadingFileEvidence = signal(false);
	readonly uploadFileEvidenceError = signal<AppHttpError | null>(null);
	readonly hasUploadFileEvidenceError = computed(
		() => this.uploadFileEvidenceError() !== null
	);

	readonly cancellingIncidentIds = signal<string[]>([]);
	readonly cancelIncidentError = signal<AppHttpError | null>(null);
	readonly hasCancelIncidentError = computed(
		() => this.cancelIncidentError() !== null
	);

	readonly vehiclesCount = computed(
		() => this.vehiclesMeta()?.count ?? this.vehicles().length
	);

	readonly incidentsCount = computed(
		() => this.incidentsMeta()?.count ?? this.incidents().length
	);

	readonly evidencesCount = computed(
		() => this.evidencesMeta()?.count ?? this.evidences().length
	);

	readonly activeIncidentsCount = computed(
		() =>
			this.incidents().filter(
				incident =>
					incident.status !== "COMPLETED" && incident.status !== "CANCELLED"
			).length
	);

	readonly completedIncidentsCount = computed(
		() =>
			this.incidents().filter(incident => incident.status === "COMPLETED").length
	);

	readonly vehiclesIsEmpty = computed(
		() =>
			this.vehiclesHasLoaded() &&
			!this.vehiclesLoading() &&
			this.vehicles().length === 0
	);

	readonly incidentsIsEmpty = computed(
		() =>
			this.incidentsHasLoaded() &&
			!this.incidentsLoading() &&
			this.incidents().length === 0
	);

	async loadVehicles(): Promise<void> {
		this.vehiclesLoading.set(true);
		this.vehiclesError.set(null);

		try {
			const response = await firstValueFrom(
				this.clientPortalApi.listMyVehicles()
			);

			this.vehicles.set(toVehicles(response.data));
			this.vehiclesMeta.set(response.meta);
			this.vehiclesHasLoaded.set(true);
		} catch (error) {
			this.vehiclesError.set(error as AppHttpError);
			this.vehicles.set([]);
			this.vehiclesMeta.set(null);
			this.vehiclesHasLoaded.set(true);
		} finally {
			this.vehiclesLoading.set(false);
		}
	}

	async loadIncidents(): Promise<void> {
		this.incidentsLoading.set(true);
		this.incidentsError.set(null);

		try {
			const response = await firstValueFrom(
				this.clientPortalApi.listMyIncidents()
			);

			const incidents = toIncidents(response.data);

			this.incidents.set(incidents);
			this.incidentsMeta.set(response.meta);
			this.incidentsHasLoaded.set(true);

			if (!this.selectedIncidentId() && incidents.length > 0) {
				this.selectedIncidentId.set(incidents[0].id);
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

	async loadWorkspace(): Promise<void> {
		await Promise.all([this.loadVehicles(), this.loadIncidents()]);

		const selectedId = this.selectedIncidentId();

		if (selectedId) {
			await this.loadEvidences(selectedId);
		}
	}

	async selectIncident(incidentId: string): Promise<void> {
		this.selectedIncidentId.set(incidentId);
		this.evidences.set([]);
		this.evidencesMeta.set(null);
		this.evidencesHasLoaded.set(false);

		await Promise.all([
			this.loadIncidentById(incidentId),
			this.loadEvidences(incidentId),
		]);
	}

	async loadIncidentById(incidentId: string): Promise<Incident | null> {
		this.selectedIncidentLoading.set(true);
		this.selectedIncidentError.set(null);

		try {
			const dto = await firstValueFrom(
				this.clientPortalApi.getIncidentById(incidentId)
			);
			const incident = toIncident(dto);

			this.upsertIncident(incident);
			this.selectedIncidentId.set(incident.id);

			return incident;
		} catch (error) {
			this.selectedIncidentError.set(error as AppHttpError);
			return null;
		} finally {
			this.selectedIncidentLoading.set(false);
		}
	}

	async loadEvidences(incidentId: string): Promise<void> {
		this.evidencesLoading.set(true);
		this.evidencesError.set(null);

		try {
			const response = await firstValueFrom(
				this.clientPortalApi.listIncidentEvidences(incidentId)
			);

			this.evidences.set(toIncidentEvidences(response.data));
			this.evidencesMeta.set(response.meta);
			this.evidencesHasLoaded.set(true);
		} catch (error) {
			this.evidencesError.set(error as AppHttpError);
			this.evidences.set([]);
			this.evidencesMeta.set(null);
			this.evidencesHasLoaded.set(true);
		} finally {
			this.evidencesLoading.set(false);
		}
	}

	async createVehicle(
		formValue: CreateVehicleFormValue
	): Promise<Vehicle | null> {
		this.creatingVehicle.set(true);
		this.createVehicleError.set(null);

		try {
			const payload = toCreateVehicleRequest(formValue);
			const dto = await firstValueFrom(
				this.clientPortalApi.createVehicle(payload)
			);
			const vehicle = toVehicle(dto);

			this.vehicles.update(current => [vehicle, ...current]);
			this.vehiclesMeta.set({
				count: this.vehicles().length,
			});

			return vehicle;
		} catch (error) {
			this.createVehicleError.set(error as AppHttpError);
			return null;
		} finally {
			this.creatingVehicle.set(false);
		}
	}

	async createIncident(
		formValue: CreateIncidentFormValue
	): Promise<Incident | null> {
		this.creatingIncident.set(true);
		this.createIncidentError.set(null);

		try {
			const payload = toCreateIncidentRequest(formValue);
			const dto = await firstValueFrom(
				this.clientPortalApi.createIncident(payload)
			);
			const incident = toIncident(dto);

			this.incidents.update(current => [incident, ...current]);
			this.incidentsMeta.set({
				count: this.incidents().length,
			});
			this.selectedIncidentId.set(incident.id);
			this.evidences.set([]);
			this.evidencesMeta.set({ count: 0 });
			this.evidencesHasLoaded.set(true);

			return incident;
		} catch (error) {
			this.createIncidentError.set(error as AppHttpError);
			return null;
		} finally {
			this.creatingIncident.set(false);
		}
	}

	async createTextEvidence(
		formValue: CreateTextEvidenceFormValue
	): Promise<IncidentEvidence | null> {
		const incidentId = this.selectedIncidentId();

		if (!incidentId) {
			return null;
		}

		this.creatingTextEvidence.set(true);
		this.createTextEvidenceError.set(null);

		try {
			const payload = toCreateTextEvidenceRequest(formValue);
			const dto = await firstValueFrom(
				this.clientPortalApi.createTextEvidence(incidentId, payload)
			);
			const evidence = toIncidentEvidence(dto);

			this.evidences.update(current => [evidence, ...current]);
			this.evidencesMeta.set({
				count: this.evidences().length,
			});
			await this.loadIncidentById(incidentId);

			return evidence;
		} catch (error) {
			this.createTextEvidenceError.set(error as AppHttpError);
			return null;
		} finally {
			this.creatingTextEvidence.set(false);
		}
	}

	async uploadFileEvidence(
		formValue: UploadFileEvidenceFormValue
	): Promise<IncidentEvidence | null> {
		const incidentId = this.selectedIncidentId();

		if (!incidentId) {
			return null;
		}

		this.uploadingFileEvidence.set(true);
		this.uploadFileEvidenceError.set(null);

		try {
			const dto = await firstValueFrom(
				this.clientPortalApi.uploadFileEvidence(
					incidentId,
					formValue.evidenceType,
					formValue.description,
					formValue.file
				)
			);
			const evidence = toIncidentEvidence(dto);

			this.evidences.update(current => [evidence, ...current]);
			this.evidencesMeta.set({
				count: this.evidences().length,
			});
			await this.loadIncidentById(incidentId);

			return evidence;
		} catch (error) {
			this.uploadFileEvidenceError.set(error as AppHttpError);
			return null;
		} finally {
			this.uploadingFileEvidence.set(false);
		}
	}

	async cancelIncident(incidentId: string): Promise<Incident | null> {
		this.cancelIncidentError.set(null);
		this.addCancellingIncidentId(incidentId);

		try {
			const dto = await firstValueFrom(
				this.clientPortalApi.cancelIncident(incidentId)
			);
			const incident = toIncident(dto);

			this.upsertIncident(incident);

			return incident;
		} catch (error) {
			this.cancelIncidentError.set(error as AppHttpError);
			return null;
		} finally {
			this.removeCancellingIncidentId(incidentId);
		}
	}

	isCancellingIncident(incidentId: string): boolean {
		return this.cancellingIncidentIds().includes(incidentId);
	}

	clearVehiclesError(): void {
		this.vehiclesError.set(null);
	}

	clearIncidentsError(): void {
		this.incidentsError.set(null);
	}

	clearCreateVehicleError(): void {
		this.createVehicleError.set(null);
	}

	clearCreateIncidentError(): void {
		this.createIncidentError.set(null);
	}

	clearCreateTextEvidenceError(): void {
		this.createTextEvidenceError.set(null);
	}

	clearUploadFileEvidenceError(): void {
		this.uploadFileEvidenceError.set(null);
	}

	clearCancelIncidentError(): void {
		this.cancelIncidentError.set(null);
	}

	private upsertIncident(incident: Incident): void {
		this.incidents.update(current => {
			const exists = current.some(item => item.id === incident.id);

			if (exists) {
				return current.map(item => (item.id === incident.id ? incident : item));
			}

			return [incident, ...current];
		});

		this.incidentsMeta.set({
			count: this.incidents().length,
		});
	}

	private addCancellingIncidentId(incidentId: string): void {
		this.cancellingIncidentIds.update(ids =>
			ids.includes(incidentId) ? ids : [...ids, incidentId]
		);
	}

	private removeCancellingIncidentId(incidentId: string): void {
		this.cancellingIncidentIds.update(ids =>
			ids.filter(id => id !== incidentId)
		);
	}
}
