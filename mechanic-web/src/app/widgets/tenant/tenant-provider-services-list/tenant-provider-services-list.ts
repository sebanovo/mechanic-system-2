import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	OnInit,
	output,
	signal,
} from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	lucideCalendar,
	lucideClock,
	lucideDollarSign,
	lucideHash,
	lucideInfo,
	lucideTag,
	lucideWrench,
} from "@ng-icons/lucide";
import { toast } from "@spartan-ng/brain/sonner";
import { forkJoin } from "rxjs";

import { ProviderServiceApi } from "../../../entities/provider-service/api/provider-service.api";
import {
	createEmptyProviderServicePagination,
	formatProviderServiceCatalogPriceRange,
	formatProviderServiceCustomPriceRange,
	formatProviderServiceDate,
	formatProviderServiceDurationRange,
	formatProviderServiceEffectivePriceRange,
	getProviderServiceOperationalText,
	getUniqueProviderServiceCategories,
	PROVIDER_SERVICE_STATUS_OPTIONS,
	ProviderServiceAvailabilityFilter,
	ProviderServiceDetail,
	providerServiceFilterToBoolean,
	ProviderServicePagination,
} from "../../../entities/provider-service/model";
import { ProviderServiceStatusBadge } from "../../../entities/provider-service/ui/provider-service-status-badge/provider-service-status-badge";
import { getApiErrorMessage } from "../../../shared/api";
import {
	ConfirmActionDialog,
	DataToolbar,
	ErrorState,
	LoadingState,
	PageSection,
	Pagination,
	ResourceActionItem,
	ResourceActionsMenu,
	SideDrawer,
	StatCard,
} from "../../../shared/custom-components";

type PendingProviderServiceStatusChange = {
	item: ProviderServiceDetail;
	nextIsAvailable: boolean;
	title: string;
	description: string;
	confirmLabel: string;
	destructive: boolean;
};

type PendingProviderServiceRemoval = {
	item: ProviderServiceDetail;
	title: string;
	description: string;
	confirmLabel: string;
};

@Component({
	selector: "app-tenant-provider-services-list",
	standalone: true,
	imports: [
		NgIcon,
		DataToolbar,
		PageSection,
		LoadingState,
		ErrorState,
		Pagination,
		ResourceActionsMenu,
		SideDrawer,
		ConfirmActionDialog,
		StatCard,
		ProviderServiceStatusBadge,
	],
	providers: [
		provideIcons({
			lucideCalendar,
			lucideClock,
			lucideDollarSign,
			lucideHash,
			lucideInfo,
			lucideTag,
			lucideWrench,
		}),
	],
	templateUrl: "./tenant-provider-services-list.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantProviderServicesList implements OnInit {
	private readonly providerServiceApi = inject(ProviderServiceApi);

	readonly editClicked = output<ProviderServiceDetail>();
	readonly dataChanged = output<void>();

	protected readonly items = signal<ProviderServiceDetail[]>([]);
	protected readonly pagination = signal<ProviderServicePagination>(
		createEmptyProviderServicePagination()
	);

	protected readonly isLoading = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly search = signal("");
	protected readonly availability =
		signal<ProviderServiceAvailabilityFilter>("");
	protected readonly categoryFilter = signal("");
	protected readonly statusOptions = PROVIDER_SERVICE_STATUS_OPTIONS;
	protected readonly categoryOptions = signal<string[]>([]);

	protected readonly selectedItem = signal<ProviderServiceDetail | null>(null);
	protected readonly isDetailDrawerOpen = signal(false);
	protected readonly isDetailLoading = signal(false);
	protected readonly detailErrorMessage = signal<string | null>(null);

	protected readonly pendingStatusChange =
		signal<PendingProviderServiceStatusChange | null>(null);
	protected readonly isChangingStatus = signal(false);

	protected readonly pendingRemoval =
		signal<PendingProviderServiceRemoval | null>(null);
	protected readonly isRemoving = signal(false);

	protected readonly stats = signal({
		total: 0,
		available: 0,
		unavailable: 0,
		categories: 0,
	});

	protected readonly filteredItems = computed(() => {
		const search = this.search().trim().toLowerCase();
		const items = this.items();

		if (!search) {
			return items;
		}

		return items.filter(item => {
			return (
				item.service_catalog.service_name.toLowerCase().includes(search) ||
				item.service_catalog.service_code.toLowerCase().includes(search) ||
				item.service_catalog.category.toLowerCase().includes(search)
			);
		});
	});

	ngOnInit(): void {
		this.load();
		this.loadStats();
		this.loadCategoryOptions();
	}

	load(): void {
		this.isLoading.set(true);
		this.errorMessage.set(null);

		this.providerServiceApi
			.listCurrentTenantProviderServices({
				page: this.pagination().page,
				page_size: this.pagination().page_size,
				search: this.search(),
				category: this.categoryFilter(),
				is_available: providerServiceFilterToBoolean(this.availability()),
			})
			.subscribe({
				next: response => {
					this.items.set(response.items);
					this.pagination.set(response.pagination);
					this.isLoading.set(false);
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.isLoading.set(false);

					toast.error("No se pudieron cargar los servicios del taller", {
						description: message,
					});
				},
			});
	}

	loadStats(): void {
		forkJoin({
			all: this.providerServiceApi.listCurrentTenantProviderServices({
				page: 1,
				page_size: 1,
				is_available: null,
			}),
			available: this.providerServiceApi.listCurrentTenantProviderServices({
				page: 1,
				page_size: 1,
				is_available: true,
			}),
			unavailable: this.providerServiceApi.listCurrentTenantProviderServices({
				page: 1,
				page_size: 1,
				is_available: false,
			}),
		}).subscribe({
			next: response => {
				this.stats.update(current => ({
					...current,
					total: response.all.pagination.total,
					available: response.available.pagination.total,
					unavailable: response.unavailable.pagination.total,
				}));
			},
			error: () => {
				this.stats.update(current => ({
					...current,
					total: 0,
					available: 0,
					unavailable: 0,
				}));
			},
		});
	}

	loadCategoryOptions(): void {
		this.providerServiceApi
			.listCurrentTenantProviderServices({
				page: 1,
				page_size: 200,
				is_available: null,
			})
			.subscribe({
				next: response => {
					const categories = getUniqueProviderServiceCategories(response.items);

					this.categoryOptions.set(categories);
					this.stats.update(current => ({
						...current,
						categories: categories.length,
					}));
				},
				error: () => {
					this.categoryOptions.set([]);
					this.stats.update(current => ({
						...current,
						categories: 0,
					}));
				},
			});
	}

	protected onSearch(value: string): void {
		this.search.set(value);
		this.pagination.update(current => ({
			...current,
			page: 1,
		}));

		this.load();
	}

	protected onAvailabilityFilterChange(event: Event): void {
		const target = event.target as HTMLSelectElement;

		this.availability.set(target.value as ProviderServiceAvailabilityFilter);
		this.pagination.update(current => ({
			...current,
			page: 1,
		}));

		this.load();
	}

	protected onCategoryFilterChange(event: Event): void {
		const target = event.target as HTMLSelectElement;

		this.categoryFilter.set(target.value);
		this.pagination.update(current => ({
			...current,
			page: 1,
		}));

		this.load();
	}

	protected onPageChange(page: number): void {
		this.pagination.update(current => ({
			...current,
			page,
		}));

		this.load();
	}

	protected onPageSizeChange(pageSize: number): void {
		this.pagination.update(current => ({
			...current,
			page: 1,
			page_size: pageSize,
		}));

		this.load();
	}

	protected openDetail(item: ProviderServiceDetail): void {
		this.isDetailDrawerOpen.set(true);
		this.isDetailLoading.set(true);
		this.detailErrorMessage.set(null);
		this.selectedItem.set(item);

		this.providerServiceApi
			.getCurrentTenantProviderServiceById(item.provider_service.id)
			.subscribe({
				next: detail => {
					this.selectedItem.set(detail);
					this.isDetailLoading.set(false);
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.detailErrorMessage.set(message);
					this.isDetailLoading.set(false);

					toast.error("No se pudo cargar el detalle del servicio", {
						description: message,
					});
				},
			});
	}

	protected closeDetail(): void {
		this.isDetailDrawerOpen.set(false);
		this.selectedItem.set(null);
		this.detailErrorMessage.set(null);
	}

	protected actionsFor(item: ProviderServiceDetail): ResourceActionItem[] {
		return [
			{
				id: "view",
				label: "Ver detalle",
			},
			{
				id: "edit",
				label: "Editar precios",
			},
			{
				id: "toggle-status",
				label: item.provider_service.is_available ? "Desactivar" : "Activar",
				destructive: item.provider_service.is_available,
			},
			{
				id: "remove",
				label: "Quitar del taller",
				destructive: true,
			},
		];
	}

	protected onAction(actionId: string, item: ProviderServiceDetail): void {
		if (actionId === "view") {
			this.openDetail(item);
			return;
		}

		if (actionId === "edit") {
			this.editClicked.emit(item);
			return;
		}

		if (actionId === "toggle-status") {
			this.prepareStatusChange(item);
			return;
		}

		if (actionId === "remove") {
			this.prepareRemoval(item);
		}
	}

	protected prepareStatusChange(item: ProviderServiceDetail): void {
		if (item.provider_service.is_available) {
			this.pendingStatusChange.set({
				item,
				nextIsAvailable: false,
				title: "Desactivar servicio",
				description: `${item.service_catalog.service_name} dejará de estar disponible para nuevas solicitudes del taller.`,
				confirmLabel: "Desactivar",
				destructive: true,
			});

			return;
		}

		this.pendingStatusChange.set({
			item,
			nextIsAvailable: true,
			title: "Activar servicio",
			description: `${item.service_catalog.service_name} volverá a estar disponible para nuevas solicitudes.`,
			confirmLabel: "Activar",
			destructive: false,
		});
	}

	protected cancelStatusChange(): void {
		if (this.isChangingStatus()) {
			return;
		}

		this.pendingStatusChange.set(null);
	}

	protected confirmStatusChange(): void {
		const pending = this.pendingStatusChange();

		if (!pending || this.isChangingStatus()) {
			return;
		}

		this.isChangingStatus.set(true);

		this.providerServiceApi
			.changeCurrentTenantProviderServiceStatus(
				pending.item.provider_service.id,
				{
					is_available: pending.nextIsAvailable,
				}
			)
			.subscribe({
				next: updated => {
					this.patchItem(updated);

					toast.success("Estado actualizado", {
						description: updated.provider_service.is_available
							? `${updated.service_catalog.service_name} fue activado correctamente.`
							: `${updated.service_catalog.service_name} fue desactivado correctamente.`,
					});

					this.pendingStatusChange.set(null);
					this.isChangingStatus.set(false);
					this.loadStats();
					this.dataChanged.emit();
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.pendingStatusChange.set(null);
					this.isChangingStatus.set(false);

					toast.error("No se pudo actualizar el estado", {
						description: message,
					});
				},
			});
	}

	protected prepareRemoval(item: ProviderServiceDetail): void {
		this.pendingRemoval.set({
			item,
			title: "Quitar servicio del taller",
			description: `${item.service_catalog.service_name} será deshabilitado para el taller. Podrás volver a agregarlo o activarlo después si corresponde.`,
			confirmLabel: "Quitar servicio",
		});
	}

	protected cancelRemoval(): void {
		if (this.isRemoving()) {
			return;
		}

		this.pendingRemoval.set(null);
	}

	protected confirmRemoval(): void {
		const pending = this.pendingRemoval();

		if (!pending || this.isRemoving()) {
			return;
		}

		this.isRemoving.set(true);

		this.providerServiceApi
			.removeCurrentTenantProviderService(pending.item.provider_service.id)
			.subscribe({
				next: updated => {
					this.items.update(items =>
						items.filter(
							item => item.provider_service.id !== updated.provider_service.id
						)
					);

					if (
						this.selectedItem()?.provider_service.id ===
						updated.provider_service.id
					) {
						this.closeDetail();
					}

					toast.success("Servicio quitado", {
						description: `${updated.service_catalog.service_name} fue quitado del taller.`,
					});

					this.pendingRemoval.set(null);
					this.isRemoving.set(false);
					this.loadStats();
					this.loadCategoryOptions();
					this.refreshPageAfterRemoval();
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.pendingRemoval.set(null);
					this.isRemoving.set(false);

					toast.error("No se pudo quitar el servicio", {
						description: message,
					});
				},
			});
	}

	protected refreshPageAfterRemoval(): void {
		const remainingItems = this.items().length;

		if (remainingItems === 0 && this.pagination().page > 1) {
			this.pagination.update(current => ({
				...current,
				page: current.page - 1,
			}));
		}

		this.load();
	}

	patchItem(updated: ProviderServiceDetail): void {
		this.items.update(items =>
			items.map(item =>
				item.provider_service.id === updated.provider_service.id
					? updated
					: item
			)
		);

		if (
			this.selectedItem()?.provider_service.id === updated.provider_service.id
		) {
			this.selectedItem.set(updated);
		}
	}

	protected serviceName(item: ProviderServiceDetail): string {
		return item.service_catalog.service_name;
	}

	protected serviceCode(item: ProviderServiceDetail): string {
		return item.service_catalog.service_code;
	}

	protected categoryLabel(item: ProviderServiceDetail): string {
		return item.service_catalog.category;
	}

	protected effectivePriceLabel(item: ProviderServiceDetail): string {
		return formatProviderServiceEffectivePriceRange(item);
	}

	protected customPriceLabel(item: ProviderServiceDetail): string {
		return formatProviderServiceCustomPriceRange(item);
	}

	protected catalogPriceLabel(item: ProviderServiceDetail): string {
		return formatProviderServiceCatalogPriceRange(item);
	}

	protected durationLabel(item: ProviderServiceDetail): string {
		return formatProviderServiceDurationRange(item);
	}

	protected operationalText(item: ProviderServiceDetail): string {
		return getProviderServiceOperationalText(item);
	}

	protected createdAtLabel(item: ProviderServiceDetail): string {
		return formatProviderServiceDate(item.provider_service.created_at);
	}

	protected updatedAtLabel(item: ProviderServiceDetail): string {
		return formatProviderServiceDate(item.provider_service.updated_at);
	}
}
