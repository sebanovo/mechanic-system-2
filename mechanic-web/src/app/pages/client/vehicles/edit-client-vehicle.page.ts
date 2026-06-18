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
import { ClientVehicleDetail, ClientVehicleStatus, ClientVehicleType } from "../../../entities/client/model";
import { APP_ROUTES } from "../../../core/routing/app-routes.constants";
import { getApiErrorMessage } from "../../../shared/api";
import { AdminPageShell, PageHeader } from "../../../shared/custom-components";
import { HlmButtonImports } from "@shared/ui/button";
import { HlmFieldImports } from "@shared/ui/field";
import { HlmInputImports } from "@shared/ui/input";

@Component({
	selector: "app-edit-client-vehicle-page",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		AdminPageShell,
		PageHeader,
		HlmButtonImports,
		HlmFieldImports,
		HlmInputImports,
	],
	templateUrl: "./edit-client-vehicle.page.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditClientVehiclePage {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly clientApi = inject(ClientApi);
	private readonly router = inject(Router);
	private readonly route = inject(ActivatedRoute);

	protected readonly loading = signal(false);
	protected readonly saving = signal(false);
	protected readonly deleting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);
	protected readonly vehicleDetail = signal<ClientVehicleDetail | null>(null);

	protected readonly vehicleTypeOptions: { value: ClientVehicleType; label: string }[] = [
		{ value: "CAR", label: "Auto" },
		{ value: "MOTORCYCLE", label: "Moto" },
		{ value: "TRUCK", label: "Camión" },
		{ value: "VAN", label: "Van" },
		{ value: "SUV", label: "SUV" },
		{ value: "OTHER", label: "Otro" },
	];

	protected readonly statusOptions: { value: ClientVehicleStatus; label: string }[] = [
		{ value: "ACTIVE", label: "Activo" },
		{ value: "INACTIVE", label: "Inactivo" },
	];

	protected readonly form = this.formBuilder.group({
		brand: ["", [Validators.maxLength(80)]],
		model: ["", [Validators.maxLength(80)]],
		color: ["", [Validators.maxLength(50)]],
		plate_number: ["", [Validators.required, Validators.maxLength(20)]],
		vehicle_type: ["CAR" as ClientVehicleType, [Validators.required]],
		year: [new Date().getFullYear(), [Validators.min(1950), Validators.max(2100)]],
		status: ["ACTIVE" as ClientVehicleStatus, [Validators.required]],
	});

	constructor() {
		void this.load();
	}

	protected async load(): Promise<void> {
		const vehicleId = this.route.snapshot.paramMap.get("vehicleId");

		if (!vehicleId) {
			this.errorMessage.set("No se encontró el vehículo.");
			return;
		}

		this.loading.set(true);
		this.errorMessage.set(null);

		try {
			const detail = await firstValueFrom(this.clientApi.getMyVehicle(vehicleId));
			this.vehicleDetail.set(detail);
			this.form.patchValue({
				brand: detail.vehicle.brand ?? "",
				model: detail.vehicle.model ?? "",
				color: detail.vehicle.color ?? "",
				plate_number: detail.vehicle.plate_number,
				vehicle_type: detail.vehicle.vehicle_type,
				year: detail.vehicle.year ?? new Date().getFullYear(),
				status: detail.vehicle.status,
			});
		} catch (error) {
			this.errorMessage.set(getApiErrorMessage(error));
		} finally {
			this.loading.set(false);
		}
	}

	protected async save(): Promise<void> {
		const vehicleId = this.route.snapshot.paramMap.get("vehicleId");

		if (!vehicleId || this.form.invalid || this.saving()) {
			this.form.markAllAsTouched();
			return;
		}

		const raw = this.form.getRawValue();
		this.saving.set(true);
		this.errorMessage.set(null);

		try {
			await firstValueFrom(
				this.clientApi.updateMyVehicle(vehicleId, {
					brand: raw.brand.trim() || null,
					model: raw.model.trim() || null,
					color: raw.color.trim() || null,
					plate_number: raw.plate_number.trim().toUpperCase(),
					vehicle_type: raw.vehicle_type,
					year: raw.year || null,
				})
			);

			toast.success("Vehículo actualizado correctamente");
			await this.load();
		} catch (error) {
			this.errorMessage.set(getApiErrorMessage(error));
			toast.error("No se pudo actualizar el vehículo", {
				description: getApiErrorMessage(error),
			});
		} finally {
			this.saving.set(false);
		}
	}

	protected async changeStatus(): Promise<void> {
		const vehicleId = this.route.snapshot.paramMap.get("vehicleId");
		const currentStatus = this.form.controls.status.value;

		if (!vehicleId || !currentStatus) {
			return;
		}

		this.saving.set(true);
		this.errorMessage.set(null);

		try {
			await firstValueFrom(
				this.clientApi.changeMyVehicleStatus(vehicleId, { status: currentStatus })
			);

			toast.success("Estado actualizado correctamente");
			await this.load();
		} catch (error) {
			this.errorMessage.set(getApiErrorMessage(error));
			toast.error("No se pudo cambiar el estado", {
				description: getApiErrorMessage(error),
			});
		} finally {
			this.saving.set(false);
		}
	}

	protected async deleteVehicle(): Promise<void> {
		const vehicleId = this.route.snapshot.paramMap.get("vehicleId");

		if (!vehicleId) {
			return;
		}

		const confirmed = window.confirm(
			"¿Seguro que quieres eliminar este vehículo? Esta acción no se puede deshacer."
		);

		if (!confirmed) {
			return;
		}

		this.deleting.set(true);
		this.errorMessage.set(null);

		try {
			await firstValueFrom(this.clientApi.deleteMyVehicle(vehicleId));
			toast.success("Vehículo eliminado correctamente");
			void this.router.navigate([APP_ROUTES.client.vehicles]);
		} catch (error) {
			this.errorMessage.set(getApiErrorMessage(error));
			toast.error("No se pudo eliminar el vehículo", {
				description: getApiErrorMessage(error),
			});
		} finally {
			this.deleting.set(false);
		}
	}

	protected cancel(): void {
		void this.router.navigate([APP_ROUTES.client.vehicles]);
	}
}

