import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import {
	NonNullableFormBuilder,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { toast } from "@spartan-ng/brain/sonner";
import { firstValueFrom } from "rxjs";

import { ClientApi } from "../../../entities/client/api";
import { ClientVehicle } from "../../../entities/client/model";
import { APP_ROUTES } from "../../../core/routing/app-routes.constants";
import { getApiErrorMessage } from "../../../shared/api";
import { AdminPageShell, PageHeader } from "../../../shared/custom-components";
import { HlmButtonImports } from "@shared/ui/button";
import { HlmFieldImports } from "@shared/ui/field";
import { HlmInputImports } from "@shared/ui/input";

@Component({
	selector: "app-create-client-incident-page",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		AdminPageShell,
		PageHeader,
		HlmButtonImports,
		HlmFieldImports,
		HlmInputImports,
	],
	templateUrl: "./create-client-incident.page.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateClientIncidentPage {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly clientApi = inject(ClientApi);
	private readonly router = inject(Router);

	protected readonly vehicles = signal<ClientVehicle[]>([]);
	protected readonly loadingVehicles = signal(false);
	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly priorityOptions: { value: string; label: string }[] = [
		{ value: "LOW", label: "Baja" },
		{ value: "MEDIUM", label: "Media" },
		{ value: "HIGH", label: "Alta" },
		{ value: "CRITICAL", label: "Crítica" },
	];

	protected readonly form = this.formBuilder.group({
		vehicle_id: ["", [Validators.required]],
		description: ["", [Validators.required, Validators.minLength(8)]],
		latitude: [0, [Validators.required, Validators.min(-90), Validators.max(90)]],
		longitude: [0, [Validators.required, Validators.min(-180), Validators.max(180)]],
		priority: ["MEDIUM", [Validators.required]],
	});

	constructor() {
		void this.loadVehicles();
	}

	protected async loadVehicles(): Promise<void> {
		this.loadingVehicles.set(true);

		try {
			const response = await firstValueFrom(
				this.clientApi.listMyVehicles({ page: 1, page_size: 100 })
			);

			this.vehicles.set(response.items);
		} catch (error) {
			this.errorMessage.set(getApiErrorMessage(error));
		} finally {
			this.loadingVehicles.set(false);
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

	protected submit(): void {
		if (this.form.invalid || this.isSubmitting()) {
			this.form.markAllAsTouched();
			return;
		}

		const raw = this.form.getRawValue();

		this.isSubmitting.set(true);
		this.errorMessage.set(null);

		this.clientApi
			.createMyIncident({
				vehicle_id: raw.vehicle_id,
				description: raw.description.trim(),
				latitude: Number(raw.latitude),
				longitude: Number(raw.longitude),
				priority: raw.priority as "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
			})
			.subscribe({
				next: () => {
					this.isSubmitting.set(false);
					toast.success("Incidente creado correctamente");
					void this.router.navigate([APP_ROUTES.client.incidents]);
				},
				error: error => {
					const message = getApiErrorMessage(error);
					this.errorMessage.set(message);
					this.isSubmitting.set(false);
					toast.error("No se pudo crear el incidente", {
						description: message,
					});
				},
			});
	}

	protected cancel(): void {
		void this.router.navigate([APP_ROUTES.client.incidents]);
	}
}
