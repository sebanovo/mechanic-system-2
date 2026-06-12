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

import { TenantApi } from "../../../entities/tenant/api/tenant.api";
import {
	TenantSettings,
	UpdateTenantSettingsPayload,
} from "../../../entities/tenant/model";
import { getApiErrorMessage } from "../../../shared/api";

@Component({
	selector: "app-update-tenant-settings-form",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		HlmButtonImports,
		HlmFieldImports,
		HlmInputImports,
	],
	templateUrl: "./update-tenant-settings-form.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateTenantSettingsForm {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly tenantApi = inject(TenantApi);

	readonly settings = input<TenantSettings | null>(null);

	readonly updated = output<TenantSettings>();
	readonly cancelled = output<void>();

	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly form = this.formBuilder.group({
		default_currency: ["BOB", [Validators.required, Validators.maxLength(10)]],
		default_timezone: [
			"America/La_Paz",
			[Validators.required, Validators.maxLength(80)],
		],
		default_language: ["es", [Validators.required, Validators.maxLength(10)]],
	});

	constructor() {
		effect(() => {
			const settings = this.settings();

			this.form.patchValue({
				default_currency: settings?.default_currency ?? "BOB",
				default_timezone: settings?.default_timezone ?? "America/La_Paz",
				default_language: settings?.default_language ?? "es",
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

		this.tenantApi.updateCurrentTenantSettings(payload).subscribe({
			next: settings => {
				this.isSubmitting.set(false);

				toast.success("Configuración actualizada", {
					description: "Los valores por defecto del tenant fueron guardados.",
				});

				this.updated.emit(settings);
			},
			error: error => {
				const message = getApiErrorMessage(error);

				this.errorMessage.set(message);
				this.isSubmitting.set(false);

				toast.error("No se pudo actualizar la configuración", {
					description: message,
				});
			},
		});
	}

	protected cancel(): void {
		this.cancelled.emit();
	}

	private buildPayload(): UpdateTenantSettingsPayload {
		const raw = this.form.getRawValue();

		return {
			default_currency: raw.default_currency.trim().toUpperCase(),
			default_timezone: raw.default_timezone.trim(),
			default_language: raw.default_language.trim().toLowerCase(),
		};
	}
}
