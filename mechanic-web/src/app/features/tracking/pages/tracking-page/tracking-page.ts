import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { toast } from "@spartan-ng/brain/sonner";

import {
	TrackingOperation,
	TrackingOperationStatus,
	TrackingPriority,
} from "../../models/tracking.types";
import { TrackingStore } from "../../store/tracking.store";

@Component({
	selector: "app-tracking-page",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterLink],
	templateUrl: "./tracking-page.html",
	styleUrl: "./tracking-page.css",
})
export class TrackingPage implements OnInit {
	readonly store = inject(TrackingStore);
	private readonly fb = inject(FormBuilder);

	readonly locationForm = this.fb.nonNullable.group({
		latitude: [0, [Validators.required, Validators.min(-90), Validators.max(90)]],
		longitude: [
			0,
			[Validators.required, Validators.min(-180), Validators.max(180)],
		],
		accuracyMeters: [0, [Validators.min(0)]],
		speedKmh: [0, [Validators.min(0)]],
		headingDegrees: [0, [Validators.min(0), Validators.max(360)]],
		note: ["Ubicación actualizada desde panel web."],
	});

	async ngOnInit(): Promise<void> {
		await this.store.loadTrackingWorkspace();
		this.patchLocationFromLiveOrOperation();
	}

	async onRefresh(): Promise<void> {
		await this.store.loadTrackingWorkspace();
		this.patchLocationFromLiveOrOperation();
	}

	async onRetry(): Promise<void> {
		this.store.clearOperationsError();
		await this.store.loadTrackingWorkspace();
		this.patchLocationFromLiveOrOperation();
	}

	async onSelectOperation(operation: TrackingOperation): Promise<void> {
		await this.store.selectIncident(operation.incidentId);
		this.patchLocationFromLiveOrOperation();
	}

	async onRefreshLive(): Promise<void> {
		const incidentId = this.store.selectedIncidentId();

		if (!incidentId) {
			return;
		}

		const live = await this.store.loadLiveTracking(incidentId);

		if (!live) {
			toast("No se pudo actualizar el tracking", {
				description:
					this.store.liveTrackingError()?.message ||
					"Ocurrió un error inesperado.",
			});
			return;
		}

		this.patchLocationFromLiveOrOperation();
		toast.success("Tracking actualizado");
	}

	async onRefreshRoute(): Promise<void> {
		const result = await this.store.refreshRoute();

		if (!result) {
			toast("No se pudo recalcular la ruta", {
				description:
					this.store.refreshingRouteError()?.message ||
					"Ocurrió un error inesperado.",
			});
			return;
		}

		toast.success("Ruta recalculada correctamente");
	}

	async onUpdateLocation(): Promise<void> {
		if (this.locationForm.invalid) {
			this.locationForm.markAllAsTouched();
			return;
		}

		const value = this.locationForm.getRawValue();

		const result = await this.store.updateLocation({
			latitude: Number(value.latitude),
			longitude: Number(value.longitude),
			accuracyMeters: this.toNullableNumber(value.accuracyMeters),
			speedKmh: this.toNullableNumber(value.speedKmh),
			headingDegrees: this.toNullableNumber(value.headingDegrees),
			note: value.note || null,
		});

		if (!result) {
			toast("No se pudo actualizar ubicación", {
				description:
					this.store.updatingLocationError()?.message ||
					"Ocurrió un error inesperado.",
			});
			return;
		}

		toast.success("Ubicación actualizada correctamente");
	}

	getStatusLabel(status: TrackingOperationStatus | string | null): string {
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
				return status ? String(status) : "Sin estado";
		}
	}

	getPriorityLabel(priority: TrackingPriority | null | undefined): string {
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

	getStatusBadgeClass(status: TrackingOperationStatus | string | null): string {
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

	getPriorityBadgeClass(priority: TrackingPriority | null | undefined): string {
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

	isSelected(operation: TrackingOperation): boolean {
		return this.store.selectedIncidentId() === operation.incidentId;
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

	formatEta(value: number | null): string {
		if (value === null || value === undefined) {
			return "Sin ETA";
		}

		return `${Math.round(value)} min`;
	}

	private patchLocationFromLiveOrOperation(): void {
		const live = this.store.liveTracking();
		const operation = this.store.selectedOperation();

		const latitude =
			live?.technicianLatitude ??
			operation?.assignedTechnician?.currentLatitude ??
			operation?.incidentLatitude ??
			0;

		const longitude =
			live?.technicianLongitude ??
			operation?.assignedTechnician?.currentLongitude ??
			operation?.incidentLongitude ??
			0;

		this.locationForm.patchValue({
			latitude,
			longitude,
			accuracyMeters: 0,
			speedKmh: 0,
			headingDegrees: 0,
			note: "Ubicación actualizada desde panel web.",
		});
	}

	private toNullableNumber(value: number): number | null {
		const numberValue = Number(value);

		if (!Number.isFinite(numberValue) || numberValue === 0) {
			return null;
		}

		return numberValue;
	}
}
