import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
	NonNullableFormBuilder,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { firstValueFrom } from "rxjs";
import { toast } from "@spartan-ng/brain/sonner";

import { ClientApi } from "../../../entities/client/api";
import { ClientIncident, ClientVehicle } from "../../../entities/client/model";
import { getIncidentStatusLabel } from "../../../entities/incident/model";
import { APP_ROUTES } from "../../../core/routing/app-routes.constants";
import { getApiErrorMessage } from "../../../shared/api";
import { AdminPageShell, PageHeader } from "../../../shared/custom-components";
import { HlmButtonImports } from "@shared/ui/button";
import { HlmFieldImports } from "@shared/ui/field";
import { HlmInputImports } from "@shared/ui/input";
import { HlmTextareaImports } from "@shared/ui/textarea";

@Component({
	selector: "app-edit-client-incident-page",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		AdminPageShell,
		PageHeader,
		HlmButtonImports,
		HlmFieldImports,
		HlmInputImports,
		HlmTextareaImports,
	],
	templateUrl: "./edit-client-incident.page.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditClientIncidentPage {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly clientApi = inject(ClientApi);
	private readonly router = inject(Router);
	private readonly route = inject(ActivatedRoute);

	protected readonly loading = signal(false);
	protected readonly saving = signal(false);
	protected readonly errorMessage = signal<string | null>(null);
	protected readonly incident = signal<ClientIncident | null>(null);
	protected readonly vehicles = signal<ClientVehicle[]>([]);

	protected readonly priorityOptions: { value: string; label: string }[] = [
		{ value: "LOW", label: "Baja" },
		{ value: "MEDIUM", label: "Media" },
		{ value: "HIGH", label: "Alta" },
		{ value: "CRITICAL", label: "Crítica" },
	];

	protected readonly form = this.formBuilder.group({
		service_catalog_id: [""],
		title: ["", [Validators.required, Validators.minLength(3)]],
		description: ["", [Validators.required, Validators.minLength(8)]],
		latitude: [0, [Validators.required, Validators.min(-90), Validators.max(90)]],
		longitude: [0, [Validators.required, Validators.min(-180), Validators.max(180)]],
		address_text: [""],
		priority: [""],
		vehicle_id: ["", [Validators.required]],
		cancellation_notes: [""],
	});

	constructor() {
		void this.load();
	}

	protected async load(): Promise<void> {
		const incidentId = this.route.snapshot.paramMap.get("incidentId");

		if (!incidentId) {
			this.errorMessage.set("No se encontró el incidente.");
			return;
		}

		this.loading.set(true);
		this.errorMessage.set(null);

		try {
			const [incident, vehicleResponse] = await Promise.all([
				firstValueFrom(this.clientApi.getMyIncident(incidentId)),
				firstValueFrom(this.clientApi.listMyVehicles({ page: 1, page_size: 100 })),
			]);

			this.incident.set(incident);
			this.vehicles.set(vehicleResponse.items);
			this.form.patchValue({
				service_catalog_id: incident.service_catalog_id ?? "",
				title: incident.title,
				description: incident.description ?? "",
				latitude: Number(incident.latitude ?? 0),
				longitude: Number(incident.longitude ?? 0),
				address_text: incident.address_text ?? "",
				priority: incident.priority,
				vehicle_id: incident.vehicle_id,
			});
		} catch (error) {
			this.errorMessage.set(getApiErrorMessage(error));
		} finally {
			this.loading.set(false);
		}
	}

	protected useCurrentLocation(): void {
		if (!navigator.geolocation) {
			this.errorMessage.set("Tu navegador no permite obtener ubicación.");
			return;
		}

		navigator.geolocation.getCurrentPosition(
			position => {
				this.form.patchValue({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
			},
			error => {
				this.errorMessage.set(error.message || "No se pudo obtener la ubicación.");
			},
			{ enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
		);
	}

	protected async save(): Promise<void> {
		const incidentId = this.route.snapshot.paramMap.get("incidentId");

		if (!incidentId || this.form.invalid || this.saving()) {
			this.form.markAllAsTouched();
			return;
		}

		const raw = this.form.getRawValue();

		this.saving.set(true);
		this.errorMessage.set(null);

		try {
			await firstValueFrom(
				this.clientApi.updateMyIncident(incidentId, {
					service_catalog_id: raw.service_catalog_id.trim() || null,
					title: raw.title.trim(),
					description: raw.description.trim(),
					latitude: Number(raw.latitude),
					longitude: Number(raw.longitude),
					address_text: raw.address_text.trim() || null,
					priority: raw.priority ? (raw.priority as "LOW" | "MEDIUM" | "HIGH" | "CRITICAL") : null,
				})
			);

			toast.success("Incidente actualizado correctamente");
			void this.router.navigate([APP_ROUTES.client.incidents]);
		} catch (error) {
			const message = getApiErrorMessage(error);
			this.errorMessage.set(message);
			toast.error("No se pudo actualizar el incidente", {
				description: message,
			});
		} finally {
			this.saving.set(false);
		}
	}

	protected async cancelIncident(): Promise<void> {
		const incidentId = this.route.snapshot.paramMap.get("incidentId");

		if (!incidentId) {
			return;
		}

		const confirmed = window.confirm(
			"¿Seguro que quieres cancelar este incidente?"
		);

		if (!confirmed) {
			return;
		}

		this.saving.set(true);
		this.errorMessage.set(null);

		try {
			const raw = this.form.getRawValue();
			await firstValueFrom(
				this.clientApi.cancelMyIncident(incidentId, {
					cancellation_reason: null,
					cancellation_notes: raw.cancellation_notes.trim() || null,
				})
			);
			toast.success("Incidente cancelado correctamente");
			void this.router.navigate([APP_ROUTES.client.incidents]);
		} catch (error) {
			const message = getApiErrorMessage(error);
			this.errorMessage.set(message);
			toast.error("No se pudo cancelar el incidente", {
				description: message,
			});
		} finally {
			this.saving.set(false);
		}
	}

	protected canCancelIncident(status: string | null | undefined): boolean {
		return !["CANCELLED", "COMPLETED", "UNATTENDED"].includes(status || "");
	}

	protected statusLabel(status: string | null | undefined): string {
		return getIncidentStatusLabel(status ?? null);
	}

	protected cancel(): void {
		void this.router.navigate([APP_ROUTES.client.incidents]);
	}
}
