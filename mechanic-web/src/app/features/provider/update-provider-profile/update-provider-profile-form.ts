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

import { ProviderApi } from "../../../entities/provider/api/provider.api";
import {
	PROVIDER_OPERATIONAL_STATUS_OPTIONS,
	ProviderOperationalStatus,
	ProviderProfile,
	UpdateProviderProfilePayload,
} from "../../../entities/provider/model";
import { getApiErrorMessage } from "../../../shared/api";

@Component({
	selector: "app-update-provider-profile-form",
	standalone: true,
	imports: [ReactiveFormsModule, HlmButtonImports, HlmFieldImports],
	templateUrl: "./update-provider-profile-form.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateProviderProfileForm {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly providerApi = inject(ProviderApi);

	readonly provider = input<ProviderProfile | null>(null);

	readonly updated = output<ProviderProfile>();
	readonly cancelled = output<void>();

	protected readonly statusOptions = PROVIDER_OPERATIONAL_STATUS_OPTIONS;
	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly form = this.formBuilder.group({
		operational_status: [
			"ACTIVE" as ProviderOperationalStatus,
			[Validators.required],
		],
		accepts_emergency_requests: [true],
	});

	constructor() {
		effect(() => {
			const provider = this.provider();

			this.form.patchValue({
				operational_status: provider?.operational_status ?? "ACTIVE",
				accepts_emergency_requests:
					provider?.accepts_emergency_requests ?? true,
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

		this.providerApi.updateCurrentProviderProfile(payload).subscribe({
			next: provider => {
				this.isSubmitting.set(false);

				toast.success("Perfil operativo actualizado", {
					description: "La configuración operativa del proveedor fue guardada.",
				});

				this.updated.emit(provider);
			},
			error: error => {
				const message = getApiErrorMessage(error);

				this.errorMessage.set(message);
				this.isSubmitting.set(false);

				toast.error("No se pudo actualizar el proveedor", {
					description: message,
				});
			},
		});
	}

	protected cancel(): void {
		this.cancelled.emit();
	}

	private buildPayload(): UpdateProviderProfilePayload {
		const raw = this.form.getRawValue();

		return {
			operational_status: raw.operational_status,
			accepts_emergency_requests: raw.accepts_emergency_requests,
		};
	}
}
