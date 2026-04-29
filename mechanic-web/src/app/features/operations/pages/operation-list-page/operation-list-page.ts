import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { toast } from "@spartan-ng/brain/sonner";

import {
	CompleteIncidentFormValue,
	IncidentOperationState,
	OperationNoteFormValue,
	OperationPriority,
	OperationStatus,
} from "../../models/operation.types";
import { OperationsStore } from "../../store/operation.store";

type OperationDetailTab = "summary" | "client" | "ai" | "history";
type OperationAction =
	| "none"
	| "dispatch"
	| "arrive"
	| "start"
	| "complete"
	| "cancel";

@Component({
	selector: "app-operation-list-page",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterLink],
	templateUrl: "./operation-list-page.html",
	styleUrl: "./operation-list-page.css",
})
export class OperationListPage implements OnInit {
	readonly store = inject(OperationsStore);
	private readonly fb = inject(FormBuilder);

	readonly detailOpen = signal(false);
	readonly activeTab = signal<OperationDetailTab>("summary");
	readonly activeAction = signal<OperationAction>("none");

	readonly dispatchForm = this.fb.nonNullable.group({
		technicianId: ["", [Validators.required]],
		note: ["Se despacha técnico disponible hacia la ubicación del cliente."],
	});

	readonly noteForm = this.fb.nonNullable.group({
		note: ["", [Validators.maxLength(1000)]],
	});

	readonly completeForm = this.fb.nonNullable.group({
		note: ["Servicio finalizado correctamente.", [Validators.maxLength(1000)]],
		completionSummary: [
			"Se completó la atención del incidente.",
			[Validators.required, Validators.maxLength(3000)],
		],
	});

	async ngOnInit(): Promise<void> {
		await this.store.loadWorkspace();
	}

	async onRefresh(): Promise<void> {
		await this.store.loadWorkspace();
	}

	async onRetry(): Promise<void> {
		this.store.clearActiveOperationsError();
		await this.store.loadWorkspace();
	}

	async onOpenDetail(operation: IncidentOperationState): Promise<void> {
		this.store.clearSelectedOperationError();
		this.store.clearSelectedOperation();
		this.detailOpen.set(true);
		this.activeTab.set("summary");
		this.activeAction.set("none");

		await this.store.loadOperationDetail(operation.incidentId);
	}

	onCloseDetail(): void {
		this.detailOpen.set(false);
		this.activeAction.set("none");
		this.activeTab.set("summary");
		this.store.clearSelectedOperation();
		this.store.clearSelectedOperationError();
		this.store.clearActionError();
	}

	async onOpenAction(
		operation: IncidentOperationState,
		action: OperationAction
	): Promise<void> {
		this.store.clearActionError();

		if (!this.detailOpen()) {
			await this.onOpenDetail(operation);
		} else if (this.store.selectedOperation()?.incidentId !== operation.incidentId) {
			await this.store.loadOperationDetail(operation.incidentId);
		}

		this.resetActionForms(operation, action);
		this.activeAction.set(action);
		this.activeTab.set("summary");
	}

	onCancelAction(): void {
		this.activeAction.set("none");
		this.store.clearActionError();
	}

	async onDispatch(): Promise<void> {
		const operation = this.store.selectedOperation();

		if (!operation) {
			return;
		}

		if (this.dispatchForm.invalid) {
			this.dispatchForm.markAllAsTouched();
			return;
		}

		const value = this.dispatchForm.getRawValue();

		const updated = await this.store.dispatchIncident(operation.incidentId, {
			technicianId: value.technicianId,
			note: value.note,
		});

		if (!updated) {
			this.showActionError("No se pudo despachar el técnico");
			return;
		}

		this.activeAction.set("none");
		toast.success("Técnico despachado correctamente");
	}

	async onArrive(): Promise<void> {
		const operation = this.store.selectedOperation();

		if (!operation) {
			return;
		}

		const value = this.noteForm.getRawValue();

		const updated = await this.store.markArrival(operation.incidentId, {
			note: value.note,
		});

		if (!updated) {
			this.showActionError("No se pudo marcar llegada");
			return;
		}

		this.activeAction.set("none");
		toast.success("Llegada registrada correctamente");
	}

	async onStart(): Promise<void> {
		const operation = this.store.selectedOperation();

		if (!operation) {
			return;
		}

		const value = this.noteForm.getRawValue();

		const updated = await this.store.startService(operation.incidentId, {
			note: value.note,
		});

		if (!updated) {
			this.showActionError("No se pudo iniciar el servicio");
			return;
		}

		this.activeAction.set("none");
		toast.success("Servicio iniciado correctamente");
	}

	async onComplete(): Promise<void> {
		const operation = this.store.selectedOperation();

		if (!operation) {
			return;
		}

		if (this.completeForm.invalid) {
			this.completeForm.markAllAsTouched();
			return;
		}

		const value = this.completeForm.getRawValue();

		const payload: CompleteIncidentFormValue = {
			note: value.note,
			completionSummary: value.completionSummary,
		};

		const updated = await this.store.completeService(
			operation.incidentId,
			payload
		);

		if (!updated) {
			this.showActionError("No se pudo completar el servicio");
			return;
		}

		this.activeAction.set("none");
		toast.success("Servicio completado correctamente", {
			description: "El caso queda listo para cobro/facturación.",
		});
	}

	async onCancelService(): Promise<void> {
		const operation = this.store.selectedOperation();

		if (!operation) {
			return;
		}

		const value = this.noteForm.getRawValue();

		const payload: OperationNoteFormValue = {
			note: value.note || "Servicio cancelado desde panel del taller.",
		};

		const updated = await this.store.cancelService(operation.incidentId, payload);

		if (!updated) {
			this.showActionError("No se pudo cancelar el servicio");
			return;
		}

		this.activeAction.set("none");
		toast.success("Servicio cancelado correctamente");
	}

	setActiveTab(tab: OperationDetailTab): void {
		this.activeTab.set(tab);
	}

	canDispatch(operation: IncidentOperationState): boolean {
		return operation.status === "ASSIGNED";
	}

	canArrive(operation: IncidentOperationState): boolean {
		return operation.status === "EN_ROUTE";
	}

	canStart(operation: IncidentOperationState): boolean {
		return operation.status === "EN_ROUTE" || operation.status === "ON_SITE";
	}

	canComplete(operation: IncidentOperationState): boolean {
		return operation.status === "ON_SITE" || operation.status === "IN_PROGRESS";
	}

	canCancel(operation: IncidentOperationState): boolean {
		return ["ASSIGNED", "EN_ROUTE", "ON_SITE", "IN_PROGRESS"].includes(
			operation.status
		);
	}

	isActionLoading(operation: IncidentOperationState): boolean {
		return this.store.isActionLoading(operation.incidentId);
	}

	getStatusLabel(status: OperationStatus): string {
		switch (status) {
			case "ASSIGNED":
				return "Asignado";
			case "EN_ROUTE":
				return "En camino";
			case "ON_SITE":
			case "ARRIVED":
				return "En sitio";
			case "IN_PROGRESS":
				return "En proceso";
			case "COMPLETED":
				return "Completado";
			case "CANCELLED":
				return "Cancelado";
			case "PENDING":
				return "Pendiente";
			case "PUBLISHED":
				return "Publicado";
			default:
				return status;
		}
	}

	getPriorityLabel(priority: OperationPriority | null): string {
		switch (priority) {
			case "LOW":
				return "Baja";
			case "MEDIUM":
				return "Media";
			case "HIGH":
				return "Alta";
			case "CRITICAL":
				return "Crítica";
			case "URGENT":
				return "Urgente";
			default:
				return "Sin prioridad";
		}
	}

	getStatusBadgeClass(status: OperationStatus): string {
		switch (status) {
			case "ASSIGNED":
				return "bg-blue-100 text-blue-700";
			case "EN_ROUTE":
				return "bg-orange-100 text-orange-700";
			case "ON_SITE":
			case "ARRIVED":
				return "bg-purple-100 text-purple-700";
			case "IN_PROGRESS":
				return "bg-emerald-100 text-emerald-700";
			case "COMPLETED":
				return "bg-slate-900 text-white";
			case "CANCELLED":
				return "bg-red-100 text-red-700";
			default:
				return "bg-slate-100 text-slate-700";
		}
	}

	getPriorityBadgeClass(priority: OperationPriority | null): string {
		switch (priority) {
			case "LOW":
				return "bg-slate-100 text-slate-700";
			case "MEDIUM":
				return "bg-blue-100 text-blue-700";
			case "HIGH":
				return "bg-orange-100 text-orange-700";
			case "CRITICAL":
			case "URGENT":
				return "bg-red-100 text-red-700";
			default:
				return "bg-slate-100 text-slate-700";
		}
	}

	formatCoordinate(value: number | null): string {
		if (value === null || value === undefined) {
			return "No registrada";
		}

		return value.toFixed(6);
	}

	private resetActionForms(
		operation: IncidentOperationState,
		action: OperationAction
	): void {
		if (action === "dispatch") {
			this.dispatchForm.reset({
				technicianId: "",
				note: "Se despacha técnico disponible hacia la ubicación del cliente.",
			});
			return;
		}

		if (action === "arrive") {
			this.noteForm.reset({
				note: "El técnico llegó al lugar.",
			});
			return;
		}

		if (action === "start") {
			this.noteForm.reset({
				note: "Se inicia revisión del vehículo.",
			});
			return;
		}

		if (action === "cancel") {
			this.noteForm.reset({
				note: "No se pudo atender por causa justificada.",
			});
			return;
		}

		if (action === "complete") {
			this.completeForm.reset({
				note: "Servicio finalizado correctamente.",
				completionSummary: `Se completó la atención del incidente: ${operation.title}.`,
			});
		}
	}

	private showActionError(title: string): void {
		toast(title, {
			description:
				this.store.actionError()?.message || "Ocurrió un error inesperado.",
		});
	}
}
