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
	TenantProfile,
	UpdateTenantProfilePayload,
} from "../../../entities/tenant/model";
import { getApiErrorMessage } from "../../../shared/api";

@Component({
	selector: "app-update-tenant-profile-form",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		HlmButtonImports,
		HlmFieldImports,
		HlmInputImports,
	],
	templateUrl: "./update-tenant-profile-form.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateTenantProfileForm {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly tenantApi = inject(TenantApi);

	readonly profile = input<TenantProfile | null>(null);

	readonly updated = output<TenantProfile>();
	readonly cancelled = output<void>();

	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly form = this.formBuilder.group({
		legal_name: ["", [Validators.maxLength(180)]],
		tax_identifier: ["", [Validators.maxLength(80)]],
		business_email: ["", [Validators.email]],
		business_phone: ["", [Validators.maxLength(30)]],
		website_url: [""],
		address_line: ["", [Validators.maxLength(255)]],
		city: ["", [Validators.maxLength(120)]],
		state: ["", [Validators.maxLength(120)]],
		country: ["", [Validators.maxLength(120)]],
		latitude: [""],
		longitude: [""],
	});

	constructor() {
		effect(() => {
			const profile = this.profile();

			this.form.patchValue({
				legal_name: profile?.legal_name ?? "",
				tax_identifier: profile?.tax_identifier ?? "",
				business_email: profile?.business_email ?? "",
				business_phone: profile?.business_phone ?? "",
				website_url: profile?.website_url ?? "",
				address_line: profile?.address_line ?? "",
				city: profile?.city ?? "",
				state: profile?.state ?? "",
				country: profile?.country ?? "",
				latitude:
					profile?.latitude === null || profile?.latitude === undefined
						? ""
						: String(profile.latitude),
				longitude:
					profile?.longitude === null || profile?.longitude === undefined
						? ""
						: String(profile.longitude),
			});
		});
	}

	protected submit(): void {
		if (this.form.invalid || this.isSubmitting()) {
			this.form.markAllAsTouched();
			return;
		}

		const payload = this.buildPayload();
		const validationError = this.validateCoordinates(payload);

		if (validationError) {
			this.errorMessage.set(validationError);

			toast.error("Revisa la ubicación", {
				description: validationError,
			});

			return;
		}

		this.isSubmitting.set(true);
		this.errorMessage.set(null);

		this.tenantApi.updateCurrentTenantProfile(payload).subscribe({
			next: profile => {
				this.isSubmitting.set(false);

				toast.success("Perfil actualizado", {
					description:
						"La información del tenant fue actualizada correctamente.",
				});

				this.updated.emit(profile);
			},
			error: error => {
				const message = getApiErrorMessage(error);

				this.errorMessage.set(message);
				this.isSubmitting.set(false);

				toast.error("No se pudo actualizar el perfil", {
					description: message,
				});
			},
		});
	}

	protected cancel(): void {
		this.cancelled.emit();
	}

	private buildPayload(): UpdateTenantProfilePayload {
		const raw = this.form.getRawValue();

		return {
			legal_name: this.clean(raw.legal_name),
			tax_identifier: this.clean(raw.tax_identifier),
			business_email: this.clean(raw.business_email),
			business_phone: this.clean(raw.business_phone),
			website_url: this.clean(raw.website_url),
			address_line: this.clean(raw.address_line),
			city: this.clean(raw.city),
			state: this.clean(raw.state),
			country: this.clean(raw.country),
			latitude: this.numberOrNull(raw.latitude),
			longitude: this.numberOrNull(raw.longitude),
		};
	}

	private validateCoordinates(
		payload: UpdateTenantProfilePayload
	): string | null {
		if (
			payload.latitude !== null &&
			payload.latitude !== undefined &&
			(payload.latitude < -90 || payload.latitude > 90)
		) {
			return "La latitud debe estar entre -90 y 90.";
		}

		if (
			payload.longitude !== null &&
			payload.longitude !== undefined &&
			(payload.longitude < -180 || payload.longitude > 180)
		) {
			return "La longitud debe estar entre -180 y 180.";
		}

		return null;
	}

	private clean(value: string): string | null {
		const trimmed = value.trim();

		return trimmed || null;
	}

	private numberOrNull(value: string): number | null {
		const trimmed = value.trim();

		if (!trimmed) {
			return null;
		}

		const parsed = Number(trimmed);

		return Number.isNaN(parsed) ? null : parsed;
	}
}
