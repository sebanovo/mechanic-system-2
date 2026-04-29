import { computed, inject, Injectable, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { AppHttpError } from "../../../core/http/models/app-http-error.model";
import {
	toCatalogService,
	toCatalogServices,
	toCreateCatalogServiceRequest,
	toUpdateCatalogServiceRequest,
} from "../adapters/catalog-service.adapter";
import {
	CatalogService,
	CatalogServicesMetaDto,
	CreateCatalogServiceFormValue,
	UpdateCatalogServiceFormValue,
} from "../models/catalog-service.types";
import { CatalogServicesApi } from "../services/catalog-service.service";

@Injectable({
	providedIn: "root",
})
export class CatalogServicesStore {
	private readonly catalogServicesApi = inject(CatalogServicesApi);

	readonly catalogServices = signal<CatalogService[]>([]);
	readonly meta = signal<CatalogServicesMetaDto | null>(null);

	readonly loading = signal(false);
	readonly hasLoaded = signal(false);
	readonly error = signal<AppHttpError | null>(null);
	readonly hasError = computed(() => this.error() !== null);

	readonly includeInactive = signal(true);

	readonly count = computed(
		() => this.meta()?.count ?? this.catalogServices().length
	);

	readonly isEmpty = computed(
		() =>
			this.hasLoaded() && !this.loading() && this.catalogServices().length === 0
	);

	readonly creating = signal(false);
	readonly createError = signal<AppHttpError | null>(null);
	readonly hasCreateError = computed(() => this.createError() !== null);

	readonly updating = signal(false);
	readonly updateError = signal<AppHttpError | null>(null);
	readonly hasUpdateError = computed(() => this.updateError() !== null);

	readonly selectedCatalogService = signal<CatalogService | null>(null);

	async loadCatalogServices(): Promise<void> {
		this.loading.set(true);
		this.error.set(null);

		try {
			const response = await firstValueFrom(
				this.catalogServicesApi.getCatalogServices(this.includeInactive())
			);

			this.catalogServices.set(toCatalogServices(response.data));
			this.meta.set(response.meta);
			this.hasLoaded.set(true);
		} catch (error) {
			this.error.set(error as AppHttpError);
			this.catalogServices.set([]);
			this.meta.set(null);
			this.hasLoaded.set(true);
		} finally {
			this.loading.set(false);
		}
	}

	async createCatalogService(
		formValue: CreateCatalogServiceFormValue
	): Promise<CatalogService | null> {
		this.creating.set(true);
		this.createError.set(null);

		try {
			const payload = toCreateCatalogServiceRequest(formValue);
			const dto = await firstValueFrom(
				this.catalogServicesApi.createCatalogService(payload)
			);
			const service = toCatalogService(dto);

			this.catalogServices.update(current => [service, ...current]);
			this.meta.update(current => ({
				count: (current?.count ?? this.catalogServices().length - 1) + 1,
				include_inactive: this.includeInactive(),
			}));

			return service;
		} catch (error) {
			this.createError.set(error as AppHttpError);
			return null;
		} finally {
			this.creating.set(false);
		}
	}

	async updateCatalogService(
		serviceCatalogItemId: string,
		formValue: UpdateCatalogServiceFormValue
	): Promise<CatalogService | null> {
		this.updating.set(true);
		this.updateError.set(null);

		try {
			const payload = toUpdateCatalogServiceRequest(formValue);
			const dto = await firstValueFrom(
				this.catalogServicesApi.updateCatalogService(
					serviceCatalogItemId,
					payload
				)
			);
			const service = toCatalogService(dto);

			this.catalogServices.update(current =>
				current.map(item => (item.id === service.id ? service : item))
			);

			if (this.selectedCatalogService()?.id === service.id) {
				this.selectedCatalogService.set(service);
			}

			return service;
		} catch (error) {
			this.updateError.set(error as AppHttpError);
			return null;
		} finally {
			this.updating.set(false);
		}
	}

	setIncludeInactive(value: boolean): void {
		this.includeInactive.set(value);
	}

	setSelectedCatalogService(service: CatalogService | null): void {
		this.selectedCatalogService.set(service);
	}

	clearError(): void {
		this.error.set(null);
	}

	clearCreateError(): void {
		this.createError.set(null);
	}

	clearUpdateError(): void {
		this.updateError.set(null);
	}
}
