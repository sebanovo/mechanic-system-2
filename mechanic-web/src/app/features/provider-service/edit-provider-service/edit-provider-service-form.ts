import {
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
	input,
	output,
	signal,
} from "@angular/core";
import { NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { toast } from "@spartan-ng/brain/sonner";

import { HlmButtonImports } from "@shared/ui/button";
import { HlmFieldImports } from "@shared/ui/field";
import { HlmInputImports } from "@shared/ui/input";

import { ProviderServiceApi } from "../../../entities/provider-service/api/provider-service.api";
import {
	ProviderServiceDetail,
	UpdateProviderServicePayload,
} from "../../../entities/provider-service/model";
import {
	formatServiceCatalogPriceRange,
	toNumberOrNull,
} from "../../../entities/service-catalog/model";
import { getApiErrorMessage } from "../../../shared/api";

@Component({
	selector: "app-edit-provider-service-form",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		HlmButtonImports,
		HlmFieldImports,
		HlmInputImports,
	],
	templateUrl: "./edit-provider-service-form.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProviderServiceForm {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly providerServiceApi = inject(ProviderServiceApi);

	readonly item = input.required<ProviderServiceDetail>();

	readonly updated = output<ProviderServiceDetail>();
	readonly cancelled = output<void>();

	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly form = this.formBuilder.group({
		is_available: [true],
		custom_min_price: [""],
		custom_max_price: [""],
	});

	constructor() {
		effect(() => {
			const item = this.item();

			this.form.patchValue({
				is_available: item.provider_service.is_available,
				custom_min_price:
					item.provider_service.custom_min_price === null
						? ""
						: String(item.provider_service.custom_min_price),
				custom_max_price:
					item.provider_service.custom_max_price === null
						? ""
						: String(item.provider_service.custom_max_price),
			});
		});
	}

	protected submit(): void {
		if (this.form.invalid || this.isSubmitting()) {
			this.form.markAllAsTouched();
			return;
		}

		const payload = this.buildPayload();
		const validationError = this.validatePrices(payload);

		if (validationError) {
			this.errorMessage.set(validationError);

			toast.error("Revisa los precios", {
				description: validationError,
			});

			return;
		}

		this.isSubmitting.set(true);
		this.errorMessage.set(null);

		this.providerServiceApi
			.updateCurrentTenantProviderService(
				this.item().provider_service.id,
				payload
			)
			.subscribe({
				next: item => {
					this.isSubmitting.set(false);

					toast.success("Servicio actualizado", {
						description: `${item.service_catalog.service_name} fue actualizado correctamente.`,
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

	protected catalogPriceLabel(): string {
		return formatServiceCatalogPriceRange(this.item().service_catalog);
	}

	private buildPayload(): UpdateProviderServicePayload {
		const raw = this.form.getRawValue();

		return {
			is_available: raw.is_available,
			custom_min_price: toNumberOrNull(raw.custom_min_price),
			custom_max_price: toNumberOrNull(raw.custom_max_price),
		};
	}

	private validatePrices(payload: UpdateProviderServicePayload): string | null {
		if (
			payload.custom_min_price !== null &&
			payload.custom_max_price !== null &&
			payload.custom_min_price !== undefined &&
			payload.custom_max_price !== undefined &&
			payload.custom_max_price < payload.custom_min_price
		) {
			return "El precio máximo no puede ser menor al precio mínimo.";
		}

		return null;
	}
}
