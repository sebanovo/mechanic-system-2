import {
	ChangeDetectionStrategy,
	Component,
	inject,
	output,
	signal,
} from "@angular/core";
import {
	NonNullableFormBuilder,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";

import { HlmButtonImports } from "@shared/ui/button";
import { HlmFieldImports } from "@shared/ui/field";
import { HlmInputImports } from "@shared/ui/input";
import { toast } from "@spartan-ng/brain/sonner";

import { TechnicianApi } from "../../../entities/technician/api/technician.api";
import { Technician } from "../../../entities/technician/model";
import { getApiErrorMessage } from "../../../shared/api";

@Component({
	selector: "app-create-technician-form",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		HlmButtonImports,
		HlmFieldImports,
		HlmInputImports,
	],
	templateUrl: "./create-technician-form.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTechnicianForm {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly technicianApi = inject(TechnicianApi);

	readonly created = output<Technician>();
	readonly cancelled = output<void>();

	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly form = this.formBuilder.group({
		first_name: ["", [Validators.required, Validators.minLength(2)]],
		last_name: ["", [Validators.required, Validators.minLength(2)]],
		email: ["", [Validators.required, Validators.email]],
		password: ["", [Validators.required, Validators.minLength(8)]],
	});

	protected submit(): void {
		if (this.form.invalid || this.isSubmitting()) {
			this.form.markAllAsTouched();
			return;
		}

		const raw = this.form.getRawValue();

		this.isSubmitting.set(true);
		this.errorMessage.set(null);

		this.technicianApi
			.createTenantTechnician({
				first_name: raw.first_name.trim(),
				last_name: raw.last_name.trim(),
				email: raw.email.trim().toLowerCase(),
				password: raw.password,
			})
			.subscribe({
				next: technician => {
					this.isSubmitting.set(false);

					toast.success("Técnico creado correctamente", {
						description: "La cuenta del técnico fue registrada en el taller.",
					});

					this.created.emit(technician);
					this.form.reset();
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.isSubmitting.set(false);

					toast.error("No se pudo crear el técnico", {
						description: message,
					});
				},
			});
	}

	protected cancel(): void {
		this.cancelled.emit();
	}
}
