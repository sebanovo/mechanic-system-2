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
	lucideMail,
	lucidePhone,
	lucideShield,
	lucideStar,
	lucideUser,
} from "@ng-icons/lucide";
import { forkJoin } from "rxjs";

import { HlmButtonImports } from "@shared/ui/button";
import { toast } from "@spartan-ng/brain/sonner";

import { TechnicianApi } from "../../../entities/technician/api/technician.api";
import {
	createEmptyTechnicianPagination,
	formatTechnicianDate,
	getTechnicianFullName,
	getTechnicianOperationalText,
	Technician,
	TECHNICIAN_STATUS_OPTIONS,
	TechnicianPagination,
	TechnicianStatus,
} from "../../../entities/technician/model";
import { TechnicianStatusBadge } from "../../../entities/technician/ui/technician-status-badge/technician-status-badge";
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

type PendingStatusChange = {
	technician: Technician;
	nextStatus: TechnicianStatus;
	title: string;
	description: string;
	confirmLabel: string;
	destructive: boolean;
};

@Component({
	selector: "app-tenant-technicians-list",
	standalone: true,
	imports: [
		HlmButtonImports,
		NgIcon,
		TechnicianStatusBadge,
		DataToolbar,
		PageSection,
		LoadingState,
		ErrorState,
		Pagination,
		ResourceActionsMenu,
		SideDrawer,
		ConfirmActionDialog,
		StatCard,
	],
	providers: [
		provideIcons({
			lucideCalendar,
			lucideHash,
			lucideMail,
			lucidePhone,
			lucideShield,
			lucideStar,
			lucideUser,
		}),
	],
	templateUrl: "./tenant-technicians-list.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantTechniciansList implements OnInit {
	private readonly technicianApi = inject(TechnicianApi);

	readonly dataChanged = output<void>();

	protected readonly technicians = signal<Technician[]>([]);
	protected readonly pagination = signal<TechnicianPagination>(
		createEmptyTechnicianPagination()
	);
	protected readonly isLoading = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly search = signal("");
	protected readonly status = signal<TechnicianStatus | "">("");
	protected readonly statusOptions = TECHNICIAN_STATUS_OPTIONS;

	protected readonly selectedTechnician = signal<Technician | null>(null);
	protected readonly isDetailDrawerOpen = signal(false);
	protected readonly isDetailLoading = signal(false);
	protected readonly detailErrorMessage = signal<string | null>(null);

	protected readonly pendingStatusChange = signal<PendingStatusChange | null>(
		null
	);
	protected readonly isChangingStatus = signal(false);

	protected readonly stats = signal({
		total: 0,
		active: 0,
		inactive: 0,
		blocked: 0,
	});

	protected readonly filteredTechnicians = computed(() => {
		const search = this.search().trim().toLowerCase();
		const items = this.technicians();

		if (!search) {
			return items;
		}

		return items.filter(item => {
			const fullName = getTechnicianFullName(item).toLowerCase();
			const email = item.user.email.toLowerCase();
			const code = item.technician.technician_code.toLowerCase();

			return (
				fullName.includes(search) ||
				email.includes(search) ||
				code.includes(search)
			);
		});
	});

	ngOnInit(): void {
		this.load();
		this.loadStats();
	}

	load(): void {
		this.isLoading.set(true);
		this.errorMessage.set(null);

		this.technicianApi
			.listTenantTechnicians({
				page: this.pagination().page,
				page_size: this.pagination().page_size,
				status: this.status(),
			})
			.subscribe({
				next: response => {
					this.technicians.set(response.items);
					this.pagination.set(response.pagination);
					this.isLoading.set(false);
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.isLoading.set(false);

					toast.error("No se pudieron cargar los técnicos", {
						description: message,
					});
				},
			});
	}

	protected loadStats(): void {
		forkJoin({
			all: this.technicianApi.listTenantTechnicians({
				page: 1,
				page_size: 1,
				status: "",
			}),
			active: this.technicianApi.listTenantTechnicians({
				page: 1,
				page_size: 1,
				status: "ACTIVE",
			}),
			inactive: this.technicianApi.listTenantTechnicians({
				page: 1,
				page_size: 1,
				status: "INACTIVE",
			}),
			blocked: this.technicianApi.listTenantTechnicians({
				page: 1,
				page_size: 1,
				status: "BLOCKED",
			}),
		}).subscribe({
			next: response => {
				this.stats.set({
					total: response.all.pagination.total,
					active: response.active.pagination.total,
					inactive: response.inactive.pagination.total,
					blocked: response.blocked.pagination.total,
				});
			},
			error: () => {
				this.stats.set({
					total: 0,
					active: 0,
					inactive: 0,
					blocked: 0,
				});
			},
		});
	}

	protected onSearch(value: string): void {
		this.search.set(value);
	}

	protected onStatusFilterChange(event: Event): void {
		const target = event.target as HTMLSelectElement;

		this.status.set(target.value as TechnicianStatus | "");
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

	protected openDetail(item: Technician): void {
		this.isDetailDrawerOpen.set(true);
		this.isDetailLoading.set(true);
		this.detailErrorMessage.set(null);
		this.selectedTechnician.set(item);

		this.technicianApi.getTenantTechnicianById(item.technician.id).subscribe({
			next: detail => {
				this.selectedTechnician.set(detail);
				this.isDetailLoading.set(false);
			},
			error: error => {
				const message = getApiErrorMessage(error);

				this.detailErrorMessage.set(message);
				this.isDetailLoading.set(false);

				toast.error("No se pudo cargar el detalle del técnico", {
					description: message,
				});
			},
		});
	}

	protected closeDetail(): void {
		this.isDetailDrawerOpen.set(false);
		this.selectedTechnician.set(null);
		this.detailErrorMessage.set(null);
	}

	protected actionsFor(item: Technician): ResourceActionItem[] {
		const status = item.technician.status;

		const actions: ResourceActionItem[] = [
			{
				id: "view",
				label: "Ver detalle",
			},
		];

		if (status !== "ACTIVE") {
			actions.push({
				id: "activate",
				label: "Activar",
			});
		}

		if (status !== "INACTIVE") {
			actions.push({
				id: "deactivate",
				label: "Inactivar",
			});
		}

		if (status !== "BLOCKED") {
			actions.push({
				id: "block",
				label: "Bloquear",
				destructive: true,
			});
		}

		return actions;
	}

	protected onAction(actionId: string, item: Technician): void {
		if (actionId === "view") {
			this.openDetail(item);
			return;
		}

		if (actionId === "activate") {
			this.prepareStatusChange(item, "ACTIVE");
			return;
		}

		if (actionId === "deactivate") {
			this.prepareStatusChange(item, "INACTIVE");
			return;
		}

		if (actionId === "block") {
			this.prepareStatusChange(item, "BLOCKED");
		}
	}

	protected prepareStatusChange(
		technician: Technician,
		nextStatus: TechnicianStatus
	): void {
		const name = this.fullName(technician);

		if (nextStatus === "ACTIVE") {
			this.pendingStatusChange.set({
				technician,
				nextStatus,
				title: "Activar técnico",
				description: `El técnico ${name} podrá operar nuevamente dentro del taller.`,
				confirmLabel: "Activar",
				destructive: false,
			});
			return;
		}

		if (nextStatus === "INACTIVE") {
			this.pendingStatusChange.set({
				technician,
				nextStatus,
				title: "Inactivar técnico",
				description: `El técnico ${name} dejará de estar disponible para operar.`,
				confirmLabel: "Inactivar",
				destructive: false,
			});
			return;
		}

		this.pendingStatusChange.set({
			technician,
			nextStatus,
			title: "Bloquear técnico",
			description: `El técnico ${name} no podrá operar ni acceder normalmente. Usa esta acción solo si corresponde.`,
			confirmLabel: "Bloquear",
			destructive: true,
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

		this.technicianApi
			.changeTenantTechnicianStatus(pending.technician.technician.id, {
				status: pending.nextStatus,
			})
			.subscribe({
				next: updated => {
					this.technicians.update(items =>
						items.map(item =>
							item.technician.id === updated.technician.id ? updated : item
						)
					);

					if (
						this.selectedTechnician()?.technician.id === updated.technician.id
					) {
						this.selectedTechnician.set(updated);
					}

					const statusLabel =
						updated.technician.status === "ACTIVE"
							? "activado"
							: updated.technician.status === "INACTIVE"
								? "inactivado"
								: "bloqueado";

					toast.success("Estado actualizado", {
						description: `El técnico fue ${statusLabel} correctamente.`,
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

	protected fullName(item: Technician): string {
		return getTechnicianFullName(item);
	}

	protected phoneLabel(item: Technician): string {
		return item.user.phone || "Sin teléfono";
	}

	protected operationalText(item: Technician): string {
		return getTechnicianOperationalText(item.technician.status);
	}

	protected createdAtLabel(item: Technician): string {
		return formatTechnicianDate(item.technician.created_at);
	}

	protected lastLoginLabel(item: Technician): string {
		return formatTechnicianDate(item.user.last_login_at);
	}
}
