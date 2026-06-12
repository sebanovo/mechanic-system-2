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
	protected readonly isLocating = signal(false);
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
			this.applyProfile(this.profile());
		});
	}

	protected submit(): void {
		if (this.isSubmitting()) {
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

	protected useCurrentLocation(): void {
		if (!navigator.geolocation) {
			const message = "Tu navegador no permite obtener ubicación.";

			this.errorMessage.set(message);

			toast.error("Ubicación no disponible", {
				description: message,
			});

			return;
		}

		this.isLocating.set(true);
		this.errorMessage.set(null);

		navigator.geolocation.getCurrentPosition(
			position => {
				this.form.patchValue({
					latitude: String(position.coords.latitude),
					longitude: String(position.coords.longitude),
				});

				this.isLocating.set(false);

				toast.success("Ubicación obtenida", {
					description: "Se cargaron las coordenadas actuales.",
				});
			},
			error => {
				const message =
					error.message || "No se pudo obtener la ubicación actual.";

				this.errorMessage.set(message);
				this.isLocating.set(false);

				toast.error("No se pudo obtener ubicación", {
					description: message,
				});
			},
			{
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 30000,
			}
		);
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

	private applyProfile(profile: TenantProfile | null): void {
		this.patchTenantTextFields(profile);
		this.patchTenantCoordinateFields(profile);
	}

	private patchTenantTextFields(profile: TenantProfile | null): void {
		this.form.patchValue({
			legal_name: this.textOrEmpty(profile?.legal_name),
			tax_identifier: this.textOrEmpty(profile?.tax_identifier),
			business_email: this.textOrEmpty(profile?.business_email),
			business_phone: this.textOrEmpty(profile?.business_phone),
			website_url: this.textOrEmpty(profile?.website_url),
			address_line: this.textOrEmpty(profile?.address_line),
			city: this.textOrEmpty(profile?.city),
			state: this.textOrEmpty(profile?.state),
			country: this.textOrEmpty(profile?.country),
		});
	}

	private patchTenantCoordinateFields(profile: TenantProfile | null): void {
		this.form.patchValue({
			latitude: this.coordinateToString(profile?.latitude),
			longitude: this.coordinateToString(profile?.longitude),
		});
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

	private numberOrNull(value: string | number | null | undefined): number | null {
		if (value === null || value === undefined) {
			return null;
		}

		const trimmed = String(value).trim();

		if (!trimmed) {
			return null;
		}

		const parsed = Number(trimmed);

		return Number.isNaN(parsed) ? null : parsed;
	}

	private coordinateToString(value: number | string | null | undefined): string {
		if (value === null || value === undefined) {
			return "";
		}

		return String(value);
	}

	private textOrEmpty(value: string | null | undefined): string {
		return value ?? "";
	}
}
