import {
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
	input,
	output,
	signal,
} from "@angular/core";
import {
	NonNullableFormBuilder,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { toast } from "@spartan-ng/brain/sonner";

import { HlmButtonImports } from "@shared/ui/button";
import { HlmFieldImports } from "@shared/ui/field";
import { HlmInputImports } from "@shared/ui/input";

import { TechnicianAvailabilityApi } from "../../../entities/technician-availability/api/technician-availability.api";
import {
	dateTimeLocalToIso,
	formatDateTimeLocalValue,
	TECHNICIAN_AVAILABILITY_UPSERT_STATUS_OPTIONS,
	TechnicianAvailability,
	TechnicianAvailabilityStatus,
	TechnicianAvailabilityUpsertPayload,
} from "../../../entities/technician-availability/model";
import {
	getTechnicianFullName,
	Technician,
} from "../../../entities/technician/model";
import { getApiErrorMessage } from "../../../shared/api";

@Component({
	selector: "app-update-technician-availability-form",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		HlmButtonImports,
		HlmFieldImports,
		HlmInputImports,
	],
	templateUrl: "./update-technician-availability-form.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateTechnicianAvailabilityForm {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly availabilityApi = inject(TechnicianAvailabilityApi);

	readonly technician = input.required<Technician>();
	readonly availability = input<TechnicianAvailability | null>(null);

	readonly updated = output<TechnicianAvailability>();
	readonly cancelled = output<void>();

	protected readonly statusOptions =
		TECHNICIAN_AVAILABILITY_UPSERT_STATUS_OPTIONS;
	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly form = this.formBuilder.group({
		availability_status: [
			"OFFLINE" as TechnicianAvailabilityStatus,
			[Validators.required],
		],
		available_from: [""],
		available_until: [""],
	});

	constructor() {
		effect(() => {
			const availability = this.availability();

			this.form.patchValue({
				availability_status: availability?.availability_status ?? "OFFLINE",
				available_from: formatDateTimeLocalValue(
					availability?.available_from ?? null
				),
				available_until: formatDateTimeLocalValue(
					availability?.available_until ?? null
				),
			});
		});
	}

	protected submit(): void {
		if (this.form.invalid || this.isSubmitting()) {
			this.form.markAllAsTouched();
			return;
		}

		const payload = this.buildPayload();
		const validationError = this.validatePayload(payload);

		if (validationError) {
			this.errorMessage.set(validationError);

			toast.error("Revisa el horario", {
				description: validationError,
			});

			return;
		}

		this.isSubmitting.set(true);
		this.errorMessage.set(null);

		this.availabilityApi
			.upsertCurrentTenantTechnicianAvailability(
				this.technician().technician.id,
				payload
			)
			.subscribe({
				next: availability => {
					this.isSubmitting.set(false);

					toast.success("Disponibilidad actualizada", {
						description: `${this.technicianLabel()} fue actualizado correctamente.`,
					});

					this.updated.emit(availability);
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.isSubmitting.set(false);

					toast.error("No se pudo actualizar la disponibilidad", {
						description: message,
					});
				},
			});
	}

	protected cancel(): void {
		this.cancelled.emit();
	}

	protected technicianLabel(): string {
		return `${getTechnicianFullName(this.technician())} · ${this.technician().technician.technician_code}`;
	}

	private buildPayload(): TechnicianAvailabilityUpsertPayload {
		const raw = this.form.getRawValue();

		return {
			availability_status: raw.availability_status,
			available_from: dateTimeLocalToIso(raw.available_from),
			available_until: dateTimeLocalToIso(raw.available_until),
		};
	}

	private validatePayload(
		payload: TechnicianAvailabilityUpsertPayload
	): string | null {
		if (payload.available_from && payload.available_until) {
			const from = new Date(payload.available_from);
			const until = new Date(payload.available_until);

			if (from > until) {
				return "La fecha/hora final no puede ser menor a la fecha/hora inicial.";
			}
		}

		return null;
	}
}
