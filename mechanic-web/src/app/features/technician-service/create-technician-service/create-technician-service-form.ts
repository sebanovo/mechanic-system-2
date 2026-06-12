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
import { forkJoin } from "rxjs";

import { HlmButtonImports } from "@shared/ui/button";
import { HlmFieldImports } from "@shared/ui/field";

import { ProviderServiceApi } from "../../../entities/provider-service/api/provider-service.api";
import {
	formatProviderServiceEffectivePriceRange,
	ProviderServiceDetail,
} from "../../../entities/provider-service/model";
import { TechnicianServiceApi } from "../../../entities/technician-service/api/technician-service.api";
import {
	CreateTechnicianServicePayload,
	TECHNICIAN_SKILL_LEVEL_OPTIONS,
	TechnicianServiceDetail,
	TechnicianSkillLevel,
} from "../../../entities/technician-service/model";
import { TechnicianApi } from "../../../entities/technician/api/technician.api";
import {
	getTechnicianFullName,
	Technician,
} from "../../../entities/technician/model";
import { getApiErrorMessage } from "../../../shared/api";

@Component({
	selector: "app-create-technician-service-form",
	standalone: true,
	imports: [ReactiveFormsModule, HlmButtonImports, HlmFieldImports],
	templateUrl: "./create-technician-service-form.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTechnicianServiceForm implements OnInit {
	private readonly formBuilder = inject(NonNullableFormBuilder);
	private readonly technicianApi = inject(TechnicianApi);
	private readonly providerServiceApi = inject(ProviderServiceApi);
	private readonly technicianServiceApi = inject(TechnicianServiceApi);

	readonly created = output<TechnicianServiceDetail>();
	readonly cancelled = output<void>();

	protected readonly technicians = signal<Technician[]>([]);
	protected readonly providerServices = signal<ProviderServiceDetail[]>([]);
	protected readonly skillLevelOptions = TECHNICIAN_SKILL_LEVEL_OPTIONS;

	protected readonly isLoadingOptions = signal(false);
	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly form = this.formBuilder.group({
		technician_id: ["", [Validators.required]],
		provider_service_id: ["", [Validators.required]],
		skill_level: [
			"INTERMEDIATE" as TechnicianSkillLevel,
			[Validators.required],
		],
	});

	ngOnInit(): void {
		this.loadOptions();
	}

	protected loadOptions(): void {
		this.isLoadingOptions.set(true);
		this.errorMessage.set(null);

		forkJoin({
			technicians: this.technicianApi.listTenantTechnicians({
				page: 1,
				page_size: 200,
				status: "ACTIVE",
			}),
			providerServices:
				this.providerServiceApi.listCurrentTenantProviderServices({
					page: 1,
					page_size: 200,
					is_available: true,
				}),
		}).subscribe({
			next: response => {
				this.technicians.set(response.technicians.items);
				this.providerServices.set(response.providerServices.items);
				this.isLoadingOptions.set(false);
			},
			error: error => {
				const message = getApiErrorMessage(error);

				this.errorMessage.set(message);
				this.isLoadingOptions.set(false);

				toast.error("No se pudieron cargar las opciones", {
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

		this.isSubmitting.set(true);
		this.errorMessage.set(null);

		this.technicianServiceApi
			.createCurrentTenantTechnicianService(payload)
			.subscribe({
				next: item => {
					this.isSubmitting.set(false);

					toast.success("Servicio habilitado", {
						description: `${item.technician.technician_code} ya puede atender ${item.provider_service.service_catalog.service_name}.`,
					});

					this.created.emit(item);
					this.resetForm();
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.isSubmitting.set(false);

					toast.error("No se pudo habilitar el servicio", {
						description: message,
					});
				},
			});
	}

	protected cancel(): void {
		this.cancelled.emit();
	}

	protected technicianLabel(item: Technician): string {
		return `${getTechnicianFullName(item)} · ${item.technician.technician_code}`;
	}

	protected providerServiceLabel(item: ProviderServiceDetail): string {
		return `${item.service_catalog.service_name} · ${item.service_catalog.category} · ${formatProviderServiceEffectivePriceRange(item)}`;
	}

	private buildPayload(): CreateTechnicianServicePayload {
		const raw = this.form.getRawValue();

		return {
			technician_id: raw.technician_id,
			provider_service_id: raw.provider_service_id,
			skill_level: raw.skill_level,
		};
	}

	private resetForm(): void {
		this.form.reset({
			technician_id: "",
			provider_service_id: "",
			skill_level: "INTERMEDIATE",
		});
	}
}
