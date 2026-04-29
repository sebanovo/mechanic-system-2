import { computed, inject, Injectable, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { AppHttpError } from "../../../core/http/models/app-http-error.model";
import {
	toCompleteIncidentRequest,
	toDispatchIncidentRequest,
	toIncidentOperationEvents,
	toIncidentOperationState,
	toIncidentOperationStates,
	toOperationNoteRequest,
	toProviderTechnicians,
} from "../adapters/operation.adapter";
import {
	CompleteIncidentFormValue,
	CountMetaDto,
	DispatchIncidentFormValue,
	IncidentOperationEvent,
	IncidentOperationState,
	OperationNoteFormValue,
	ProviderTechnician,
} from "../models/operation.types";
import { OperationsApi } from "../services/operation.service";

@Injectable({
	providedIn: "root",
})
export class OperationsStore {
	private readonly operationsApi = inject(OperationsApi);

	readonly activeOperations = signal<IncidentOperationState[]>([]);
	readonly activeOperationsMeta = signal<CountMetaDto | null>(null);
	readonly activeOperationsLoading = signal(false);
	readonly activeOperationsHasLoaded = signal(false);
	readonly activeOperationsError = signal<AppHttpError | null>(null);
	readonly hasActiveOperationsError = computed(
		() => this.activeOperationsError() !== null
	);

	readonly activeOperationsCount = computed(
		() => this.activeOperationsMeta()?.count ?? this.activeOperations().length
	);

	readonly activeOperationsIsEmpty = computed(
		() =>
			this.activeOperationsHasLoaded() &&
			!this.activeOperationsLoading() &&
			this.activeOperations().length === 0
	);

	readonly selectedOperation = signal<IncidentOperationState | null>(null);
	readonly selectedOperationLoading = signal(false);
	readonly selectedOperationError = signal<AppHttpError | null>(null);
	readonly hasSelectedOperationError = computed(
		() => this.selectedOperationError() !== null
	);

	readonly operationHistory = signal<IncidentOperationEvent[]>([]);
	readonly operationHistoryMeta = signal<CountMetaDto | null>(null);
	readonly operationHistoryLoading = signal(false);
	readonly operationHistoryError = signal<AppHttpError | null>(null);
	readonly hasOperationHistoryError = computed(
		() => this.operationHistoryError() !== null
	);

	readonly technicians = signal<ProviderTechnician[]>([]);
	readonly techniciansLoading = signal(false);
	readonly techniciansError = signal<AppHttpError | null>(null);
	readonly hasTechniciansError = computed(() => this.techniciansError() !== null);

	readonly availableTechnicians = computed(() =>
		this.technicians().filter(
			technician => technician.isActive && technician.isAvailable
		)
	);

	readonly actionLoadingIncidentIds = signal<string[]>([]);
	readonly actionError = signal<AppHttpError | null>(null);
	readonly hasActionError = computed(() => this.actionError() !== null);

	readonly assignedCount = computed(
		() =>
			this.activeOperations().filter(operation => operation.status === "ASSIGNED")
				.length
	);

	readonly enRouteCount = computed(
		() =>
			this.activeOperations().filter(operation => operation.status === "EN_ROUTE")
				.length
	);

	readonly inProgressCount = computed(
		() =>
			this.activeOperations().filter(
				operation =>
					operation.status === "ON_SITE" || operation.status === "IN_PROGRESS"
			).length
	);

	async loadActiveOperations(): Promise<void> {
		this.activeOperationsLoading.set(true);
		this.activeOperationsError.set(null);

		try {
			const response = await firstValueFrom(
				this.operationsApi.getActiveOperations()
			);

			this.activeOperations.set(toIncidentOperationStates(response.data));
			this.activeOperationsMeta.set(response.meta);
			this.activeOperationsHasLoaded.set(true);
		} catch (error) {
			this.activeOperationsError.set(error as AppHttpError);
			this.activeOperations.set([]);
			this.activeOperationsMeta.set(null);
			this.activeOperationsHasLoaded.set(true);
		} finally {
			this.activeOperationsLoading.set(false);
		}
	}

	async loadTechnicians(): Promise<void> {
		this.techniciansLoading.set(true);
		this.techniciansError.set(null);

		try {
			const response = await firstValueFrom(this.operationsApi.getMyTechnicians());
			this.technicians.set(toProviderTechnicians(response.data));
		} catch (error) {
			this.techniciansError.set(error as AppHttpError);
			this.technicians.set([]);
		} finally {
			this.techniciansLoading.set(false);
		}
	}

	async loadWorkspace(): Promise<void> {
		await Promise.all([this.loadActiveOperations(), this.loadTechnicians()]);
	}

	async loadOperationState(
		incidentId: string
	): Promise<IncidentOperationState | null> {
		this.selectedOperationLoading.set(true);
		this.selectedOperationError.set(null);

		try {
			const dto = await firstValueFrom(
				this.operationsApi.getOperationState(incidentId)
			);
			const operation = toIncidentOperationState(dto);

			this.selectedOperation.set(operation);
			this.upsertOperation(operation);

			return operation;
		} catch (error) {
			this.selectedOperationError.set(error as AppHttpError);
			return null;
		} finally {
			this.selectedOperationLoading.set(false);
		}
	}

	async loadOperationHistory(incidentId: string): Promise<void> {
		this.operationHistoryLoading.set(true);
		this.operationHistoryError.set(null);

		try {
			const response = await firstValueFrom(
				this.operationsApi.getOperationHistory(incidentId)
			);

			this.operationHistory.set(toIncidentOperationEvents(response.data));
			this.operationHistoryMeta.set(response.meta);
		} catch (error) {
			this.operationHistoryError.set(error as AppHttpError);
			this.operationHistory.set([]);
			this.operationHistoryMeta.set(null);
		} finally {
			this.operationHistoryLoading.set(false);
		}
	}

	async loadOperationDetail(incidentId: string): Promise<void> {
		await Promise.all([
			this.loadOperationState(incidentId),
			this.loadOperationHistory(incidentId),
		]);
	}

	async dispatchIncident(
		incidentId: string,
		formValue: DispatchIncidentFormValue
	): Promise<IncidentOperationState | null> {
		this.startAction(incidentId);

		try {
			const payload = toDispatchIncidentRequest(formValue);
			const dto = await firstValueFrom(
				this.operationsApi.dispatchIncident(incidentId, payload)
			);
			const operation = toIncidentOperationState(dto);

			this.upsertOperation(operation);
			this.selectedOperation.set(operation);
			await Promise.all([
				this.loadOperationHistory(incidentId),
				this.loadTechnicians(),
			]);

			return operation;
		} catch (error) {
			this.actionError.set(error as AppHttpError);
			return null;
		} finally {
			this.finishAction(incidentId);
		}
	}

	async markArrival(
		incidentId: string,
		formValue: OperationNoteFormValue
	): Promise<IncidentOperationState | null> {
		this.startAction(incidentId);

		try {
			const payload = toOperationNoteRequest(formValue);
			const dto = await firstValueFrom(
				this.operationsApi.markArrival(incidentId, payload)
			);
			const operation = toIncidentOperationState(dto);

			this.upsertOperation(operation);
			this.selectedOperation.set(operation);
			await this.loadOperationHistory(incidentId);

			return operation;
		} catch (error) {
			this.actionError.set(error as AppHttpError);
			return null;
		} finally {
			this.finishAction(incidentId);
		}
	}

	async startService(
		incidentId: string,
		formValue: OperationNoteFormValue
	): Promise<IncidentOperationState | null> {
		this.startAction(incidentId);

		try {
			const payload = toOperationNoteRequest(formValue);
			const dto = await firstValueFrom(
				this.operationsApi.startService(incidentId, payload)
			);
			const operation = toIncidentOperationState(dto);

			this.upsertOperation(operation);
			this.selectedOperation.set(operation);
			await this.loadOperationHistory(incidentId);

			return operation;
		} catch (error) {
			this.actionError.set(error as AppHttpError);
			return null;
		} finally {
			this.finishAction(incidentId);
		}
	}

	async completeService(
		incidentId: string,
		formValue: CompleteIncidentFormValue
	): Promise<IncidentOperationState | null> {
		this.startAction(incidentId);

		try {
			const payload = toCompleteIncidentRequest(formValue);
			const dto = await firstValueFrom(
				this.operationsApi.completeService(incidentId, payload)
			);
			const operation = toIncidentOperationState(dto);

			this.removeOperationIfClosed(operation);
			this.selectedOperation.set(operation);
			await Promise.all([
				this.loadOperationHistory(incidentId),
				this.loadTechnicians(),
			]);

			return operation;
		} catch (error) {
			this.actionError.set(error as AppHttpError);
			return null;
		} finally {
			this.finishAction(incidentId);
		}
	}

	async cancelService(
		incidentId: string,
		formValue: OperationNoteFormValue
	): Promise<IncidentOperationState | null> {
		this.startAction(incidentId);

		try {
			const payload = toOperationNoteRequest(formValue);
			const dto = await firstValueFrom(
				this.operationsApi.cancelService(incidentId, payload)
			);
			const operation = toIncidentOperationState(dto);

			this.removeOperationIfClosed(operation);
			this.selectedOperation.set(operation);
			await Promise.all([
				this.loadOperationHistory(incidentId),
				this.loadTechnicians(),
			]);

			return operation;
		} catch (error) {
			this.actionError.set(error as AppHttpError);
			return null;
		} finally {
			this.finishAction(incidentId);
		}
	}

	isActionLoading(incidentId: string): boolean {
		return this.actionLoadingIncidentIds().includes(incidentId);
	}

	clearActiveOperationsError(): void {
		this.activeOperationsError.set(null);
	}

	clearSelectedOperation(): void {
		this.selectedOperation.set(null);
		this.operationHistory.set([]);
		this.operationHistoryMeta.set(null);
	}

	clearSelectedOperationError(): void {
		this.selectedOperationError.set(null);
	}

	clearActionError(): void {
		this.actionError.set(null);
	}

	private upsertOperation(operation: IncidentOperationState): void {
		if (operation.status === "COMPLETED" || operation.status === "CANCELLED") {
			this.removeOperationIfClosed(operation);
			return;
		}

		this.activeOperations.update(current => {
			const exists = current.some(item => item.incidentId === operation.incidentId);

			if (exists) {
				return current.map(item =>
					item.incidentId === operation.incidentId ? operation : item
				);
			}

			return [operation, ...current];
		});

		this.activeOperationsMeta.set({
			count: this.activeOperations().length,
		});
	}

	private removeOperationIfClosed(operation: IncidentOperationState): void {
		this.activeOperations.update(current =>
			current.filter(item => item.incidentId !== operation.incidentId)
		);

		this.activeOperationsMeta.set({
			count: this.activeOperations().length,
		});
	}

	private startAction(incidentId: string): void {
		this.actionError.set(null);
		this.actionLoadingIncidentIds.update(ids =>
			ids.includes(incidentId) ? ids : [...ids, incidentId]
		);
	}

	private finishAction(incidentId: string): void {
		this.actionLoadingIncidentIds.update(ids =>
			ids.filter(id => id !== incidentId)
		);
	}
}
