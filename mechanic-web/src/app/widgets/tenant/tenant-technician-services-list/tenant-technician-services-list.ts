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
	lucideHash,
	lucideInfo,
	lucideTag,
	lucideUser,
	lucideWrench,
} from "@ng-icons/lucide";
import { toast } from "@spartan-ng/brain/sonner";
import { forkJoin } from "rxjs";

import { TechnicianServiceApi } from "../../../entities/technician-service/api/technician-service.api";
import {
	createEmptyTechnicianServicePagination,
	formatTechnicianServiceDate,
	getTechnicianServiceCategory,
	getTechnicianServiceCode,
	getTechnicianServiceName,
	getTechnicianServiceOperationalText,
	getTechnicianServiceSkillText,
	getTechnicianServiceTechnicianLabel,
	getUniqueTechnicianServiceCatalogOptions,
	TECHNICIAN_SERVICE_STATUS_OPTIONS,
	TechnicianServiceDetail,
	TechnicianServiceEnabledFilter,
	technicianServiceEnabledFilterToBoolean,
	TechnicianServicePagination,
} from "../../../entities/technician-service/model";
import { TechnicianServiceStatusBadge } from "../../../entities/technician-service/ui/technician-service-status-badge/technician-service-status-badge";
import { TechnicianSkillLevelBadge } from "../../../entities/technician-service/ui/technician-skill-level-badge/technician-skill-level-badge";
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

type PendingTechnicianServiceStatusChange = {
	item: TechnicianServiceDetail;
	nextIsEnabled: boolean;
	title: string;
	description: string;
	confirmLabel: string;
	destructive: boolean;
};

type PendingTechnicianServiceRemoval = {
	item: TechnicianServiceDetail;
	title: string;
	description: string;
	confirmLabel: string;
};

@Component({
	selector: "app-tenant-technician-services-list",
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
		TechnicianServiceStatusBadge,
		TechnicianSkillLevelBadge,
	],
	providers: [
		provideIcons({
			lucideCalendar,
			lucideHash,
			lucideInfo,
			lucideTag,
			lucideUser,
			lucideWrench,
		}),
	],
	templateUrl: "./tenant-technician-services-list.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantTechnicianServicesList implements OnInit {
	private readonly technicianServiceApi = inject(TechnicianServiceApi);

	readonly editClicked = output<TechnicianServiceDetail>();
	readonly dataChanged = output<void>();

	protected readonly items = signal<TechnicianServiceDetail[]>([]);
	protected readonly pagination = signal<TechnicianServicePagination>(
		createEmptyTechnicianServicePagination()
	);

	protected readonly isLoading = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly search = signal("");
	protected readonly enabledFilter = signal<TechnicianServiceEnabledFilter>("");
	protected readonly serviceCatalogId = signal("");
	protected readonly statusOptions = TECHNICIAN_SERVICE_STATUS_OPTIONS;
	protected readonly serviceCatalogOptions = signal<
		{
			id: string;
			label: string;
			category: string;
		}[]
	>([]);

	protected readonly selectedItem = signal<TechnicianServiceDetail | null>(
		null
	);
	protected readonly isDetailDrawerOpen = signal(false);
	protected readonly isDetailLoading = signal(false);
	protected readonly detailErrorMessage = signal<string | null>(null);

	protected readonly pendingStatusChange =
		signal<PendingTechnicianServiceStatusChange | null>(null);
	protected readonly isChangingStatus = signal(false);

	protected readonly pendingRemoval =
		signal<PendingTechnicianServiceRemoval | null>(null);
	protected readonly isRemoving = signal(false);

	protected readonly stats = signal({
		total: 0,
		enabled: 0,
		disabled: 0,
		services: 0,
	});

	protected readonly filteredItems = computed(() => {
		const search = this.search().trim().toLowerCase();
		const items = this.items();

		if (!search) {
			return items;
		}

		return items.filter(item => {
			return (
				getTechnicianServiceTechnicianLabel(item)
					.toLowerCase()
					.includes(search) ||
				getTechnicianServiceName(item).toLowerCase().includes(search) ||
				getTechnicianServiceCode(item).toLowerCase().includes(search) ||
				getTechnicianServiceCategory(item).toLowerCase().includes(search)
			);
		});
	});

	ngOnInit(): void {
		this.load();
		this.loadStats();
		this.loadServiceCatalogOptions();
	}

	load(): void {
		this.isLoading.set(true);
		this.errorMessage.set(null);

		this.technicianServiceApi
			.listCurrentTenantTechnicianServices({
				page: this.pagination().page,
				page_size: this.pagination().page_size,
				service_catalog_id: this.serviceCatalogId(),
				is_enabled: technicianServiceEnabledFilterToBoolean(
					this.enabledFilter()
				),
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

					toast.error("No se pudieron cargar los servicios técnicos", {
						description: message,
					});
				},
			});
	}

	loadStats(): void {
		forkJoin({
			all: this.technicianServiceApi.listCurrentTenantTechnicianServices({
				page: 1,
				page_size: 1,
				is_enabled: null,
			}),
			enabled: this.technicianServiceApi.listCurrentTenantTechnicianServices({
				page: 1,
				page_size: 1,
				is_enabled: true,
			}),
			disabled: this.technicianServiceApi.listCurrentTenantTechnicianServices({
				page: 1,
				page_size: 1,
				is_enabled: false,
			}),
		}).subscribe({
			next: response => {
				this.stats.update(current => ({
					...current,
					total: response.all.pagination.total,
					enabled: response.enabled.pagination.total,
					disabled: response.disabled.pagination.total,
				}));
			},
			error: () => {
				this.stats.update(current => ({
					...current,
					total: 0,
					enabled: 0,
					disabled: 0,
				}));
			},
		});
	}

	loadServiceCatalogOptions(): void {
		this.technicianServiceApi
			.listCurrentTenantTechnicianServices({
				page: 1,
				page_size: 10,
				is_enabled: null,
			})
			.subscribe({
				next: response => {
					const options = getUniqueTechnicianServiceCatalogOptions(
						response.items
					);

					this.serviceCatalogOptions.set(options);
					this.stats.update(current => ({
						...current,
						services: options.length,
					}));
				},
				error: () => {
					this.serviceCatalogOptions.set([]);
					this.stats.update(current => ({
						...current,
						services: 0,
					}));
				},
			});
	}

	protected onSearch(value: string): void {
		this.search.set(value);
	}

	protected onEnabledFilterChange(event: Event): void {
		const target = event.target as HTMLSelectElement;

		this.enabledFilter.set(target.value as TechnicianServiceEnabledFilter);
		this.pagination.update(current => ({
			...current,
			page: 1,
		}));

		this.load();
	}

	protected onServiceCatalogFilterChange(event: Event): void {
		const target = event.target as HTMLSelectElement;

		this.serviceCatalogId.set(target.value);
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

	protected openDetail(item: TechnicianServiceDetail): void {
		this.isDetailDrawerOpen.set(true);
		this.isDetailLoading.set(true);
		this.detailErrorMessage.set(null);
		this.selectedItem.set(item);

		this.technicianServiceApi
			.getCurrentTenantTechnicianServiceById(item.technician_service.id)
			.subscribe({
				next: detail => {
					this.selectedItem.set(detail);
					this.isDetailLoading.set(false);
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.detailErrorMessage.set(message);
					this.isDetailLoading.set(false);

					toast.error("No se pudo cargar el detalle", {
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

	protected actionsFor(item: TechnicianServiceDetail): ResourceActionItem[] {
		return [
			{
				id: "view",
				label: "Ver detalle",
			},
			{
				id: "edit",
				label: "Editar nivel",
			},
			{
				id: "toggle-status",
				label: item.technician_service.is_enabled
					? "Deshabilitar"
					: "Habilitar",
				destructive: item.technician_service.is_enabled,
			},
			{
				id: "remove",
				label: "Eliminar vínculo",
				destructive: true,
			},
		];
	}

	protected onAction(actionId: string, item: TechnicianServiceDetail): void {
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

	protected prepareStatusChange(item: TechnicianServiceDetail): void {
		if (item.technician_service.is_enabled) {
			this.pendingStatusChange.set({
				item,
				nextIsEnabled: false,
				title: "Deshabilitar servicio del técnico",
				description: `${getTechnicianServiceTechnicianLabel(item)} dejará de estar habilitado para atender ${getTechnicianServiceName(item)}.`,
				confirmLabel: "Deshabilitar",
				destructive: true,
			});

			return;
		}

		this.pendingStatusChange.set({
			item,
			nextIsEnabled: true,
			title: "Habilitar servicio del técnico",
			description: `${getTechnicianServiceTechnicianLabel(item)} podrá atender ${getTechnicianServiceName(item)}.`,
			confirmLabel: "Habilitar",
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

		this.technicianServiceApi
			.changeCurrentTenantTechnicianServiceStatus(
				pending.item.technician_service.id,
				{
					is_enabled: pending.nextIsEnabled,
				}
			)
			.subscribe({
				next: updated => {
					this.patchItem(updated);

					toast.success("Estado actualizado", {
						description: updated.technician_service.is_enabled
							? `${updated.technician.technician_code} fue habilitado para ${updated.provider_service.service_catalog.service_name}.`
							: `${updated.technician.technician_code} fue deshabilitado para ${updated.provider_service.service_catalog.service_name}.`,
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

	protected prepareRemoval(item: TechnicianServiceDetail): void {
		this.pendingRemoval.set({
			item,
			title: "Eliminar servicio del técnico",
			description: `Se eliminará el vínculo entre ${getTechnicianServiceTechnicianLabel(item)} y ${getTechnicianServiceName(item)}.`,
			confirmLabel: "Eliminar vínculo",
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

		this.technicianServiceApi
			.removeCurrentTenantTechnicianService(pending.item.technician_service.id)
			.subscribe({
				next: updated => {
					this.items.update(items =>
						items.filter(
							item =>
								item.technician_service.id !== updated.technician_service.id
						)
					);

					if (
						this.selectedItem()?.technician_service.id ===
						updated.technician_service.id
					) {
						this.closeDetail();
					}

					toast.success("Vínculo eliminado", {
						description: `${updated.technician.technician_code} ya no tiene asignado ${updated.provider_service.service_catalog.service_name}.`,
					});

					this.pendingRemoval.set(null);
					this.isRemoving.set(false);
					this.loadStats();
					this.loadServiceCatalogOptions();
					this.refreshPageAfterRemoval();
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.pendingRemoval.set(null);
					this.isRemoving.set(false);

					toast.error("No se pudo eliminar el vínculo", {
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

	patchItem(updated: TechnicianServiceDetail): void {
		this.items.update(items =>
			items.map(item =>
				item.technician_service.id === updated.technician_service.id
					? updated
					: item
			)
		);

		if (
			this.selectedItem()?.technician_service.id ===
			updated.technician_service.id
		) {
			this.selectedItem.set(updated);
		}
	}

	protected technicianLabel(item: TechnicianServiceDetail): string {
		return getTechnicianServiceTechnicianLabel(item);
	}

	protected serviceName(item: TechnicianServiceDetail): string {
		return getTechnicianServiceName(item);
	}

	protected serviceCode(item: TechnicianServiceDetail): string {
		return getTechnicianServiceCode(item);
	}

	protected category(item: TechnicianServiceDetail): string {
		return getTechnicianServiceCategory(item);
	}

	protected operationalText(item: TechnicianServiceDetail): string {
		return getTechnicianServiceOperationalText(item);
	}

	protected skillText(item: TechnicianServiceDetail): string {
		return getTechnicianServiceSkillText(item);
	}

	protected createdAtLabel(item: TechnicianServiceDetail): string {
		return formatTechnicianServiceDate(item.technician_service.created_at);
	}

	protected updatedAtLabel(item: TechnicianServiceDetail): string {
		return formatTechnicianServiceDate(item.technician_service.updated_at);
	}
}
