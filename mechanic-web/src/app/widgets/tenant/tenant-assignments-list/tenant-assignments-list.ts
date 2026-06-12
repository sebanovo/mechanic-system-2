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
	lucideMapPin,
	lucideMessageSquare,
	lucideRoute,
	lucideUser,
	lucideWrench,
} from "@ng-icons/lucide";
import { toast } from "@spartan-ng/brain/sonner";
import { forkJoin } from "rxjs";

import { HlmButtonImports } from "@shared/ui/button";
import { AssignmentApi } from "../../../entities/assignment/api/assignment.api";
import {
	ASSIGNMENT_STATUS_OPTIONS,
	AssignmentDetail,
	AssignmentPagination,
	AssignmentStatus,
	canCancelAssignment,
	createEmptyAssignmentPagination,
	formatAssignmentDate,
	formatAssignmentResponseTime,
	getAssignmentIncidentCode,
	getAssignmentIncidentDescription,
	getAssignmentIncidentLocation,
	getAssignmentOperationalText,
	getAssignmentStatusLabel,
	getAssignmentTechnicianLabel,
	getAssignmentTechnicianStatusLabel,
	getAssignmentTimelineLabel,
} from "../../../entities/assignment/model";
import { AssignmentStatusBadge } from "../../../entities/assignment/ui/assignment-status-badge/assignment-status-badge";
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

type PendingAssignmentCancellation = {
	item: AssignmentDetail;
	title: string;
	description: string;
	confirmLabel: string;
};

@Component({
	selector: "app-tenant-assignments-list",
	standalone: true,
	imports: [
		NgIcon,
		HlmButtonImports,
		DataToolbar,
		PageSection,
		LoadingState,
		ErrorState,
		Pagination,
		ResourceActionsMenu,
		SideDrawer,
		StatCard,
		ConfirmActionDialog,
		AssignmentStatusBadge,
	],
	providers: [
		provideIcons({
			lucideCalendar,
			lucideClock,
			lucideHash,
			lucideInfo,
			lucideMapPin,
			lucideMessageSquare,
			lucideRoute,
			lucideUser,
			lucideWrench,
		}),
	],
	templateUrl: "./tenant-assignments-list.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantAssignmentsList implements OnInit {
	private readonly assignmentApi = inject(AssignmentApi);

	readonly editClicked = output<AssignmentDetail>();

	protected readonly items = signal<AssignmentDetail[]>([]);
	protected readonly pagination = signal<AssignmentPagination>(
		createEmptyAssignmentPagination()
	);

	protected readonly isLoading = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly search = signal("");
	protected readonly status = signal<AssignmentStatus | "">("");
	protected readonly statusOptions = ASSIGNMENT_STATUS_OPTIONS;

	protected readonly selectedItem = signal<AssignmentDetail | null>(null);
	protected readonly isDetailDrawerOpen = signal(false);
	protected readonly isDetailLoading = signal(false);
	protected readonly detailErrorMessage = signal<string | null>(null);

	protected readonly pendingCancellation =
		signal<PendingAssignmentCancellation | null>(null);
	protected readonly isCancelling = signal(false);

	protected readonly stats = signal({
		total: 0,
		active: 0,
		assigned: 0,
		enRoute: 0,
		inService: 0,
		completed: 0,
		cancelled: 0,
	});

	protected readonly canCancelAssignment = canCancelAssignment;

	protected readonly filteredItems = computed(() => {
		const search = this.search().trim().toLowerCase();

		if (!search) {
			return this.items();
		}

		return this.items().filter(item => {
			const incidentCode = getAssignmentIncidentCode(item).toLowerCase();
			const description = getAssignmentIncidentDescription(item).toLowerCase();
			const location = getAssignmentIncidentLocation(item).toLowerCase();
			const technician = getAssignmentTechnicianLabel(item).toLowerCase();
			const status = getAssignmentStatusLabel(
				item.assignment.assignment_status
			).toLowerCase();

			return (
				incidentCode.includes(search) ||
				description.includes(search) ||
				location.includes(search) ||
				technician.includes(search) ||
				status.includes(search)
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

		this.assignmentApi
			.listCurrentTenantAssignments({
				page: this.pagination().page,
				page_size: this.pagination().page_size,
				assignment_status: this.status(),
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

					toast.error("No se pudieron cargar las asignaciones", {
						description: message,
					});
				},
			});
	}

	loadStats(): void {
		forkJoin({
			all: this.assignmentApi.listCurrentTenantAssignments({
				page: 1,
				page_size: 1,
				assignment_status: "",
			}),
			assigned: this.assignmentApi.listCurrentTenantAssignments({
				page: 1,
				page_size: 1,
				assignment_status: "ASSIGNED",
			}),
			enRoute: this.assignmentApi.listCurrentTenantAssignments({
				page: 1,
				page_size: 1,
				assignment_status: "EN_ROUTE",
			}),
			inService: this.assignmentApi.listCurrentTenantAssignments({
				page: 1,
				page_size: 1,
				assignment_status: "IN_SERVICE",
			}),
			completed: this.assignmentApi.listCurrentTenantAssignments({
				page: 1,
				page_size: 1,
				assignment_status: "COMPLETED",
			}),
			cancelled: this.assignmentApi.listCurrentTenantAssignments({
				page: 1,
				page_size: 1,
				assignment_status: "CANCELLED",
			}),
		}).subscribe({
			next: response => {
				const assigned = response.assigned.pagination.total;
				const enRoute = response.enRoute.pagination.total;
				const inService = response.inService.pagination.total;

				this.stats.set({
					total: response.all.pagination.total,
					active: assigned + enRoute + inService,
					assigned,
					enRoute,
					inService,
					completed: response.completed.pagination.total,
					cancelled: response.cancelled.pagination.total,
				});
			},
			error: () => {
				this.stats.set({
					total: 0,
					active: 0,
					assigned: 0,
					enRoute: 0,
					inService: 0,
					completed: 0,
					cancelled: 0,
				});
			},
		});
	}

	protected onSearch(value: string): void {
		this.search.set(value);
	}

	protected onStatusFilterChange(event: Event): void {
		const target = event.target as HTMLSelectElement;

		this.status.set(target.value as AssignmentStatus | "");
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

	protected openDetail(item: AssignmentDetail): void {
		this.isDetailDrawerOpen.set(true);
		this.isDetailLoading.set(true);
		this.detailErrorMessage.set(null);
		this.selectedItem.set(item);

		this.assignmentApi
			.getCurrentTenantAssignmentById(item.assignment.id)
			.subscribe({
				next: detail => {
					this.selectedItem.set(detail);
					this.isDetailLoading.set(false);
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.detailErrorMessage.set(message);
					this.isDetailLoading.set(false);

					toast.error("No se pudo cargar el detalle de la asignación", {
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

	protected actionsFor(item: AssignmentDetail): ResourceActionItem[] {
		const actions: ResourceActionItem[] = [
			{
				id: "view",
				label: "Ver detalle",
			},
		];

		if (canCancelAssignment(item)) {
			actions.push(
				{
					id: "edit",
					label: "Editar técnico/notas",
				},
				{
					id: "cancel",
					label: "Cancelar",
					destructive: true,
				}
			);
		}

		return actions;
	}

	protected onAction(actionId: string, item: AssignmentDetail): void {
		if (actionId === "view") {
			this.openDetail(item);
			return;
		}

		if (actionId === "edit") {
			this.editClicked.emit(item);
			return;
		}

		if (actionId === "cancel") {
			this.prepareCancellation(item);
		}
	}

	protected prepareCancellation(item: AssignmentDetail): void {
		this.pendingCancellation.set({
			item,
			title: "Cancelar asignación",
			description: `La asignación del incidente ${getAssignmentIncidentCode(item)} será cancelada. Esta acción impacta el flujo operativo del incidente.`,
			confirmLabel: "Cancelar asignación",
		});
	}

	protected cancelCancellation(): void {
		if (this.isCancelling()) {
			return;
		}

		this.pendingCancellation.set(null);
	}

	protected confirmCancellation(): void {
		const pending = this.pendingCancellation();

		if (!pending || this.isCancelling()) {
			return;
		}

		this.isCancelling.set(true);

		this.assignmentApi
			.changeCurrentTenantAssignmentStatus(pending.item.assignment.id, {
				assignment_status: "CANCELLED",
			})
			.subscribe({
				next: updated => {
					this.patchItem(updated);

					toast.success("Asignación cancelada", {
						description: `La asignación del incidente ${getAssignmentIncidentCode(updated)} fue cancelada.`,
					});

					this.pendingCancellation.set(null);
					this.isCancelling.set(false);
					this.loadStats();
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.pendingCancellation.set(null);
					this.isCancelling.set(false);

					toast.error("No se pudo cancelar la asignación", {
						description: message,
					});
				},
			});
	}

	patchItem(updated: AssignmentDetail): void {
		this.items.update(items =>
			items.map(item =>
				item.assignment.id === updated.assignment.id ? updated : item
			)
		);

		if (this.selectedItem()?.assignment.id === updated.assignment.id) {
			this.selectedItem.set(updated);
		}
	}

	protected statusValue(item: AssignmentDetail): AssignmentStatus {
		return item.assignment.assignment_status;
	}

	protected incidentCode(item: AssignmentDetail): string {
		return getAssignmentIncidentCode(item);
	}

	protected description(item: AssignmentDetail): string {
		return getAssignmentIncidentDescription(item);
	}

	protected location(item: AssignmentDetail): string {
		return getAssignmentIncidentLocation(item);
	}

	protected technicianLabel(item: AssignmentDetail): string {
		return getAssignmentTechnicianLabel(item);
	}

	protected technicianStatusLabel(item: AssignmentDetail): string {
		return getAssignmentTechnicianStatusLabel(item);
	}

	protected operationalText(item: AssignmentDetail): string {
		return getAssignmentOperationalText(item);
	}

	protected timelineLabel(item: AssignmentDetail): string {
		return getAssignmentTimelineLabel(item);
	}

	protected responseTimeLabel(item: AssignmentDetail): string {
		return formatAssignmentResponseTime(item);
	}

	protected assignedAtLabel(item: AssignmentDetail): string {
		return formatAssignmentDate(item.assignment.assigned_at);
	}

	protected enRouteAtLabel(item: AssignmentDetail): string {
		return formatAssignmentDate(item.assignment.en_route_at);
	}

	protected arrivedAtLabel(item: AssignmentDetail): string {
		return formatAssignmentDate(item.assignment.arrived_at);
	}

	protected startedAtLabel(item: AssignmentDetail): string {
		return formatAssignmentDate(item.assignment.started_at);
	}

	protected completedAtLabel(item: AssignmentDetail): string {
		return formatAssignmentDate(item.assignment.completed_at);
	}

	protected cancelledAtLabel(item: AssignmentDetail): string {
		return formatAssignmentDate(item.assignment.cancelled_at);
	}
}
