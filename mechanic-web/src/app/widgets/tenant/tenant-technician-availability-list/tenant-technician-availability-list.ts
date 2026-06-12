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
	lucideHash,
	lucideInfo,
	lucideMail,
	lucidePhone,
	lucideUser,
} from "@ng-icons/lucide";
import { toast } from "@spartan-ng/brain/sonner";
import { catchError, forkJoin, map, of } from "rxjs";

import { TechnicianAvailabilityApi } from "../../../entities/technician-availability/api/technician-availability.api";
import {
	formatTechnicianAvailabilityDate,
	getAvailabilityWindowLabel,
	getTechnicianAvailabilityOperationalText,
	getTechnicianAvailabilityStatus,
	isTechnicianAvailableNow,
	TECHNICIAN_AVAILABILITY_STATUS_OPTIONS,
	TechnicianAvailability,
	TechnicianAvailabilityDetail,
	TechnicianAvailabilityFilter,
	technicianAvailabilityMatchesFilter,
	TechnicianAvailabilityStatus,
} from "../../../entities/technician-availability/model";
import { TechnicianAvailabilityStatusBadge } from "../../../entities/technician-availability/ui/technician-availability-status-badge/technician-availability-status-badge";
import { TechnicianApi } from "../../../entities/technician/api/technician.api";
import {
	createEmptyTechnicianPagination,
	getTechnicianFullName,
	Technician,
	TECHNICIAN_STATUS_OPTIONS,
	TechnicianPagination,
	TechnicianStatus,
} from "../../../entities/technician/model";
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

type PendingAvailabilityQuickChange = {
	item: TechnicianAvailabilityDetail;
	nextStatus: TechnicianAvailabilityStatus;
	title: string;
	description: string;
	confirmLabel: string;
	destructive: boolean;
};

@Component({
	selector: "app-tenant-technician-availability-list",
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
		TechnicianAvailabilityStatusBadge,
	],
	providers: [
		provideIcons({
			lucideCalendar,
			lucideClock,
			lucideHash,
			lucideInfo,
			lucideMail,
			lucidePhone,
			lucideUser,
		}),
	],
	templateUrl: "./tenant-technician-availability-list.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantTechnicianAvailabilityList implements OnInit {
	private readonly technicianApi = inject(TechnicianApi);
	private readonly availabilityApi = inject(TechnicianAvailabilityApi);

	readonly editClicked = output<TechnicianAvailabilityDetail>();
	readonly dataChanged = output<void>();

	protected readonly items = signal<TechnicianAvailabilityDetail[]>([]);
	protected readonly pagination = signal<TechnicianPagination>(
		createEmptyTechnicianPagination()
	);

	protected readonly isLoading = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly search = signal("");
	protected readonly technicianStatus = signal<TechnicianStatus | "ACTIVE">(
		"ACTIVE"
	);
	protected readonly availabilityStatus =
		signal<TechnicianAvailabilityFilter>("");
	protected readonly technicianStatusOptions = TECHNICIAN_STATUS_OPTIONS;
	protected readonly availabilityStatusOptions =
		TECHNICIAN_AVAILABILITY_STATUS_OPTIONS;

	protected readonly selectedItem = signal<TechnicianAvailabilityDetail | null>(
		null
	);
	protected readonly isDetailDrawerOpen = signal(false);

	protected readonly pendingQuickChange =
		signal<PendingAvailabilityQuickChange | null>(null);
	protected readonly isChangingStatus = signal(false);

	protected readonly stats = signal({
		total: 0,
		available: 0,
		busy: 0,
		offline: 0,
		onBreak: 0,
		availableNow: 0,
	});

	protected readonly filteredItems = computed(() => {
		const search = this.search().trim().toLowerCase();
		const availabilityFilter = this.availabilityStatus();

		return this.items().filter(item => {
			const matchesAvailability = technicianAvailabilityMatchesFilter(
				item,
				availabilityFilter
			);

			if (!matchesAvailability) {
				return false;
			}

			if (!search) {
				return true;
			}

			const fullName = getTechnicianFullName(item.technician).toLowerCase();
			const email = item.technician.user.email.toLowerCase();
			const code = item.technician.technician.technician_code.toLowerCase();

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
				status: this.technicianStatus(),
			})
			.subscribe({
				next: response => {
					this.pagination.set(response.pagination);
					this.loadAvailabilityForTechnicians(response.items);
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

	loadStats(): void {
		this.technicianApi
			.listTenantTechnicians({
				page: 1,
				page_size: 200,
				status: "ACTIVE",
			})
			.subscribe({
				next: response => {
					this.loadAvailabilityStats(response.items);
				},
				error: () => {
					this.stats.set({
						total: 0,
						available: 0,
						busy: 0,
						offline: 0,
						onBreak: 0,
						availableNow: 0,
					});
				},
			});
	}

	private loadAvailabilityForTechnicians(technicians: Technician[]): void {
		if (technicians.length === 0) {
			this.items.set([]);
			this.isLoading.set(false);
			return;
		}

		const requests = technicians.map(technician =>
			this.availabilityApi
				.getCurrentTenantTechnicianAvailability(technician.technician.id)
				.pipe(
					map(availability => ({
						technician,
						availability,
					})),
					catchError(() =>
						of({
							technician,
							availability: null,
						})
					)
				)
		);

		forkJoin(requests).subscribe({
			next: items => {
				this.items.set(items);
				this.isLoading.set(false);
			},
			error: error => {
				const message = getApiErrorMessage(error);

				this.errorMessage.set(message);
				this.isLoading.set(false);

				toast.error("No se pudo cargar la disponibilidad", {
					description: message,
				});
			},
		});
	}

	private loadAvailabilityStats(technicians: Technician[]): void {
		if (technicians.length === 0) {
			this.stats.set({
				total: 0,
				available: 0,
				busy: 0,
				offline: 0,
				onBreak: 0,
				availableNow: 0,
			});
			return;
		}

		const requests = technicians.map(technician =>
			this.availabilityApi
				.getCurrentTenantTechnicianAvailability(technician.technician.id)
				.pipe(
					map(availability => ({
						technician,
						availability,
					})),
					catchError(() =>
						of({
							technician,
							availability: null,
						})
					)
				)
		);

		forkJoin(requests).subscribe({
			next: items => {
				this.stats.set({
					total: items.length,
					available: items.filter(
						item => getTechnicianAvailabilityStatus(item) === "AVAILABLE"
					).length,
					busy: items.filter(
						item => getTechnicianAvailabilityStatus(item) === "BUSY"
					).length,
					offline: items.filter(
						item => getTechnicianAvailabilityStatus(item) === "OFFLINE"
					).length,
					onBreak: items.filter(
						item => getTechnicianAvailabilityStatus(item) === "ON_BREAK"
					).length,
					availableNow: items.filter(item => isTechnicianAvailableNow(item))
						.length,
				});
			},
			error: () => {
				this.stats.set({
					total: 0,
					available: 0,
					busy: 0,
					offline: 0,
					onBreak: 0,
					availableNow: 0,
				});
			},
		});
	}

	protected onSearch(value: string): void {
		this.search.set(value);
	}

	protected onTechnicianStatusChange(event: Event): void {
		const target = event.target as HTMLSelectElement;

		this.technicianStatus.set(target.value as TechnicianStatus | "ACTIVE");
		this.pagination.update(current => ({
			...current,
			page: 1,
		}));

		this.load();
	}

	protected onAvailabilityStatusChange(event: Event): void {
		const target = event.target as HTMLSelectElement;

		this.availabilityStatus.set(target.value as TechnicianAvailabilityFilter);
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

	protected openDetail(item: TechnicianAvailabilityDetail): void {
		this.selectedItem.set(item);
		this.isDetailDrawerOpen.set(true);
	}

	protected closeDetail(): void {
		this.selectedItem.set(null);
		this.isDetailDrawerOpen.set(false);
	}

	protected actionsFor(
		item: TechnicianAvailabilityDetail
	): ResourceActionItem[] {
		const currentStatus = getTechnicianAvailabilityStatus(item);

		const actions: ResourceActionItem[] = [
			{
				id: "view",
				label: "Ver detalle",
			},
			{
				id: "edit",
				label: "Editar horario",
			},
		];

		if (currentStatus !== "AVAILABLE") {
			actions.push({
				id: "available",
				label: "Marcar disponible",
			});
		}

		if (currentStatus !== "ON_BREAK") {
			actions.push({
				id: "break",
				label: "Marcar en descanso",
			});
		}

		if (currentStatus !== "BUSY") {
			actions.push({
				id: "busy",
				label: "Marcar ocupado",
			});
		}

		if (currentStatus !== "OFFLINE") {
			actions.push({
				id: "offline",
				label: "Marcar offline",
				destructive: true,
			});
		}

		return actions;
	}

	protected onAction(
		actionId: string,
		item: TechnicianAvailabilityDetail
	): void {
		if (actionId === "view") {
			this.openDetail(item);
			return;
		}

		if (actionId === "edit") {
			this.editClicked.emit(item);
			return;
		}

		if (actionId === "available") {
			this.prepareQuickChange(item, "AVAILABLE");
			return;
		}

		if (actionId === "break") {
			this.prepareQuickChange(item, "ON_BREAK");
			return;
		}

		if (actionId === "busy") {
			this.prepareQuickChange(item, "BUSY");
			return;
		}

		if (actionId === "offline") {
			this.prepareQuickChange(item, "OFFLINE");
		}
	}

	protected prepareQuickChange(
		item: TechnicianAvailabilityDetail,
		nextStatus: TechnicianAvailabilityStatus
	): void {
		const name = this.fullName(item);

		if (nextStatus === "AVAILABLE") {
			this.pendingQuickChange.set({
				item,
				nextStatus,
				title: "Marcar técnico disponible",
				description: `${name} podrá recibir nuevas asignaciones si cumple con servicio y horario.`,
				confirmLabel: "Marcar disponible",
				destructive: false,
			});
			return;
		}

		if (nextStatus === "ON_BREAK") {
			this.pendingQuickChange.set({
				item,
				nextStatus,
				title: "Marcar técnico en descanso",
				description: `${name} no debería recibir nuevas asignaciones mientras esté en descanso.`,
				confirmLabel: "Marcar en descanso",
				destructive: false,
			});
			return;
		}

		if (nextStatus === "BUSY") {
			this.pendingQuickChange.set({
				item,
				nextStatus,
				title: "Marcar técnico ocupado",
				description: `${name} quedará marcado como ocupado manualmente.`,
				confirmLabel: "Marcar ocupado",
				destructive: false,
			});
			return;
		}

		this.pendingQuickChange.set({
			item,
			nextStatus,
			title: "Marcar técnico offline",
			description: `${name} dejará de estar disponible para nuevas asignaciones.`,
			confirmLabel: "Marcar offline",
			destructive: true,
		});
	}

	protected cancelQuickChange(): void {
		if (this.isChangingStatus()) {
			return;
		}

		this.pendingQuickChange.set(null);
	}

	protected confirmQuickChange(): void {
		const pending = this.pendingQuickChange();

		if (!pending || this.isChangingStatus()) {
			return;
		}

		this.isChangingStatus.set(true);

		this.availabilityApi
			.upsertCurrentTenantTechnicianAvailability(
				pending.item.technician.technician.id,
				{
					availability_status: pending.nextStatus,
					available_from: null,
					available_until: null,
				}
			)
			.subscribe({
				next: availability => {
					this.patchAvailability(
						pending.item.technician.technician.id,
						availability
					);

					toast.success("Disponibilidad actualizada", {
						description: `${this.fullName(pending.item)} fue actualizado correctamente.`,
					});

					this.pendingQuickChange.set(null);
					this.isChangingStatus.set(false);
					this.loadStats();
					this.dataChanged.emit();
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.pendingQuickChange.set(null);
					this.isChangingStatus.set(false);

					toast.error("No se pudo actualizar la disponibilidad", {
						description: message,
					});
				},
			});
	}

	patchAvailability(
		technicianId: string,
		availability: TechnicianAvailability
	): void {
		this.items.update(items =>
			items.map(item =>
				item.technician.technician.id === technicianId
					? {
							...item,
							availability,
						}
					: item
			)
		);

		if (this.selectedItem()?.technician.technician.id === technicianId) {
			this.selectedItem.update(current =>
				current
					? {
							...current,
							availability,
						}
					: current
			);
		}
	}

	protected fullName(item: TechnicianAvailabilityDetail): string {
		return getTechnicianFullName(item.technician);
	}

	protected technicianCode(item: TechnicianAvailabilityDetail): string {
		return item.technician.technician.technician_code;
	}

	protected phoneLabel(item: TechnicianAvailabilityDetail): string {
		return item.technician.user.phone || "Sin teléfono";
	}

	protected status(
		item: TechnicianAvailabilityDetail
	): TechnicianAvailabilityStatus {
		return getTechnicianAvailabilityStatus(item);
	}

	protected operationalText(item: TechnicianAvailabilityDetail): string {
		return getTechnicianAvailabilityOperationalText(item);
	}

	protected windowLabel(item: TechnicianAvailabilityDetail): string {
		return getAvailabilityWindowLabel(item);
	}

	protected availableFromLabel(item: TechnicianAvailabilityDetail): string {
		return formatTechnicianAvailabilityDate(
			item.availability?.available_from ?? null
		);
	}

	protected availableUntilLabel(item: TechnicianAvailabilityDetail): string {
		return formatTechnicianAvailabilityDate(
			item.availability?.available_until ?? null
		);
	}

	protected updatedAtLabel(item: TechnicianAvailabilityDetail): string {
		return formatTechnicianAvailabilityDate(
			item.availability?.updated_at ?? null
		);
	}

	protected isAvailableNowLabel(item: TechnicianAvailabilityDetail): string {
		return isTechnicianAvailableNow(item) ? "Sí" : "No";
	}
}
