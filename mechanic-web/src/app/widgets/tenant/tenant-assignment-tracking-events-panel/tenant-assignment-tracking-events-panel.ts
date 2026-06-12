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
	lucideMapPin,
	lucideMessageSquare,
	lucideRoute,
	lucideTimer,
} from "@ng-icons/lucide";
import { toast } from "@spartan-ng/brain/sonner";
import { forkJoin } from "rxjs";

import { HlmButtonImports } from "@shared/ui/button";
import { AssignmentTrackingEventApi } from "../../../entities/assignment-tracking-event/api/assignment-tracking-event.api";
import {
	ASSIGNMENT_TRACKING_EVENT_TYPE_OPTIONS,
	AssignmentTrackingEventDetail,
	AssignmentTrackingEventListData,
	AssignmentTrackingEventPagination,
	AssignmentTrackingEventType,
	createEmptyAssignmentTrackingEventPagination,
	formatAssignmentTrackingEventDate,
	formatAssignmentTrackingEventLocation,
	getAssignmentTrackingEventDescription,
	getAssignmentTrackingEventLabel,
	isTrackingEventFinal,
} from "../../../entities/assignment-tracking-event/model";
import { AssignmentTrackingEventTypeBadge } from "../../../entities/assignment-tracking-event/ui/assignment-tracking-event-type-badge/assignment-tracking-event-type-badge";
import { AssignmentApi } from "../../../entities/assignment/api/assignment.api";
import {
	AssignmentDetail,
	AssignmentStatus,
	getAssignmentIncidentCode,
	getAssignmentIncidentDescription,
	getAssignmentIncidentLocation,
	getAssignmentStatusLabel,
} from "../../../entities/assignment/model";
import { AssignmentStatusBadge } from "../../../entities/assignment/ui/assignment-status-badge/assignment-status-badge";
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
	selector: "app-tenant-assignment-tracking-events-panel",
	standalone: true,
	imports: [
		NgIcon,
		HlmButtonImports,
		DataToolbar,
		PageSection,
		LoadingState,
		ErrorState,
		Pagination,
		SideDrawer,
		StatCard,
		AssignmentStatusBadge,
		AssignmentTrackingEventTypeBadge,
	],
	providers: [
		provideIcons({
			lucideCalendar,
			lucideHash,
			lucideInfo,
			lucideMapPin,
			lucideMessageSquare,
			lucideRoute,
			lucideTimer,
		}),
	],
	templateUrl: "./tenant-assignment-tracking-events-panel.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantAssignmentTrackingEventsPanel implements OnInit {
	private readonly assignmentApi = inject(AssignmentApi);
	private readonly trackingEventApi = inject(AssignmentTrackingEventApi);

	readonly createEventClicked = output<AssignmentDetail>();

	protected readonly assignments = signal<AssignmentDetail[]>([]);
	protected readonly selectedAssignment = signal<AssignmentDetail | null>(null);

	protected readonly events = signal<AssignmentTrackingEventDetail[]>([]);
	protected readonly pagination = signal<AssignmentTrackingEventPagination>(
		createEmptyAssignmentTrackingEventPagination()
	);

	protected readonly isLoadingAssignments = signal(false);
	protected readonly isLoadingEvents = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly search = signal("");
	protected readonly assignmentStatus = signal<AssignmentStatus | "">("");
	protected readonly eventType = signal<AssignmentTrackingEventType | "">("");
	protected readonly eventTypeOptions = ASSIGNMENT_TRACKING_EVENT_TYPE_OPTIONS;

	protected readonly selectedEvent =
		signal<AssignmentTrackingEventDetail | null>(null);
	protected readonly isDetailDrawerOpen = signal(false);

	protected readonly stats = signal({
		totalEvents: 0,
		locations: 0,
		notes: 0,
		finalEvents: 0,
	});

	protected readonly filteredAssignments = computed(() => {
		const search = this.search().trim().toLowerCase();

		if (!search) {
			return this.assignments();
		}

		return this.assignments().filter(item => {
			const code = getAssignmentIncidentCode(item).toLowerCase();
			const description = getAssignmentIncidentDescription(item).toLowerCase();
			const location = getAssignmentIncidentLocation(item).toLowerCase();
			const status = getAssignmentStatusLabel(
				item.assignment.assignment_status
			).toLowerCase();

			return (
				code.includes(search) ||
				description.includes(search) ||
				location.includes(search) ||
				status.includes(search)
			);
		});
	});

	ngOnInit(): void {
		this.loadAssignments();
	}

	loadAssignments(): void {
		this.isLoadingAssignments.set(true);
		this.errorMessage.set(null);

		this.assignmentApi
			.listCurrentTenantAssignments({
				page: 1,
				page_size: 100,
				assignment_status: this.assignmentStatus(),
			})
			.subscribe({
				next: response => {
					this.assignments.set(response.items);
					this.isLoadingAssignments.set(false);

					if (!this.selectedAssignment() && response.items.length > 0) {
						this.selectAssignment(response.items[0]);
					}

					if (
						this.selectedAssignment() &&
						!response.items.some(
							item =>
								item.assignment.id === this.selectedAssignment()?.assignment.id
						)
					) {
						this.selectedAssignment.set(null);
						this.events.set([]);
						this.pagination.set(createEmptyAssignmentTrackingEventPagination());
					}
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.isLoadingAssignments.set(false);

					toast.error("No se pudieron cargar las asignaciones", {
						description: message,
					});
				},
			});
	}

	loadEvents(): void {
		const assignment = this.selectedAssignment();

		if (!assignment) {
			this.events.set([]);
			this.pagination.set(createEmptyAssignmentTrackingEventPagination());
			return;
		}

		this.isLoadingEvents.set(true);
		this.errorMessage.set(null);

		this.trackingEventApi
			.listCurrentTenantAssignmentTrackingEvents(assignment.assignment.id, {
				page: this.pagination().page,
				page_size: this.pagination().page_size,
				event_type: this.eventType(),
			})
			.subscribe({
				next: response => {
					this.applyEventResponse(response);
					this.isLoadingEvents.set(false);
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.isLoadingEvents.set(false);

					toast.error("No se pudieron cargar los eventos", {
						description: message,
					});
				},
			});
	}

	loadStats(): void {
		const assignment = this.selectedAssignment();

		if (!assignment) {
			this.stats.set({
				totalEvents: 0,
				locations: 0,
				notes: 0,
				finalEvents: 0,
			});
			return;
		}

		forkJoin({
			all: this.trackingEventApi.listCurrentTenantAssignmentTrackingEvents(
				assignment.assignment.id,
				{
					page: 1,
					page_size: 1,
					event_type: "",
				}
			),
			locations:
				this.trackingEventApi.listCurrentTenantAssignmentTrackingEvents(
					assignment.assignment.id,
					{
						page: 1,
						page_size: 1,
						event_type: "LOCATION_UPDATED",
					}
				),
			notes: this.trackingEventApi.listCurrentTenantAssignmentTrackingEvents(
				assignment.assignment.id,
				{
					page: 1,
					page_size: 1,
					event_type: "NOTE",
				}
			),
			completed:
				this.trackingEventApi.listCurrentTenantAssignmentTrackingEvents(
					assignment.assignment.id,
					{
						page: 1,
						page_size: 1,
						event_type: "SERVICE_COMPLETED",
					}
				),
			cancelled:
				this.trackingEventApi.listCurrentTenantAssignmentTrackingEvents(
					assignment.assignment.id,
					{
						page: 1,
						page_size: 1,
						event_type: "CANCELLED",
					}
				),
		}).subscribe({
			next: response => {
				this.stats.set({
					totalEvents: response.all.pagination.total,
					locations: response.locations.pagination.total,
					notes: response.notes.pagination.total,
					finalEvents:
						response.completed.pagination.total +
						response.cancelled.pagination.total,
				});
			},
			error: () => {
				this.stats.set({
					totalEvents: 0,
					locations: 0,
					notes: 0,
					finalEvents: 0,
				});
			},
		});
	}

	selectAssignment(item: AssignmentDetail): void {
		this.selectedAssignment.set(item);
		this.pagination.set(createEmptyAssignmentTrackingEventPagination());
		this.eventType.set("");
		this.loadEvents();
		this.loadStats();
	}

	patchCreatedEvent(item: AssignmentTrackingEventDetail): void {
		this.events.update(items => [item, ...items]);
		this.pagination.update(current => ({
			...current,
			total: current.total + 1,
		}));

		this.loadAssignments();
		this.loadStats();
	}

	protected onSearch(value: string): void {
		this.search.set(value);
	}

	protected onAssignmentStatusChange(event: Event): void {
		const target = event.target as HTMLSelectElement;

		this.assignmentStatus.set(target.value as AssignmentStatus | "");
		this.loadAssignments();
	}

	protected onEventTypeChange(event: Event): void {
		const target = event.target as HTMLSelectElement;

		this.eventType.set(target.value as AssignmentTrackingEventType | "");
		this.pagination.update(current => ({
			...current,
			page: 1,
		}));

		this.loadEvents();
	}

	protected onPageChange(page: number): void {
		this.pagination.update(current => ({
			...current,
			page,
		}));

		this.loadEvents();
	}

	protected onPageSizeChange(pageSize: number): void {
		this.pagination.update(current => ({
			...current,
			page: 1,
			page_size: pageSize,
		}));

		this.loadEvents();
	}

	protected openEventDetail(item: AssignmentTrackingEventDetail): void {
		this.selectedEvent.set(item);
		this.isDetailDrawerOpen.set(true);
	}

	protected closeEventDetail(): void {
		this.selectedEvent.set(null);
		this.isDetailDrawerOpen.set(false);
	}

	protected selectedAssignmentCode(): string {
		const assignment = this.selectedAssignment();

		return assignment
			? getAssignmentIncidentCode(assignment)
			: "Sin asignación";
	}

	protected selectedAssignmentDescription(): string {
		const assignment = this.selectedAssignment();

		return assignment
			? getAssignmentIncidentDescription(assignment)
			: "Selecciona una asignación para ver sus eventos.";
	}

	protected assignmentCode(item: AssignmentDetail): string {
		return getAssignmentIncidentCode(item);
	}

	protected assignmentDescription(item: AssignmentDetail): string {
		return getAssignmentIncidentDescription(item);
	}

	protected assignmentLocation(item: AssignmentDetail): string {
		return getAssignmentIncidentLocation(item);
	}

	protected eventLabel(item: AssignmentTrackingEventDetail): string {
		return getAssignmentTrackingEventLabel(item.tracking_event.event_type);
	}

	protected eventDescription(item: AssignmentTrackingEventDetail): string {
		return getAssignmentTrackingEventDescription(
			item.tracking_event.event_type
		);
	}

	protected eventLocation(item: AssignmentTrackingEventDetail): string {
		return formatAssignmentTrackingEventLocation(item);
	}

	protected eventDate(item: AssignmentTrackingEventDetail): string {
		return formatAssignmentTrackingEventDate(item.tracking_event.occurred_at);
	}

	protected eventCreatedAt(item: AssignmentTrackingEventDetail): string {
		return formatAssignmentTrackingEventDate(item.tracking_event.created_at);
	}

	protected isFinalEvent(item: AssignmentTrackingEventDetail): boolean {
		return isTrackingEventFinal(item.tracking_event.event_type);
	}

	private applyEventResponse(response: AssignmentTrackingEventListData): void {
		this.events.set(response.items);
		this.pagination.set(response.pagination);
	}
}
