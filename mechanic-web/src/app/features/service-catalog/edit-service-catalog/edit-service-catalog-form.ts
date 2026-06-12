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

import { HlmButtonImports } from "@shared/ui/button";
import { HlmFieldImports } from "@shared/ui/field";
import { HlmInputImports } from "@shared/ui/input";
import { toast } from "@spartan-ng/brain/sonner";

import { ServiceCatalogApi } from "../../../entities/service-catalog/api/service-catalog.api";
import {
	ServiceCatalog,
	toNumberOrNull,
	UpdateServiceCatalogPayload,
} from "../../../entities/service-catalog/model";
import { getApiErrorMessage } from "../../../shared/api";

@Component({
	selector: "app-edit-service-catalog-form",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		HlmButtonImports,
		HlmFieldImports,
		HlmInputImports,
	],
	templateUrl: "./edit-service-catalog-form.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditServiceCatalogForm {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly serviceCatalogApi = inject(ServiceCatalogApi);

	readonly item = input.required<ServiceCatalog>();

	readonly updated = output<ServiceCatalog>();
	readonly cancelled = output<void>();

	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly form = this.formBuilder.group({
		service_name: ["", [Validators.required, Validators.maxLength(150)]],
		description: [""],
		category: ["", [Validators.required, Validators.maxLength(80)]],
		min_price: [""],
		max_price: [""],
		min_duration_minutes: [""],
		max_duration_minutes: [""],
		is_active: [true],
	});

	constructor() {
		effect(() => {
			const item = this.item();

			this.form.patchValue({
				service_name: item.service_name,
				description: item.description ?? "",
				category: item.category,
				min_price: item.min_price === null ? "" : String(item.min_price),
				max_price: item.max_price === null ? "" : String(item.max_price),
				min_duration_minutes:
					item.min_duration_minutes === null
						? ""
						: String(item.min_duration_minutes),
				max_duration_minutes:
					item.max_duration_minutes === null
						? ""
						: String(item.max_duration_minutes),
				is_active: item.is_active,
			});
		});
	}

	protected submit(): void {
		if (this.form.invalid || this.isSubmitting()) {
			this.form.markAllAsTouched();
			return;
		}

		const payload = this.buildPayload();
		const validationError = this.validateRanges(payload);

		if (validationError) {
			this.errorMessage.set(validationError);

			toast.error("Revisa los rangos del servicio", {
				description: validationError,
			});

			return;
		}

		this.isSubmitting.set(true);
		this.errorMessage.set(null);

		this.serviceCatalogApi
			.updatePlatformCatalog(this.item().id, payload)
			.subscribe({
				next: item => {
					this.isSubmitting.set(false);

					toast.success("Servicio actualizado correctamente", {
						description: `${item.service_name} fue actualizado en el catálogo.`,
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

	private buildPayload(): UpdateServiceCatalogPayload {
		const raw = this.form.getRawValue();

		return {
			service_name: raw.service_name.trim(),
			description: raw.description.trim() || null,
			category: raw.category.trim(),
			min_price: toNumberOrNull(raw.min_price),
			max_price: toNumberOrNull(raw.max_price),
			min_duration_minutes: toNumberOrNull(raw.min_duration_minutes),
			max_duration_minutes: toNumberOrNull(raw.max_duration_minutes),
			is_active: raw.is_active,
		};
	}

	private validateRanges(payload: UpdateServiceCatalogPayload): string | null {
		if (
			payload.min_price !== null &&
			payload.max_price !== null &&
			payload.min_price !== undefined &&
			payload.max_price !== undefined &&
			payload.max_price < payload.min_price
		) {
			return "El precio máximo no puede ser menor al precio mínimo.";
		}

		if (
			payload.min_duration_minutes !== null &&
			payload.max_duration_minutes !== null &&
			payload.min_duration_minutes !== undefined &&
			payload.max_duration_minutes !== undefined &&
			payload.max_duration_minutes < payload.min_duration_minutes
		) {
			return "La duración máxima no puede ser menor a la duración mínima.";
		}

		return null;
	}
}
