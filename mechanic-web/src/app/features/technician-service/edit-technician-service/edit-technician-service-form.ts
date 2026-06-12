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

import { TechnicianServiceApi } from "../../../entities/technician-service/api/technician-service.api";
import {
	TECHNICIAN_SKILL_LEVEL_OPTIONS,
	TechnicianServiceDetail,
	TechnicianSkillLevel,
	UpdateTechnicianServicePayload,
} from "../../../entities/technician-service/model";
import { getApiErrorMessage } from "../../../shared/api";

@Component({
	selector: "app-edit-technician-service-form",
	standalone: true,
	imports: [ReactiveFormsModule, HlmButtonImports, HlmFieldImports],
	templateUrl: "./edit-technician-service-form.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTechnicianServiceForm {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly technicianServiceApi = inject(TechnicianServiceApi);

	readonly item = input.required<TechnicianServiceDetail>();

	readonly updated = output<TechnicianServiceDetail>();
	readonly cancelled = output<void>();

	protected readonly skillLevelOptions = TECHNICIAN_SKILL_LEVEL_OPTIONS;
	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly form = this.formBuilder.group({
		skill_level: [
			"INTERMEDIATE" as TechnicianSkillLevel,
			[Validators.required],
		],
		is_enabled: [true],
	});

	constructor() {
		effect(() => {
			const item = this.item();

			this.form.patchValue({
				skill_level: item.technician_service.skill_level,
				is_enabled: item.technician_service.is_enabled,
			});
		});
	}

	protected submit(): void {
		if (this.form.invalid || this.isSubmitting()) {
			this.form.markAllAsTouched();
			return;
		}

		const payload = this.buildPayload();

		this.isSubmitting.set(true);
		this.errorMessage.set(null);

		this.technicianServiceApi
			.updateCurrentTenantTechnicianService(
				this.item().technician_service.id,
				payload
			)
			.subscribe({
				next: item => {
					this.isSubmitting.set(false);

					toast.success("Servicio del técnico actualizado", {
						description: `${item.technician.technician_code} fue actualizado correctamente.`,
					});

					this.updated.emit(item);
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.isSubmitting.set(false);

					toast.error("No se pudo actualizar el servicio", {
						description: message,
					});
				},
			});
	}

	protected cancel(): void {
		this.cancelled.emit();
	}

	private buildPayload(): UpdateTechnicianServicePayload {
		const raw = this.form.getRawValue();

		return {
			skill_level: raw.skill_level,
			is_enabled: raw.is_enabled,
		};
	}
}
