import { CommonModule } from "@angular/common";
import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { toast } from "@spartan-ng/brain/sonner";

import {
	AssignmentCandidate,
	PlatformIncident,
	PlatformIncidentCategory,
	PlatformIncidentPriority,
	PlatformIncidentStatus,
	PlatformProcessingStatus,
} from "../../models/platform-assignment.types";
import { PlatformAssignmentStore } from "../../store/platform-assignment.store";

@Component({
	selector: "app-platform-assignment-page",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterLink],
	templateUrl: "./platform-assignment-page.html",
	styleUrl: "./platform-assignment-page.css",
})
export class PlatformAssignmentPage implements OnInit {
	readonly store = inject(PlatformAssignmentStore);
	private readonly fb = inject(FormBuilder);

	readonly statusFilter = signal<string>("ALL");
	readonly candidateDetailOpen = signal(false);
	readonly selectedCandidate = signal<AssignmentCandidate | null>(null);

	readonly incidentFiltersForm = this.fb.nonNullable.group({
		limit: [50, [Validators.required, Validators.min(1), Validators.max(100)]],
		offset: [0, [Validators.required, Validators.min(0)]],
	});

	readonly filteredIncidents = computed(() => {
		const status = this.statusFilter();
		const incidents = this.store.incidents();

		if (status === "ALL") {
			return incidents;
		}

		if (status === "ASSIGNABLE") {
			return incidents.filter(incident =>
				["PENDING", "IN_REVIEW", "PUBLISHED"].includes(incident.status)
			);
		}

		return incidents.filter(incident => incident.status === status);
	});

	async ngOnInit(): Promise<void> {
		await this.store.loadIncidents(this.incidentFiltersForm.getRawValue());

		const selected = this.store.selectedIncident();

		if (selected) {
			await this.store.loadCandidates(selected.id);
		}
	}

	async onRefresh(): Promise<void> {
		await this.store.loadIncidents(this.incidentFiltersForm.getRawValue());
		await this.store.reloadSelectedIncident();
	}

	async onRetry(): Promise<void> {
		this.store.clearIncidentsError();
		await this.store.loadIncidents(this.incidentFiltersForm.getRawValue());
	}

	async onLoadIncidents(): Promise<void> {
		if (this.incidentFiltersForm.invalid) {
			this.incidentFiltersForm.markAllAsTouched();
			return;
		}

		await this.store.loadIncidents(this.incidentFiltersForm.getRawValue());
	}

	async onSelectIncident(incident: PlatformIncident): Promise<void> {
		await this.store.selectIncident(incident.id);
	}

	async onPublishIncident(): Promise<void> {
		const result = await this.store.publishSelectedIncident();

		if (!result) {
			toast("No se pudo publicar el incidente", {
				description:
					this.store.publishError()?.message || "Ocurrió un error inesperado.",
			});
			return;
		}

		toast.success("Incidente publicado para asignación", {
			description: `Candidatos generados: ${result.publishedCandidatesCount}`,
		});
	}

	async onReloadCandidates(): Promise<void> {
		const incidentId = this.store.selectedIncidentId();

		if (!incidentId) {
			return;
		}

		await this.store.loadCandidates(incidentId);
	}

	onChangeStatusFilter(event: Event): void {
		const select = event.target as HTMLSelectElement;
		this.statusFilter.set(select.value);
	}

	onOpenCandidateDetail(candidate: AssignmentCandidate): void {
		this.selectedCandidate.set(candidate);
		this.candidateDetailOpen.set(true);
	}

	onCloseCandidateDetail(): void {
		this.selectedCandidate.set(null);
		this.candidateDetailOpen.set(false);
	}

	isSelectedIncident(incident: PlatformIncident): boolean {
		return this.store.selectedIncidentId() === incident.id;
	}

	getIncidentStatusLabel(status: PlatformIncidentStatus): string {
		switch (status) {
			case "PENDING":
				return "Pendiente";
			case "IN_REVIEW":
				return "En revisión";
			case "PUBLISHED":
				return "Publicado";
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
			default:
				return status;
		}
	}

	getPriorityLabel(priority: PlatformIncidentPriority | null): string {
		switch (priority) {
			case "LOW":
				return "Baja";
			case "MEDIUM":
				return "Media";
			case "HIGH":
				return "Alta";
			case "CRITICAL":
				return "Crítica";
			default:
				return priority ? String(priority) : "Sin prioridad";
		}
	}

	getCategoryLabel(category: PlatformIncidentCategory | null): string {
		switch (category) {
			case "BATTERY":
				return "Batería";
			case "TIRE":
				return "Llanta";
			case "ACCIDENT":
				return "Accidente";
			case "ENGINE":
				return "Motor";
			case "LOCKOUT":
				return "Llave/Bloqueo";
			case "OVERHEATING":
				return "Sobrecalentamiento";
			case "UNCERTAIN":
				return "Incierto";
			case "OTHER":
				return "Otro";
			default:
				return category ? String(category) : "Sin categoría";
		}
	}

	getProcessingLabel(status: PlatformProcessingStatus): string {
		switch (status) {
			case "NOT_REQUESTED":
				return "No solicitado";
			case "PENDING":
				return "Pendiente";
			case "RUNNING":
				return "Procesando";
			case "SUCCEEDED":
				return "Completado";
			case "FAILED":
				return "Fallido";
			default:
				return status;
		}
	}

	getStatusBadgeClass(status: string): string {
		switch (status) {
			case "COMPLETED":
				return "bg-emerald-100 text-emerald-700";
			case "ASSIGNED":
			case "PUBLISHED":
			case "AVAILABLE":
				return "bg-blue-100 text-blue-700";
			case "PENDING":
			case "IN_REVIEW":
			case "EN_ROUTE":
				return "bg-orange-100 text-orange-700";
			case "ON_SITE":
			case "ARRIVED":
			case "IN_PROGRESS":
				return "bg-purple-100 text-purple-700";
			case "CANCELLED":
			case "REJECTED":
			case "EXPIRED":
				return "bg-red-100 text-red-700";
			case "ACCEPTED":
				return "bg-emerald-100 text-emerald-700";
			default:
				return "bg-slate-100 text-slate-700";
		}
	}

	getPriorityBadgeClass(priority: PlatformIncidentPriority | null): string {
		switch (priority) {
			case "LOW":
				return "bg-slate-100 text-slate-700";
			case "MEDIUM":
				return "bg-blue-100 text-blue-700";
			case "HIGH":
				return "bg-orange-100 text-orange-700";
			case "CRITICAL":
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

	formatDistance(value: number | null): string {
		if (value === null || value === undefined) {
			return "Sin distancia";
		}

		return `${value.toFixed(2)} km`;
	}

	formatScore(value: number | null | undefined): string {
		if (value === null || value === undefined) {
			return "0.00";
		}

		return value.toFixed(2);
	}

	formatRating(value: number | null | undefined): string {
		if (value === null || value === undefined) {
			return "Sin rating";
		}

		return `${value.toFixed(2)} / 5`;
	}
}
