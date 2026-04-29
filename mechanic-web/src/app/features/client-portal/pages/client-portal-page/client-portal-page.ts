import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { toast } from "@spartan-ng/brain/sonner";

import {
	EvidenceType,
	Incident,
	IncidentCategory,
	IncidentPriority,
	IncidentStatus,
	ProcessingStatus,
	Vehicle,
	VehicleType,
} from "../../models/client-portal.types";
import { ClientPortalStore } from "../../store/client-portal.store";

@Component({
	selector: "app-client-portal-page",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterLink],
	templateUrl: "./client-portal-page.html",
	styleUrl: "./client-portal-page.css",
})
export class ClientPortalPage implements OnInit {
	readonly store = inject(ClientPortalStore);
	private readonly fb = inject(FormBuilder);

	readonly selectedFile = signal<File | null>(null);
	readonly selectedFileName = signal<string>("");

	readonly vehicleForm = this.fb.nonNullable.group({
		plateNumber: ["ABC1234", [Validators.required, Validators.minLength(3)]],
		vehicleType: ["CAR" as VehicleType, [Validators.required]],
		brand: ["Toyota", [Validators.required, Validators.minLength(2)]],
		model: ["Corolla", [Validators.required, Validators.minLength(1)]],
		year: [2015, [Validators.min(1950), Validators.max(2100)]],
		color: ["Blanco"],
		notes: ["Vehículo registrado desde demo web."],
	});

	readonly incidentForm = this.fb.nonNullable.group({
		vehicleId: ["", [Validators.required]],
		reportedCategory: ["BATTERY" as IncidentCategory, [Validators.required]],
		priority: ["MEDIUM" as IncidentPriority, [Validators.required]],
		title: ["Mi auto no enciende", [Validators.required, Validators.minLength(3)]],
		description: [
			"Estoy en un estacionamiento y el vehículo no responde al intentar arrancar.",
			[Validators.required, Validators.minLength(5)],
		],
		incidentLatitude: [-17.7863, [Validators.min(-90), Validators.max(90)]],
		incidentLongitude: [-63.1812, [Validators.min(-180), Validators.max(180)]],
		addressReference: ["Estacionamiento cerca del centro"],
	});

	readonly textEvidenceForm = this.fb.nonNullable.group({
		description: ["Detalle adicional escrito por el cliente."],
		textContent: [
			"El vehículo no enciende, parece batería descargada. Las luces del tablero se ven débiles.",
			[Validators.required, Validators.minLength(3)],
		],
	});

	readonly fileEvidenceForm = this.fb.nonNullable.group({
		evidenceType: ["IMAGE" as Exclude<EvidenceType, "TEXT">, [Validators.required]],
		description: ["Foto o audio enviado desde el portal web."],
	});

	async ngOnInit(): Promise<void> {
		await this.store.loadWorkspace();
		this.patchDefaultVehicle();
	}

	async onRefresh(): Promise<void> {
		await this.store.loadWorkspace();
		this.patchDefaultVehicle();
	}

	async onRetry(): Promise<void> {
		this.store.clearVehiclesError();
		this.store.clearIncidentsError();
		await this.store.loadWorkspace();
		this.patchDefaultVehicle();
	}

	async onCreateVehicle(): Promise<void> {
		if (this.vehicleForm.invalid) {
			this.vehicleForm.markAllAsTouched();
			return;
		}

		const value = this.vehicleForm.getRawValue();

		const vehicle = await this.store.createVehicle({
			plateNumber: value.plateNumber,
			vehicleType: value.vehicleType,
			brand: value.brand,
			model: value.model,
			year: this.toNullableNumber(value.year),
			color: value.color || null,
			notes: value.notes || null,
		});

		if (!vehicle) {
			toast("No se pudo crear el vehículo", {
				description:
					this.store.createVehicleError()?.message ||
					"Ocurrió un error inesperado.",
			});
			return;
		}

		this.incidentForm.patchValue({
			vehicleId: vehicle.id,
		});

		toast.success("Vehículo creado correctamente");
	}

	async onCreateIncident(): Promise<void> {
		if (this.incidentForm.invalid) {
			this.incidentForm.markAllAsTouched();
			return;
		}

		const value = this.incidentForm.getRawValue();

		const incident = await this.store.createIncident({
			vehicleId: value.vehicleId,
			reportedCategory: value.reportedCategory,
			priority: value.priority,
			title: value.title,
			description: value.description,
			incidentLatitude: this.toNullableNumber(value.incidentLatitude),
			incidentLongitude: this.toNullableNumber(value.incidentLongitude),
			addressReference: value.addressReference || null,
		});

		if (!incident) {
			toast("No se pudo crear la emergencia", {
				description:
					this.store.createIncidentError()?.message ||
					"Ocurrió un error inesperado.",
			});
			return;
		}

		toast.success("Emergencia registrada correctamente", {
			description: "Ahora puedes adjuntar texto, imagen o audio.",
		});
	}

	async onSelectIncident(incident: Incident): Promise<void> {
		await this.store.selectIncident(incident.id);
	}

	async onCreateTextEvidence(): Promise<void> {
		if (this.textEvidenceForm.invalid) {
			this.textEvidenceForm.markAllAsTouched();
			return;
		}

		if (!this.store.selectedIncidentId()) {
			toast("Selecciona un incidente primero");
			return;
		}

		const value = this.textEvidenceForm.getRawValue();

		const evidence = await this.store.createTextEvidence({
			description: value.description || null,
			textContent: value.textContent,
		});

		if (!evidence) {
			toast("No se pudo registrar evidencia textual", {
				description:
					this.store.createTextEvidenceError()?.message ||
					"Ocurrió un error inesperado.",
			});
			return;
		}

		toast.success("Evidencia textual registrada correctamente");
	}

	onFileSelected(event: Event): void {
		const input = event.target as HTMLInputElement;
		const file = input.files?.item(0) ?? null;

		this.selectedFile.set(file);
		this.selectedFileName.set(file?.name ?? "");
	}

	async onUploadFileEvidence(): Promise<void> {
		if (this.fileEvidenceForm.invalid) {
			this.fileEvidenceForm.markAllAsTouched();
			return;
		}

		if (!this.store.selectedIncidentId()) {
			toast("Selecciona un incidente primero");
			return;
		}

		const file = this.selectedFile();

		if (!file) {
			toast("Selecciona un archivo", {
				description: "Puedes adjuntar una imagen JPG/PNG o un audio MP3/WAV/M4A.",
			});
			return;
		}

		const value = this.fileEvidenceForm.getRawValue();

		const evidence = await this.store.uploadFileEvidence({
			evidenceType: value.evidenceType,
			description: value.description || null,
			file,
		});

		if (!evidence) {
			toast("No se pudo subir la evidencia", {
				description:
					this.store.uploadFileEvidenceError()?.message ||
					"Ocurrió un error inesperado.",
			});
			return;
		}

		this.selectedFile.set(null);
		this.selectedFileName.set("");

		toast.success("Evidencia subida correctamente");
	}

	async onCancelIncident(incident: Incident): Promise<void> {
		const cancelled = await this.store.cancelIncident(incident.id);

		if (!cancelled) {
			toast("No se pudo cancelar el incidente", {
				description:
					this.store.cancelIncidentError()?.message ||
					"Ocurrió un error inesperado.",
			});
			return;
		}

		toast.success("Incidente cancelado correctamente");
	}

	canCancelIncident(incident: Incident): boolean {
		return !["COMPLETED", "CANCELLED", "IN_PROGRESS"].includes(incident.status);
	}

	isSelectedIncident(incident: Incident): boolean {
		return this.store.selectedIncidentId() === incident.id;
	}

	getVehicleLabel(vehicle: Vehicle): string {
		return `${vehicle.plateNumber} · ${vehicle.brand} ${vehicle.model}`;
	}

	getStatusLabel(status: IncidentStatus): string {
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
				return "Atendido";
			case "CANCELLED":
				return "Cancelado";
			default:
				return status;
		}
	}

	getCategoryLabel(category: IncidentCategory | null): string {
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
				return "Sin categoría";
		}
	}

	getPriorityLabel(priority: IncidentPriority | null): string {
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
				return "Sin prioridad";
		}
	}

	getEvidenceTypeLabel(type: EvidenceType): string {
		switch (type) {
			case "TEXT":
				return "Texto";
			case "IMAGE":
				return "Imagen";
			case "AUDIO":
				return "Audio";
			default:
				return type;
		}
	}

	getProcessingLabel(status: ProcessingStatus): string {
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

	getStatusBadgeClass(status: IncidentStatus): string {
		switch (status) {
			case "COMPLETED":
				return "bg-emerald-100 text-emerald-700";
			case "ASSIGNED":
			case "PUBLISHED":
				return "bg-blue-100 text-blue-700";
			case "EN_ROUTE":
			case "PENDING":
			case "IN_REVIEW":
				return "bg-orange-100 text-orange-700";
			case "IN_PROGRESS":
			case "ON_SITE":
			case "ARRIVED":
				return "bg-purple-100 text-purple-700";
			case "CANCELLED":
				return "bg-red-100 text-red-700";
			default:
				return "bg-slate-100 text-slate-700";
		}
	}

	getPriorityBadgeClass(priority: IncidentPriority | null): string {
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

	getEvidenceBadgeClass(type: EvidenceType): string {
		switch (type) {
			case "TEXT":
				return "bg-slate-100 text-slate-700";
			case "IMAGE":
				return "bg-blue-100 text-blue-700";
			case "AUDIO":
				return "bg-purple-100 text-purple-700";
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

	formatEta(value: number | null): string {
		if (value === null || value === undefined) {
			return "Sin ETA";
		}

		return `${Math.round(value)} min`;
	}

	private patchDefaultVehicle(): void {
		const firstVehicle = this.store.vehicles()[0];

		if (firstVehicle && !this.incidentForm.controls.vehicleId.value) {
			this.incidentForm.patchValue({
				vehicleId: firstVehicle.id,
			});
		}
	}

	private toNullableNumber(value: number): number | null {
		const normalized = Number(value);

		if (!Number.isFinite(normalized)) {
			return null;
		}

		return normalized;
	}
}
