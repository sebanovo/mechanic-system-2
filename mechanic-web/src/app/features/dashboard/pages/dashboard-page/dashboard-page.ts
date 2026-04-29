import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { toast } from "@spartan-ng/brain/sonner";

import { DashboardStore } from "../../store/dashboard.store";

@Component({
	selector: "app-dashboard-page",
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: "./dashboard-page.html",
	styleUrl: "./dashboard-page.css",
})
export class DashboardPage implements OnInit {
	readonly store = inject(DashboardStore);

	async ngOnInit(): Promise<void> {
		await this.store.loadDashboard();
	}

	async onRefresh(): Promise<void> {
		await this.store.loadDashboard();
	}

	async onRetry(): Promise<void> {
		this.store.clearError();
		await this.store.loadDashboard();
	}

	async onCreateSnapshot(): Promise<void> {
		const success = await this.store.createSnapshot();

		if (!success) {
			toast("No se pudo crear snapshot", {
				description:
					this.store.snapshotError()?.message || "Ocurrió un error inesperado.",
			});
			return;
		}

		toast.success("Snapshot de métricas creado correctamente");
	}

	formatMoney(value: number | null | undefined): string {
		if (value === null || value === undefined) {
			return "BOB 0.00";
		}

		return `BOB ${value.toFixed(2)}`;
	}

	formatSeconds(value: number | null | undefined): string {
		if (value === null || value === undefined) {
			return "Sin datos";
		}

		if (value < 60) {
			return `${Math.round(value)} seg`;
		}

		return `${Math.round(value / 60)} min`;
	}

	statusEntries(record: Record<string, number> | null | undefined): Array<{
		key: string;
		value: number;
	}> {
		return Object.entries(record ?? {}).map(([key, value]) => ({
			key,
			value,
		}));
	}

	getStatusLabel(status: string): string {
		switch (status) {
			case "PENDING":
				return "Pendiente";
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
			case "FAILED":
				return "Fallido";
			case "SUCCESS":
				return "Exitoso";
			case "PAID":
				return "Pagado";
			default:
				return status;
		}
	}

	getStatusBadgeClass(status: string): string {
		switch (status) {
			case "COMPLETED":
			case "SUCCESS":
			case "PAID":
				return "bg-emerald-100 text-emerald-700";
			case "ASSIGNED":
			case "PUBLISHED":
				return "bg-blue-100 text-blue-700";
			case "EN_ROUTE":
			case "PENDING":
				return "bg-orange-100 text-orange-700";
			case "IN_PROGRESS":
			case "ON_SITE":
			case "ARRIVED":
				return "bg-purple-100 text-purple-700";
			case "CANCELLED":
			case "FAILED":
				return "bg-red-100 text-red-700";
			default:
				return "bg-slate-100 text-slate-700";
		}
	}
}
