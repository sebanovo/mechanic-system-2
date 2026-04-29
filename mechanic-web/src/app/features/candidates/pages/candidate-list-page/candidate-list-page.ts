import { CommonModule } from "@angular/common";
import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { toast } from "@spartan-ng/brain/sonner";

import {
	AssignmentCandidate,
	CandidatePriority,
	CandidateStatus,
} from "../../models/candidate.types";
import { CandidatesStore } from "../../store/candidate.store";

type CandidateDetailTab = "summary" | "ai" | "provider" | "rationale";

@Component({
	selector: "app-candidate-list-page",
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: "./candidate-list-page.html",
	styleUrl: "./candidate-list-page.css",
})
export class CandidateListPage implements OnInit {
	readonly store = inject(CandidatesStore);

	readonly detailOpen = signal(false);
	readonly activeTab = signal<CandidateDetailTab>("summary");

	readonly selectedCandidate = computed(() => this.store.selectedCandidate());

	async ngOnInit(): Promise<void> {
		await this.store.loadAvailableCandidates();
	}

	async onRetry(): Promise<void> {
		this.store.clearError();
		await this.store.loadAvailableCandidates();
	}

	async onRefresh(): Promise<void> {
		await this.store.loadAvailableCandidates();
	}

	async onViewCandidate(candidate: AssignmentCandidate): Promise<void> {
		this.store.clearSelectedCandidateError();
		this.store.clearSelectedCandidate();
		this.activeTab.set("summary");
		this.detailOpen.set(true);

		const loaded = await this.store.loadAvailableCandidateById(candidate.id);

		if (!loaded) {
			toast("No se pudo cargar el detalle", {
				description:
					this.store.selectedCandidateError()?.message ||
					"Ocurrió un error inesperado.",
			});
		}
	}

	onCloseDetail(): void {
		this.detailOpen.set(false);
		this.activeTab.set("summary");
		this.store.clearSelectedCandidate();
		this.store.clearSelectedCandidateError();
	}

	setActiveTab(tab: CandidateDetailTab): void {
		this.activeTab.set(tab);
	}

	async onAcceptCandidate(candidate: AssignmentCandidate): Promise<void> {
		const result = await this.store.acceptCandidate(candidate.id);

		if (!result) {
			toast("No se pudo aceptar la solicitud", {
				description:
					this.store.acceptingCandidateError()?.message ||
					"Ocurrió un error inesperado.",
			});
			return;
		}

		toast.success("Solicitud aceptada correctamente", {
			description: "Ahora puedes continuar con operaciones del taller.",
		});

		this.onCloseDetail();
	}

	async onRejectCandidate(candidate: AssignmentCandidate): Promise<void> {
		const result = await this.store.rejectCandidate(candidate.id);

		if (!result) {
			toast("No se pudo rechazar la solicitud", {
				description:
					this.store.rejectingCandidateError()?.message ||
					"Ocurrió un error inesperado.",
			});
			return;
		}

		toast.success("Solicitud rechazada correctamente");

		this.onCloseDetail();
	}

	canAct(candidate: AssignmentCandidate): boolean {
		return candidate.status === "AVAILABLE" && !this.store.isCandidateActing(candidate.id);
	}

	isCandidateActing(candidate: AssignmentCandidate): boolean {
		return this.store.isCandidateActing(candidate.id);
	}

	getPriorityLabel(priority: CandidatePriority | null): string {
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

	getStatusLabel(status: CandidateStatus): string {
		switch (status) {
			case "AVAILABLE":
				return "Disponible";
			case "ACCEPTED":
				return "Aceptado";
			case "REJECTED":
				return "Rechazado";
			case "EXPIRED":
				return "Expirado";
			default:
				return status;
		}
	}

	getPriorityBadgeClass(priority: CandidatePriority | null): string {
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

	getStatusBadgeClass(status: CandidateStatus): string {
		switch (status) {
			case "AVAILABLE":
				return "bg-emerald-100 text-emerald-700";
			case "ACCEPTED":
				return "bg-blue-100 text-blue-700";
			case "REJECTED":
				return "bg-red-100 text-red-700";
			case "EXPIRED":
				return "bg-slate-200 text-slate-700";
			default:
				return "bg-slate-100 text-slate-700";
		}
	}

	formatDistance(distanceKm: number | null): string {
		if (distanceKm === null || distanceKm === undefined) {
			return "Sin distancia";
		}

		return `${distanceKm.toFixed(2)} km`;
	}

	formatScore(score: number): string {
		return `${Math.round(score * 100) / 100}`;
	}

	formatCoordinate(value: number | null): string {
		if (value === null || value === undefined) {
			return "No registrada";
		}

		return value.toFixed(6);
	}

	rationaleEntries(candidate: AssignmentCandidate | null): Array<{
		key: string;
		value: string;
	}> {
		if (!candidate) {
			return [];
		}

		return Object.entries(candidate.rationale ?? {}).map(([key, value]) => ({
			key,
			value:
				typeof value === "object"
					? JSON.stringify(value)
					: String(value ?? "Sin valor"),
		}));
	}
}
