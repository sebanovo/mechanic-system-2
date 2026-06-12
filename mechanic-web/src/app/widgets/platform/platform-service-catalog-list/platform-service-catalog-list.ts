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
} from "@ng-icons/lucide";
import { toast } from "@spartan-ng/brain/sonner";
import { forkJoin } from "rxjs";

import { ServiceCatalogApi } from "../../../entities/service-catalog/api/service-catalog.api";
import {
	createEmptyServiceCatalogPagination,
	formatServiceCatalogDate,
	formatServiceCatalogDurationRange,
	formatServiceCatalogPriceRange,
	getServiceCatalogOperationalText,
	getUniqueServiceCatalogCategories,
	SERVICE_CATALOG_STATUS_OPTIONS,
	ServiceCatalog,
	ServiceCatalogPagination,
	ServiceCatalogStatus,
} from "../../../entities/service-catalog/model";
import { ServiceCatalogStatusBadge } from "../../../entities/service-catalog/ui/service-catalog-status-badge/service-catalog-status-badge";
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

type PendingCatalogStatusChange = {
	item: ServiceCatalog;
	nextIsActive: boolean;
	title: string;
	description: string;
	confirmLabel: string;
	destructive: boolean;
};

@Component({
	selector: "app-platform-service-catalog-list",
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
		ServiceCatalogStatusBadge,
	],
	providers: [
		provideIcons({
			lucideCalendar,
			lucideClock,
			lucideDollarSign,
			lucideHash,
			lucideInfo,
			lucideTag,
		}),
	],
	templateUrl: "./platform-service-catalog-list.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformServiceCatalogList implements OnInit {
	private readonly serviceCatalogApi = inject(ServiceCatalogApi);

	readonly editClicked = output<ServiceCatalog>();
	readonly dataChanged = output<void>();

	protected readonly items = signal<ServiceCatalog[]>([]);
	protected readonly pagination = signal<ServiceCatalogPagination>(
		createEmptyServiceCatalogPagination()
	);

	protected readonly isLoading = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly search = signal("");
	protected readonly status = signal<ServiceCatalogStatus | "">("");
	protected readonly category = signal("");
	protected readonly statusOptions = SERVICE_CATALOG_STATUS_OPTIONS;
	protected readonly categoryOptions = signal<string[]>([]);

	protected readonly selectedItem = signal<ServiceCatalog | null>(null);
	protected readonly isDetailDrawerOpen = signal(false);
	protected readonly isDetailLoading = signal(false);
	protected readonly detailErrorMessage = signal<string | null>(null);

	protected readonly pendingStatusChange =
		signal<PendingCatalogStatusChange | null>(null);
	protected readonly isChangingStatus = signal(false);

	protected readonly stats = signal({
		total: 0,
		active: 0,
		inactive: 0,
	});

	protected readonly filteredItems = computed(() => {
		const search = this.search().trim().toLowerCase();
		const items = this.items();

		if (!search) {
			return items;
		}

		return items.filter(item => {
			return (
				item.service_name.toLowerCase().includes(search) ||
				item.service_code.toLowerCase().includes(search) ||
				item.category.toLowerCase().includes(search)
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

		this.serviceCatalogApi
			.listPlatformCatalog({
				page: this.pagination().page,
				page_size: this.pagination().page_size,
				search: this.search(),
				category: this.category(),
				is_active: this.statusToIsActive(this.status()),
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

					toast.error("No se pudo cargar el catálogo", {
						description: message,
					});
				},
			});
	}

	loadStats(): void {
		forkJoin({
			all: this.serviceCatalogApi.listPlatformCatalog({
				page: 1,
				page_size: 1,
				is_active: null,
			}),
			active: this.serviceCatalogApi.listPlatformCatalog({
				page: 1,
				page_size: 1,
				is_active: true,
			}),
			inactive: this.serviceCatalogApi.listPlatformCatalog({
				page: 1,
				page_size: 1,
				is_active: false,
			}),
		}).subscribe({
			next: response => {
				this.stats.set({
					total: response.all.pagination.total,
					active: response.active.pagination.total,
					inactive: response.inactive.pagination.total,
				});
			},
			error: () => {
				this.stats.set({
					total: 0,
					active: 0,
					inactive: 0,
				});
			},
		});
	}

	loadCategoryOptions(): void {
		this.serviceCatalogApi
			.listPlatformCatalog({
				page: 1,
				page_size: 100,
				is_active: null,
			})
			.subscribe({
				next: response => {
					this.categoryOptions.set(
						getUniqueServiceCatalogCategories(response.items)
					);
				},
				error: () => {
					this.categoryOptions.set([]);
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

	protected onStatusFilterChange(event: Event): void {
		const target = event.target as HTMLSelectElement;

		this.status.set(target.value as ServiceCatalogStatus | "");
		this.pagination.update(current => ({
			...current,
			page: 1,
		}));

		this.load();
	}

	protected onCategoryFilterChange(event: Event): void {
		const target = event.target as HTMLSelectElement;

		this.category.set(target.value);
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

	protected openDetail(item: ServiceCatalog): void {
		this.isDetailDrawerOpen.set(true);
		this.isDetailLoading.set(true);
		this.detailErrorMessage.set(null);
		this.selectedItem.set(item);

		this.serviceCatalogApi.getPlatformCatalogById(item.id).subscribe({
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

	protected actionsFor(item: ServiceCatalog): ResourceActionItem[] {
		return [
			{
				id: "view",
				label: "Ver detalle",
			},
			{
				id: "edit",
				label: "Editar",
			},
			{
				id: "toggle-status",
				label: item.is_active ? "Desactivar" : "Activar",
				destructive: item.is_active,
			},
		];
	}

	protected onAction(actionId: string, item: ServiceCatalog): void {
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
		}
	}

	protected prepareStatusChange(item: ServiceCatalog): void {
		if (item.is_active) {
			this.pendingStatusChange.set({
				item,
				nextIsActive: false,
				title: "Desactivar servicio",
				description: `El servicio ${item.service_name} dejará de estar disponible para nuevos usos.`,
				confirmLabel: "Desactivar",
				destructive: true,
			});

			return;
		}

		this.pendingStatusChange.set({
			item,
			nextIsActive: true,
			title: "Activar servicio",
			description: `El servicio ${item.service_name} volverá a estar disponible.`,
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

		this.serviceCatalogApi
			.changePlatformCatalogStatus(pending.item.id, {
				is_active: pending.nextIsActive,
			})
			.subscribe({
				next: updated => {
					this.items.update(items =>
						items.map(item => (item.id === updated.id ? updated : item))
					);

					if (this.selectedItem()?.id === updated.id) {
						this.selectedItem.set(updated);
					}

					toast.success("Estado del servicio actualizado", {
						description: updated.is_active
							? `${updated.service_name} fue activado correctamente.`
							: `${updated.service_name} fue desactivado correctamente.`,
					});

					this.pendingStatusChange.set(null);
					this.isChangingStatus.set(false);
					this.loadStats();
					this.loadCategoryOptions();
					this.dataChanged.emit();
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.pendingStatusChange.set(null);
					this.isChangingStatus.set(false);

					toast.error("No se pudo actualizar el estado del servicio", {
						description: message,
					});
				},
			});
	}

	protected priceRange(item: ServiceCatalog): string {
		return formatServiceCatalogPriceRange(item);
	}

	protected durationRange(item: ServiceCatalog): string {
		return formatServiceCatalogDurationRange(item);
	}

	protected operationalText(item: ServiceCatalog): string {
		return getServiceCatalogOperationalText(item);
	}

	protected createdAtLabel(item: ServiceCatalog): string {
		return formatServiceCatalogDate(item.created_at);
	}

	protected updatedAtLabel(item: ServiceCatalog): string {
		return formatServiceCatalogDate(item.updated_at);
	}

	private statusToIsActive(status: ServiceCatalogStatus | ""): boolean | null {
		if (status === "ACTIVE") {
			return true;
		}

		if (status === "INACTIVE") {
			return false;
		}

		return null;
	}
}
