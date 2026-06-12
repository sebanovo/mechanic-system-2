import {
	ChangeDetectionStrategy,
	Component,
	computed,
	DestroyRef,
	inject,
	OnInit,
	signal,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	lucideCalendar,
	lucideCircleDot,
	lucideClock,
	lucideMapPin,
	lucideMessageSquare,
	lucidePhone,
	lucideRadar,
	lucideRoute,
	lucideSatellite,
	lucideUser,
	lucideWifi,
	lucideWifiOff,
} from "@ng-icons/lucide";
import { toast } from "@spartan-ng/brain/sonner";

import { AssignmentApi } from "../../../entities/assignment/api/assignment.api";
import {
	AssignmentDetail,
	AssignmentStatus,
	getAssignmentIncidentCode,
	getAssignmentIncidentDescription,
	getAssignmentIncidentLocation,
} from "../../../entities/assignment/model";
import { AssignmentStatusBadge } from "../../../entities/assignment/ui/assignment-status-badge/assignment-status-badge";
import { RealtimeTrackingApi } from "../../../entities/realtime-tracking/api/realtime-tracking.api";
import { RealtimeTrackingWebSocketService } from "../../../entities/realtime-tracking/lib/realtime-tracking-websocket.service";
import { RealtimeGoogleMap } from "../../../entities/realtime-tracking/ui/realtime-google-map/realtime-google-map";

import { HlmButtonImports } from "@shared/ui/button";
import {
	buildRealtimeTrackingLogItem,
	formatRealtimeTrackingCoordinate,
	formatRealtimeTrackingDate,
	formatRealtimeTrackingHeading,
	formatRealtimeTrackingPoint,
	formatRealtimeTrackingSpeed,
	isRealtimeTrackingAssignmentStatusChangedEvent,
	isRealtimeTrackingLocationEvent,
	RealtimeTrackingIncomingEvent,
	RealtimeTrackingLogItem,
	RealtimeTrackingPoint,
	RealtimeTrackingSession,
} from "../../../entities/realtime-tracking/model";
import { RealtimeConnectionStatusBadge } from "../../../entities/realtime-tracking/ui/realtime-connection-status-badge/realtime-connection-status-badge";
import { getApiErrorMessage } from "../../../shared/api";
import {
	DataToolbar,
	ErrorState,
	LoadingState,
	PageSection,
	StatCard,
} from "../../../shared/custom-components";

@Component({
	selector: "app-tenant-realtime-tracking-panel",
	standalone: true,
	imports: [
		NgIcon,
		HlmButtonImports,
		DataToolbar,
		PageSection,
		LoadingState,
		ErrorState,
		StatCard,
		AssignmentStatusBadge,
		RealtimeConnectionStatusBadge,
		RealtimeGoogleMap,
	],
	providers: [
		provideIcons({
			lucideCalendar,
			lucideCircleDot,
			lucideClock,
			lucideMapPin,
			lucideMessageSquare,
			lucidePhone,
			lucideRadar,
			lucideRoute,
			lucideSatellite,
			lucideUser,
			lucideWifi,
			lucideWifiOff,
		}),
	],
	templateUrl: "./tenant-realtime-tracking-panel.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantRealtimeTrackingPanel implements OnInit {
	private readonly destroyRef = inject(DestroyRef);
	private readonly assignmentApi = inject(AssignmentApi);
	private readonly realtimeTrackingApi = inject(RealtimeTrackingApi);
	protected readonly wsService = inject(RealtimeTrackingWebSocketService);

	protected readonly assignments = signal<AssignmentDetail[]>([]);
	protected readonly selectedAssignment = signal<AssignmentDetail | null>(null);
	protected readonly trackingSession = signal<RealtimeTrackingSession | null>(
		null
	);

	protected readonly isLoadingAssignments = signal(false);
	protected readonly isLoadingSession = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly search = signal("");
	protected readonly assignmentStatus = signal<AssignmentStatus | "">("");

	protected readonly currentTechnicianPoint =
		signal<RealtimeTrackingPoint | null>(null);
	protected readonly lastHeading = signal<number | string | null>(null);
	protected readonly lastSpeedKmh = signal<number | string | null>(null);
	protected readonly technicianConnected = signal(false);
	protected readonly logs = signal<RealtimeTrackingLogItem[]>([]);

	protected readonly filteredAssignments = computed(() => {
		const search = this.search().trim().toLowerCase();

		if (!search) {
			return this.assignments();
		}

		return this.assignments().filter(item => {
			const code = getAssignmentIncidentCode(item).toLowerCase();
			const description = getAssignmentIncidentDescription(item).toLowerCase();
			const location = getAssignmentIncidentLocation(item).toLowerCase();
			const technician = item.technician.technician_code.toLowerCase();

			return (
				code.includes(search) ||
				description.includes(search) ||
				location.includes(search) ||
				technician.includes(search)
			);
		});
	});

	protected readonly selectedAssignmentCode = computed(() => {
		const assignment = this.selectedAssignment();

		return assignment
			? getAssignmentIncidentCode(assignment)
			: "Sin asignación";
	});

	protected readonly selectedAssignmentDescription = computed(() => {
		const assignment = this.selectedAssignment();

		return assignment
			? getAssignmentIncidentDescription(assignment)
			: "Selecciona una asignación activa para abrir la sesión.";
	});

	protected readonly destinationPoint = computed(
		() => this.trackingSession()?.destination ?? null
	);

	protected readonly originPoint = computed(
		() =>
			this.currentTechnicianPoint() ?? this.trackingSession()?.origin ?? null
	);

	protected readonly connectionStatus = computed(() => this.wsService.status());

	ngOnInit(): void {
		this.loadAssignments();
		this.listenWebSocketMessages();
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
					const activeItems = response.items.filter(item =>
						this.isTrackableAssignment(item)
					);

					this.assignments.set(activeItems);
					this.isLoadingAssignments.set(false);

					if (!this.selectedAssignment() && activeItems.length > 0) {
						this.selectAssignment(activeItems[0]);
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

	selectAssignment(item: AssignmentDetail): void {
		this.selectedAssignment.set(item);
		this.trackingSession.set(null);
		this.currentTechnicianPoint.set(null);
		this.lastHeading.set(null);
		this.lastSpeedKmh.set(null);
		this.technicianConnected.set(false);
		this.logs.set([]);

		this.wsService.disconnect();
		this.loadTrackingSession(item.assignment.id);
	}

	protected loadTrackingSession(assignmentId: string): void {
		this.isLoadingSession.set(true);
		this.errorMessage.set(null);

		this.realtimeTrackingApi
			.getCurrentTenantTrackingSession(assignmentId)
			.subscribe({
				next: session => {
					this.trackingSession.set(session);
					this.currentTechnicianPoint.set(session.origin);
					this.isLoadingSession.set(false);

					this.addSystemLog(
						"Sesión cargada",
						`Tracking session lista para ${session.assignment_id}.`
					);

					this.connectWebSocket(session);
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.isLoadingSession.set(false);

					toast.error("No se pudo cargar la sesión de tracking", {
						description: message,
					});
				},
			});
	}

	protected reconnect(): void {
		const session = this.trackingSession();

		if (!session) {
			return;
		}

		this.connectWebSocket(session);
	}

	protected disconnect(): void {
		this.wsService.disconnect();
		this.technicianConnected.set(false);
		this.addSystemLog(
			"Desconectado",
			"Conexión WebSocket cerrada manualmente."
		);
	}

	protected onSearch(value: string): void {
		this.search.set(value);
	}

	protected onAssignmentStatusChange(event: Event): void {
		const target = event.target as HTMLSelectElement;

		this.assignmentStatus.set(target.value as AssignmentStatus | "");
		this.selectedAssignment.set(null);
		this.trackingSession.set(null);
		this.currentTechnicianPoint.set(null);
		this.wsService.disconnect();

		this.loadAssignments();
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

	protected technicianLabel(item: AssignmentDetail): string {
		return item.technician.technician_code;
	}

	protected formatPoint(point: RealtimeTrackingPoint | null): string {
		return formatRealtimeTrackingPoint(point);
	}

	protected formatPointDate(point: RealtimeTrackingPoint | null): string {
		return formatRealtimeTrackingDate(point?.occurred_at ?? null);
	}

	protected formatCoordinate(
		value: number | string | null | undefined
	): string {
		return formatRealtimeTrackingCoordinate(value);
	}

	protected headingLabel(): string {
		return formatRealtimeTrackingHeading(this.lastHeading());
	}

	protected speedLabel(): string {
		return formatRealtimeTrackingSpeed(this.lastSpeedKmh());
	}

	protected isTrackableAssignment(item: AssignmentDetail): boolean {
		return !["COMPLETED", "CANCELLED"].includes(
			item.assignment.assignment_status
		);
	}

	private connectWebSocket(session: RealtimeTrackingSession): void {
		this.wsService.connect(session.websocket.url);

		this.addSystemLog(
			"Conectando WebSocket",
			`Abriendo ${session.websocket.url}.`
		);
	}

	private listenWebSocketMessages(): void {
		this.wsService.messages$
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(event => this.handleRealtimeEvent(event));
	}

	private handleRealtimeEvent(event: RealtimeTrackingIncomingEvent): void {
		this.logs.update(items =>
			[buildRealtimeTrackingLogItem(event), ...items].slice(0, 25)
		);

		if (isRealtimeTrackingLocationEvent(event)) {
			this.currentTechnicianPoint.set({
				type: "TECHNICIAN_CURRENT_LOCATION",
				latitude: event.latitude,
				longitude: event.longitude,
				address_text: null,
				occurred_at: event.occurred_at,
			});
			this.lastHeading.set(event.heading ?? null);
			this.lastSpeedKmh.set(event.speed_kmh ?? null);
			return;
		}

		if (isRealtimeTrackingAssignmentStatusChangedEvent(event)) {
			this.trackingSession.update(current =>
				current
					? {
							...current,
							assignment_status: event.assignment_status,
							incident_status: event.incident_status,
						}
					: current
			);

			this.selectedAssignment.update(current =>
				current
					? {
							...current,
							assignment: {
								...current.assignment,
								assignment_status: event.assignment_status,
							},
							incident: {
								...current.incident,
								status: event.incident_status,
							},
						}
					: current
			);

			return;
		}

		if (event.type === "TECHNICIAN_CONNECTED") {
			this.technicianConnected.set(true);
			return;
		}

		if (event.type === "TECHNICIAN_DISCONNECTED") {
			this.technicianConnected.set(false);
			return;
		}

		if (event.type === "ERROR") {
			this.errorMessage.set(event.message);
			toast.error("Error en tracking", {
				description: event.message,
			});
		}
	}

	private addSystemLog(title: string, description: string): void {
		const logItem: RealtimeTrackingLogItem = {
			id: `SYSTEM-${Date.now()}-${Math.random()}`,
			type: "SYSTEM",
			title,
			description,
			occurred_at: new Date().toISOString(),
		};

		this.logs.update(items => [logItem, ...items].slice(0, 25));
	}
}
