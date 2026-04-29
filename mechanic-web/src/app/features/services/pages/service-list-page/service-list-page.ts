import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { toast } from "@spartan-ng/brain/sonner";

import {
	CreateProviderServiceFormValue,
	ProviderService,
	ProviderServiceCatalogConfiguration,
	UpdateProviderServiceFormValue,
} from "../../models/service.types";
import { ServicesStore } from "../../store/service.store";

@Component({
	selector: "app-service-list-page",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: "./service-list-page.html",
	styleUrl: "./service-list-page.css",
})
export class ServiceListPage implements OnInit {
	readonly store = inject(ServicesStore);
	private readonly fb = inject(FormBuilder);

	readonly configureFormOpen = signal(false);
	readonly editFormOpen = signal(false);
	readonly selectedConfiguration =
		signal<ProviderServiceCatalogConfiguration | null>(null);
	readonly selectedProviderService = signal<ProviderService | null>(null);

	readonly configureForm = this.fb.nonNullable.group({
		serviceCatalogItemId: ["", [Validators.required]],
		customTitle: [""],
		customDescription: [""],
		priceEstimateMin: [0, [Validators.min(0)]],
		priceEstimateMax: [0, [Validators.min(0)]],
		estimatedDurationMinutes: [45, [Validators.min(1), Validators.max(1440)]],
		isMobileServiceEnabled: [true],
		isEmergencyServiceEnabled: [true],
		isActive: [true],
	});

	readonly editForm = this.fb.nonNullable.group({
		customTitle: [""],
		customDescription: [""],
		priceEstimateMin: [0, [Validators.min(0)]],
		priceEstimateMax: [0, [Validators.min(0)]],
		estimatedDurationMinutes: [45, [Validators.min(1), Validators.max(1440)]],
		isMobileServiceEnabled: [true],
		isEmergencyServiceEnabled: [true],
		isActive: [true],
	});

	async ngOnInit(): Promise<void> {
		await this.store.loadWorkspace();
	}

	onRetry(): void {
		this.store.clearCatalogError();
		this.store.clearProviderServicesError();
		void this.store.loadWorkspace();
	}

	async onToggleIncludeInactiveCatalog(event: Event): Promise<void> {
		const input = event.target as HTMLInputElement;
		this.store.setIncludeInactiveCatalog(input.checked);
		await this.store.loadCatalogConfigurations();
	}

	onOpenConfigureForm(configuration: ProviderServiceCatalogConfiguration): void {
		this.store.clearCreatingProviderServiceError();
		this.store.setSelectedCatalogConfiguration(configuration);
		this.selectedConfiguration.set(configuration);

		this.configureForm.reset({
			serviceCatalogItemId: configuration.catalogItem.id,
			customTitle: "",
			customDescription: "",
			priceEstimateMin: 0,
			priceEstimateMax: 0,
			estimatedDurationMinutes: 45,
			isMobileServiceEnabled: configuration.catalogItem.supportsMobileService,
			isEmergencyServiceEnabled:
				configuration.catalogItem.supportsEmergencyService,
			isActive: true,
		});

		this.configureFormOpen.set(true);
	}

	onCancelConfigureForm(): void {
		this.configureFormOpen.set(false);
		this.selectedConfiguration.set(null);
		this.store.setSelectedCatalogConfiguration(null);
		this.store.clearCreatingProviderServiceError();
	}

	async onCreateProviderService(): Promise<void> {
		if (this.configureForm.invalid) {
			this.configureForm.markAllAsTouched();
			return;
		}

		if (!this.isValidPriceRange(this.configureForm.getRawValue())) {
			toast("Rango de precio inválido", {
				description: "El precio máximo no puede ser menor al precio mínimo.",
			});
			return;
		}

		const value = this.configureForm.getRawValue();

		const payload: CreateProviderServiceFormValue = {
			serviceCatalogItemId: value.serviceCatalogItemId,
			customTitle: value.customTitle || null,
			customDescription: value.customDescription || null,
			priceEstimateMin: this.toNullableNumber(value.priceEstimateMin),
			priceEstimateMax: this.toNullableNumber(value.priceEstimateMax),
			estimatedDurationMinutes: this.toNullableNumber(
				value.estimatedDurationMinutes
			),
			isMobileServiceEnabled: value.isMobileServiceEnabled,
			isEmergencyServiceEnabled: value.isEmergencyServiceEnabled,
			isActive: value.isActive,
		};

		const created = await this.store.createProviderService(payload);

		if (!created) {
			toast("No se pudo configurar el servicio", {
				description:
					this.store.creatingProviderServiceError()?.message ||
					"Ocurrió un error inesperado.",
			});
			return;
		}

		this.configureFormOpen.set(false);
		this.selectedConfiguration.set(null);
		this.store.setSelectedCatalogConfiguration(null);

		toast.success("Servicio configurado correctamente");
	}

	onOpenEditForm(service: ProviderService): void {
		this.store.clearUpdatingProviderServiceError();
		this.store.setSelectedProviderService(service);
		this.selectedProviderService.set(service);

		this.editForm.patchValue({
			customTitle: service.customTitle ?? "",
			customDescription: service.customDescription ?? "",
			priceEstimateMin: service.priceEstimateMin ?? 0,
			priceEstimateMax: service.priceEstimateMax ?? 0,
			estimatedDurationMinutes: service.estimatedDurationMinutes ?? 45,
			isMobileServiceEnabled: service.isMobileServiceEnabled,
			isEmergencyServiceEnabled: service.isEmergencyServiceEnabled,
			isActive: service.isActive,
		});

		this.editFormOpen.set(true);
	}

	onCancelEditForm(): void {
		this.editFormOpen.set(false);
		this.selectedProviderService.set(null);
		this.store.setSelectedProviderService(null);
		this.store.clearUpdatingProviderServiceError();
	}

	async onUpdateProviderService(): Promise<void> {
		const selected = this.selectedProviderService();

		if (!selected) {
			return;
		}

		if (this.editForm.invalid) {
			this.editForm.markAllAsTouched();
			return;
		}

		if (!this.isValidPriceRange(this.editForm.getRawValue())) {
			toast("Rango de precio inválido", {
				description: "El precio máximo no puede ser menor al precio mínimo.",
			});
			return;
		}

		const value = this.editForm.getRawValue();

		const payload: UpdateProviderServiceFormValue = {
			customTitle: value.customTitle || null,
			customDescription: value.customDescription || null,
			priceEstimateMin: this.toNullableNumber(value.priceEstimateMin),
			priceEstimateMax: this.toNullableNumber(value.priceEstimateMax),
			estimatedDurationMinutes: this.toNullableNumber(
				value.estimatedDurationMinutes
			),
			isMobileServiceEnabled: value.isMobileServiceEnabled,
			isEmergencyServiceEnabled: value.isEmergencyServiceEnabled,
			isActive: value.isActive,
		};

		const updated = await this.store.updateProviderService(selected.id, payload);

		if (!updated) {
			toast("No se pudo actualizar el servicio", {
				description:
					this.store.updatingProviderServiceError()?.message ||
					"Ocurrió un error inesperado.",
			});
			return;
		}

		this.editFormOpen.set(false);
		this.selectedProviderService.set(null);
		this.store.setSelectedProviderService(null);

		toast.success("Servicio actualizado correctamente");
	}

	private toNullableNumber(value: number): number | null {
		const normalized = Number(value);

		if (!Number.isFinite(normalized) || normalized === 0) {
			return null;
		}

		return normalized;
	}

	private isValidPriceRange(value: {
		priceEstimateMin: number;
		priceEstimateMax: number;
	}): boolean {
		const min = Number(value.priceEstimateMin);
		const max = Number(value.priceEstimateMax);

		if (!min || !max) {
			return true;
		}

		return max >= min;
	}
}
