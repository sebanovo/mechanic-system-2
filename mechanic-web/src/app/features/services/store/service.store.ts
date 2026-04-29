import { computed, inject, Injectable, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { AppHttpError } from "../../../core/http/models/app-http-error.model";
import {
	toCreateProviderServiceRequest,
	toProviderService,
	toProviderServiceCatalogConfigurations,
	toProviderServices,
	toUpdateProviderServiceRequest,
} from "../adapters/service.adapter";
import {
	CreateProviderServiceFormValue,
	ProviderService,
	ProviderServiceCatalogConfiguration,
	ProviderServiceCatalogMetaDto,
	ProviderServicesMetaDto,
	UpdateProviderServiceFormValue,
} from "../models/service.types";
import { ServicesApi } from "../services/service.service";

@Injectable({
	providedIn: "root",
})
export class ServicesStore {
	private readonly servicesApi = inject(ServicesApi);

	readonly catalogConfigurations = signal<
		ProviderServiceCatalogConfiguration[]
	>([]);
	readonly catalogMeta = signal<ProviderServiceCatalogMetaDto | null>(null);
	readonly catalogLoading = signal(false);
	readonly catalogHasLoaded = signal(false);
	readonly catalogError = signal<AppHttpError | null>(null);
	readonly hasCatalogError = computed(() => this.catalogError() !== null);
	readonly includeInactiveCatalog = signal(false);

	readonly providerServices = signal<ProviderService[]>([]);
	readonly providerServicesMeta = signal<ProviderServicesMetaDto | null>(null);
	readonly providerServicesLoading = signal(false);
	readonly providerServicesHasLoaded = signal(false);
	readonly providerServicesError = signal<AppHttpError | null>(null);
	readonly hasProviderServicesError = computed(
		() => this.providerServicesError() !== null
	);

	readonly providerServicesCount = computed(
		() => this.providerServicesMeta()?.count ?? this.providerServices().length
	);

	readonly activeProviderServicesCount = computed(
		() => this.providerServices().filter(service => service.isActive).length
	);

	readonly providerServicesIsEmpty = computed(
		() =>
			this.providerServicesHasLoaded() &&
			!this.providerServicesLoading() &&
			this.providerServices().length === 0
	);

	readonly creatingProviderService = signal(false);
	readonly creatingProviderServiceError = signal<AppHttpError | null>(null);
	readonly hasCreatingProviderServiceError = computed(
		() => this.creatingProviderServiceError() !== null
	);

	readonly updatingProviderService = signal(false);
	readonly updatingProviderServiceError = signal<AppHttpError | null>(null);
	readonly hasUpdatingProviderServiceError = computed(
		() => this.updatingProviderServiceError() !== null
	);

	readonly selectedProviderService = signal<ProviderService | null>(null);
	readonly selectedCatalogConfiguration =
		signal<ProviderServiceCatalogConfiguration | null>(null);

	async loadCatalogConfigurations(): Promise<void> {
		this.catalogLoading.set(true);
		this.catalogError.set(null);

		try {
			const response = await firstValueFrom(
				this.servicesApi.getMyCatalogWithConfiguration(
					this.includeInactiveCatalog()
				)
			);

			this.catalogConfigurations.set(
				toProviderServiceCatalogConfigurations(response.data)
			);
			this.catalogMeta.set(response.meta);
			this.catalogHasLoaded.set(true);
		} catch (error) {
			this.catalogError.set(error as AppHttpError);
			this.catalogConfigurations.set([]);
			this.catalogMeta.set(null);
			this.catalogHasLoaded.set(true);
		} finally {
			this.catalogLoading.set(false);
		}
	}

	async loadProviderServices(): Promise<void> {
		this.providerServicesLoading.set(true);
		this.providerServicesError.set(null);

		try {
			const response = await firstValueFrom(
				this.servicesApi.getMyProviderServices()
			);

			this.providerServices.set(toProviderServices(response.data));
			this.providerServicesMeta.set(response.meta);
			this.providerServicesHasLoaded.set(true);
		} catch (error) {
			this.providerServicesError.set(error as AppHttpError);
			this.providerServices.set([]);
			this.providerServicesMeta.set(null);
			this.providerServicesHasLoaded.set(true);
		} finally {
			this.providerServicesLoading.set(false);
		}
	}

	async loadWorkspace(): Promise<void> {
		await Promise.all([
			this.loadCatalogConfigurations(),
			this.loadProviderServices(),
		]);
	}

	async createProviderService(
		formValue: CreateProviderServiceFormValue
	): Promise<ProviderService | null> {
		this.creatingProviderService.set(true);
		this.creatingProviderServiceError.set(null);

		try {
			const payload = toCreateProviderServiceRequest(formValue);
			const dto = await firstValueFrom(
				this.servicesApi.createMyProviderService(payload)
			);
			const service = toProviderService(dto);

			this.upsertProviderServiceInState(service);
			await this.loadCatalogConfigurations();

			return service;
		} catch (error) {
			this.creatingProviderServiceError.set(error as AppHttpError);
			return null;
		} finally {
			this.creatingProviderService.set(false);
		}
	}

	async updateProviderService(
		providerServiceId: string,
		formValue: UpdateProviderServiceFormValue
	): Promise<ProviderService | null> {
		this.updatingProviderService.set(true);
		this.updatingProviderServiceError.set(null);

		try {
			const payload = toUpdateProviderServiceRequest(formValue);
			const dto = await firstValueFrom(
				this.servicesApi.updateMyProviderService(providerServiceId, payload)
			);
			const service = toProviderService(dto);

			this.upsertProviderServiceInState(service);
			await this.loadCatalogConfigurations();

			return service;
		} catch (error) {
			this.updatingProviderServiceError.set(error as AppHttpError);
			return null;
		} finally {
			this.updatingProviderService.set(false);
		}
	}

	setIncludeInactiveCatalog(value: boolean): void {
		this.includeInactiveCatalog.set(value);
	}

	setSelectedProviderService(service: ProviderService | null): void {
		this.selectedProviderService.set(service);
	}

	setSelectedCatalogConfiguration(
		configuration: ProviderServiceCatalogConfiguration | null
	): void {
		this.selectedCatalogConfiguration.set(configuration);
	}

	clearCatalogError(): void {
		this.catalogError.set(null);
	}

	clearProviderServicesError(): void {
		this.providerServicesError.set(null);
	}

	clearCreatingProviderServiceError(): void {
		this.creatingProviderServiceError.set(null);
	}

	clearUpdatingProviderServiceError(): void {
		this.updatingProviderServiceError.set(null);
	}

	private upsertProviderServiceInState(service: ProviderService): void {
		this.providerServices.update(current => {
			const exists = current.some(item => item.id === service.id);

			if (exists) {
				return current.map(item => (item.id === service.id ? service : item));
			}

			return [service, ...current];
		});

		this.providerServicesMeta.set({
			count: this.providerServices().length,
		});

		if (this.selectedProviderService()?.id === service.id) {
			this.selectedProviderService.set(service);
		}
	}
}
