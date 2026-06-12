import {
	ChangeDetectionStrategy,
	Component,
	inject,
	OnInit,
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

import { ProviderServiceApi } from "../../../entities/provider-service/api/provider-service.api";
import {
	CreateProviderServicePayload,
	ProviderServiceDetail,
} from "../../../entities/provider-service/model";
import { ServiceCatalogApi } from "../../../entities/service-catalog/api/service-catalog.api";
import {
	formatServiceCatalogPriceRange,
	ServiceCatalog,
	toNumberOrNull,
} from "../../../entities/service-catalog/model";
import { getApiErrorMessage } from "../../../shared/api";

@Component({
	selector: "app-create-provider-service-form",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		HlmButtonImports,
		HlmFieldImports,
		HlmInputImports,
	],
	templateUrl: "./create-provider-service-form.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProviderServiceForm implements OnInit {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly serviceCatalogApi = inject(ServiceCatalogApi);
	private readonly providerServiceApi = inject(ProviderServiceApi);

	readonly created = output<ProviderServiceDetail>();
	readonly cancelled = output<void>();

	protected readonly serviceCatalogItems = signal<ServiceCatalog[]>([]);
	protected readonly isLoadingCatalog = signal(false);
	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly form = this.formBuilder.group({
		service_catalog_id: ["", [Validators.required]],
		custom_min_price: [""],
		custom_max_price: [""],
	});

	ngOnInit(): void {
		this.loadCatalog();
	}

	protected loadCatalog(): void {
		this.isLoadingCatalog.set(true);
		this.errorMessage.set(null);

		this.serviceCatalogApi
			.listTenantCatalog({
				page: 1,
				page_size: 200,
			})
			.subscribe({
				next: response => {
					this.serviceCatalogItems.set(response.items);
					this.isLoadingCatalog.set(false);
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.isLoadingCatalog.set(false);

					toast.error("No se pudo cargar el catálogo", {
						description: message,
					});
				},
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
			.createCurrentTenantProviderService(payload)
			.subscribe({
				next: item => {
					this.isSubmitting.set(false);

					toast.success("Servicio agregado", {
						description: `${item.service_catalog.service_name} fue agregado a los servicios del taller.`,
					});

					this.created.emit(item);
					this.resetForm();
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.isSubmitting.set(false);

					toast.error("No se pudo agregar el servicio", {
						description: message,
					});
				},
			});
	}

	protected cancel(): void {
		this.cancelled.emit();
	}

	protected catalogPriceLabel(item: ServiceCatalog): string {
		return formatServiceCatalogPriceRange(item);
	}

	private buildPayload(): CreateProviderServicePayload {
		const raw = this.form.getRawValue();

		return {
			service_catalog_id: raw.service_catalog_id,
			custom_min_price: toNumberOrNull(raw.custom_min_price),
			custom_max_price: toNumberOrNull(raw.custom_max_price),
		};
	}

	private validatePrices(payload: CreateProviderServicePayload): string | null {
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

	private resetForm(): void {
		this.form.reset({
			service_catalog_id: "",
			custom_min_price: "",
			custom_max_price: "",
		});
	}
}
