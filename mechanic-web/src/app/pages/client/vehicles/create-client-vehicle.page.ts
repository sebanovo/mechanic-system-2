import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import {
	NonNullableFormBuilder,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { toast } from "@spartan-ng/brain/sonner";

import { ClientApi } from "../../../entities/client/api";
import { ClientVehicleType } from "../../../entities/client/model";
import { APP_ROUTES } from "../../../core/routing/app-routes.constants";
import { getApiErrorMessage } from "../../../shared/api";
import {
	AdminPageShell,
	PageHeader,
} from "../../../shared/custom-components";
import { HlmButtonImports } from "@shared/ui/button";
import { HlmFieldImports } from "@shared/ui/field";
import { HlmInputImports } from "@shared/ui/input";

@Component({
	selector: "app-create-client-vehicle-page",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		AdminPageShell,
		PageHeader,
		HlmButtonImports,
		HlmFieldImports,
		HlmInputImports,
	],
	templateUrl: "./create-client-vehicle.page.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateClientVehiclePage {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly clientApi = inject(ClientApi);
	private readonly router = inject(Router);

	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly vehicleTypeOptions: { value: ClientVehicleType; label: string }[] = [
		{ value: "CAR", label: "Auto" },
		{ value: "MOTORCYCLE", label: "Moto" },
		{ value: "TRUCK", label: "Camión" },
		{ value: "VAN", label: "Van" },
		{ value: "SUV", label: "SUV" },
		{ value: "OTHER", label: "Otro" },
	];

	protected readonly form = this.formBuilder.group({
		brand: ["", [Validators.maxLength(80)]],
		model: ["", [Validators.maxLength(80)]],
		color: ["", [Validators.maxLength(50)]],
		plate_number: ["", [Validators.required, Validators.maxLength(20)]],
		vehicle_type: ["CAR" as ClientVehicleType, [Validators.required]],
		year: [new Date().getFullYear(), [Validators.min(1950), Validators.max(2100)]],
	});

	protected submit(): void {
		if (this.form.invalid || this.isSubmitting()) {
			this.form.markAllAsTouched();
			return;
		}

		const raw = this.form.getRawValue();

		this.isSubmitting.set(true);
		this.errorMessage.set(null);

		this.clientApi
			.createMyVehicle({
				brand: raw.brand.trim() || null,
				model: raw.model.trim() || null,
				color: raw.color.trim() || null,
				plate_number: raw.plate_number.trim().toUpperCase(),
				vehicle_type: raw.vehicle_type,
				year: raw.year || null,
			})
			.subscribe({
				next: () => {
					this.isSubmitting.set(false);
					toast.success("Vehículo creado correctamente");
					void this.router.navigate([APP_ROUTES.client.vehicles]);
				},
				error: error => {
					const message = getApiErrorMessage(error);
					this.errorMessage.set(message);
					this.isSubmitting.set(false);
					toast.error("No se pudo crear el vehículo", {
						description: message,
					});
				},
			});
	}

	protected cancel(): void {
		void this.router.navigate([APP_ROUTES.client.vehicles]);
	}
}
