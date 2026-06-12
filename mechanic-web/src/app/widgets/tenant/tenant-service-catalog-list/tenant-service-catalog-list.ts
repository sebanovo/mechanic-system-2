import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	OnInit,
	signal,
} from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	lucideCalendar,
	lucideClock,
	lucideDollarSign,
	lucideInfo,
	lucideTag,
} from "@ng-icons/lucide";
import { toast } from "@spartan-ng/brain/sonner";

import { ServiceCatalogApi } from "../../../entities/service-catalog/api/service-catalog.api";
import {
	createEmptyServiceCatalogPagination,
	formatServiceCatalogDate,
	formatServiceCatalogDurationRange,
	formatServiceCatalogPriceRange,
	getServiceCatalogOperationalText,
	getUniqueServiceCatalogCategories,
	ServiceCatalog,
	ServiceCatalogPagination,
} from "../../../entities/service-catalog/model";
import { ServiceCatalogStatusBadge } from "../../../entities/service-catalog/ui/service-catalog-status-badge/service-catalog-status-badge";
import { getApiErrorMessage } from "../../../shared/api";
import {
	DataToolbar,
	ErrorState,
	LoadingState,
	PageSection,
	Pagination,
	SideDrawer,
	StatCard,
} from "../../../shared/custom-components";

@Component({
	selector: "app-tenant-service-catalog-list",
	standalone: true,
	imports: [
		NgIcon,
		DataToolbar,
		PageSection,
		LoadingState,
		ErrorState,
		Pagination,
		SideDrawer,
		StatCard,
		ServiceCatalogStatusBadge,
	],
	providers: [
		provideIcons({
			lucideCalendar,
			lucideClock,
			lucideDollarSign,
			lucideInfo,
			lucideTag,
		}),
	],
	templateUrl: "./tenant-service-catalog-list.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantServiceCatalogList implements OnInit {
	private readonly serviceCatalogApi = inject(ServiceCatalogApi);

	protected readonly items = signal<ServiceCatalog[]>([]);
	protected readonly pagination = signal<ServiceCatalogPagination>(
		createEmptyServiceCatalogPagination()
	);

	protected readonly isLoading = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly search = signal("");
	protected readonly category = signal("");
	protected readonly categoryOptions = signal<string[]>([]);

	protected readonly selectedItem = signal<ServiceCatalog | null>(null);
	protected readonly isDetailDrawerOpen = signal(false);
	protected readonly isDetailLoading = signal(false);
	protected readonly detailErrorMessage = signal<string | null>(null);

	protected readonly stats = signal({
		total: 0,
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
				item.service_name.toLowerCase().includes(search) ||
				item.service_code.toLowerCase().includes(search) ||
				item.category.toLowerCase().includes(search)
			);
		});
	});

	ngOnInit(): void {
		this.load();
		this.loadStatsAndCategories();
	}

	protected load(): void {
		this.isLoading.set(true);
		this.errorMessage.set(null);

		this.serviceCatalogApi
			.listTenantCatalog({
				page: this.pagination().page,
				page_size: this.pagination().page_size,
				search: this.search(),
				category: this.category(),
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

	protected loadStatsAndCategories(): void {
		this.serviceCatalogApi
			.listTenantCatalog({
				page: 1,
				page_size: 100,
			})
			.subscribe({
				next: response => {
					const categories = getUniqueServiceCatalogCategories(response.items);

					this.categoryOptions.set(categories);
					this.stats.set({
						total: response.pagination.total,
						categories: categories.length,
					});
				},
				error: () => {
					this.categoryOptions.set([]);
					this.stats.set({
						total: 0,
						categories: 0,
					});
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

		this.serviceCatalogApi.getTenantCatalogById(item.id).subscribe({
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
}
