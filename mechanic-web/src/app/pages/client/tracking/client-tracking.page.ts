import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from "@angular/core";
import { NgClass } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { firstValueFrom } from "rxjs";
import { toast } from "@spartan-ng/brain/sonner";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideMessageSquare, lucideRadar, lucideSatellite } from "@ng-icons/lucide";

import { ClientApi } from "../../../entities/client/api";
import { ClientAssignmentDetail } from "../../../entities/client/model";
import { getAssignmentIncidentCode, getAssignmentIncidentDescription, getAssignmentIncidentLocation } from "../../../entities/assignment/model";
import {
	buildRealtimeTrackingLogItem,
	formatRealtimeTrackingDate,
	formatRealtimeTrackingHeading,
	formatRealtimeTrackingPoint,
	formatRealtimeTrackingSpeed,
	isRealtimeTrackingAssignmentStatusChangedEvent,
	isRealtimeTrackingLocationEvent,
	RealtimeTrackingLogItem,
	RealtimeTrackingPoint,
	RealtimeTrackingSession,
} from "../../../entities/realtime-tracking/model";
import { RealtimeTrackingWebSocketService } from "../../../entities/realtime-tracking/lib/realtime-tracking-websocket.service";
import { RealtimeGoogleMap } from "../../../entities/realtime-tracking/ui/realtime-google-map/realtime-google-map";
import { AssignmentStatusBadge } from "../../../entities/assignment/ui/assignment-status-badge/assignment-status-badge";
import { getApiErrorMessage } from "../../../shared/api";
import { AdminPageShell, ErrorState, LoadingState, PageHeader, PageSection, StatCard } from "../../../shared/custom-components";
import { HlmButtonImports } from "@shared/ui/button";

@Component({
	selector: "app-client-tracking-page",
	standalone: true,
	imports: [
		NgClass,
		NgIcon,
		HlmButtonImports,
		AdminPageShell,
		PageHeader,
		PageSection,
		LoadingState,
		ErrorState,
		StatCard,
		AssignmentStatusBadge,
		RealtimeGoogleMap,
	],
	providers: [
		provideIcons({
			lucideMessageSquare,
			lucideRadar,
			lucideSatellite,
		}),
	],
	templateUrl: "./client-tracking.page.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientTrackingPage {
	private readonly destroyRef = inject(DestroyRef);
	private readonly clientApi = inject(ClientApi);
	private readonly wsService = inject(RealtimeTrackingWebSocketService);

	protected readonly assignments = signal<ClientAssignmentDetail[]>([]);
	protected readonly selectedAssignment = signal<ClientAssignmentDetail | null>(null);
	protected readonly trackingSession = signal<RealtimeTrackingSession | null>(null);
	protected readonly isLoadingAssignments = signal(false);
	protected readonly isLoadingSession = signal(false);
	protected readonly errorMessage = signal<string | null>(null);
	protected readonly currentTechnicianPoint = signal<RealtimeTrackingPoint | null>(null);
	protected readonly lastHeading = signal<number | string | null>(null);
	protected readonly lastSpeedKmh = signal<number | string | null>(null);
	protected readonly technicianConnected = signal(false);
	protected readonly logs = signal<RealtimeTrackingLogItem[]>([]);

	protected readonly connectionStatus = computed(() => this.wsService.status());
	protected readonly selectedAssignmentCode = computed(() =>
		this.selectedAssignment()
			? getAssignmentIncidentCode(this.selectedAssignment()!)
			: "Sin asignación"
	);
	protected readonly selectedAssignmentDescription = computed(() =>
		this.selectedAssignment()
			? getAssignmentIncidentDescription(this.selectedAssignment()!)
			: "Selecciona una asignación activa para abrir el tracking."
	);
	protected readonly destinationPoint = computed(
		() => this.trackingSession()?.destination ?? null
	);
	protected readonly originPoint = computed(
		() => this.currentTechnicianPoint() ?? this.trackingSession()?.origin ?? null
	);

	constructor() {
		void this.loadAssignments();
		this.listenMessages();
	}

	protected async loadAssignments(): Promise<void> {
		this.isLoadingAssignments.set(true);
		this.errorMessage.set(null);

		try {
			const response = await firstValueFrom(
				this.clientApi.listMyAssignments({ page: 1, page_size: 100 })
			);

			const activeAssignments = response.items.filter(
				item => !["COMPLETED", "CANCELLED"].includes(item.assignment.assignment_status)
			);

			this.assignments.set(activeAssignments);

			if (!this.selectedAssignment() && activeAssignments.length > 0) {
				this.selectAssignment(activeAssignments[0]);
			}
		} catch (error) {
			this.errorMessage.set(getApiErrorMessage(error));
		} finally {
			this.isLoadingAssignments.set(false);
		}
	}

	protected selectAssignment(item: ClientAssignmentDetail): void {
		this.selectedAssignment.set(item);
		this.trackingSession.set(null);
		this.currentTechnicianPoint.set(null);
		this.lastHeading.set(null);
		this.lastSpeedKmh.set(null);
		this.technicianConnected.set(false);
		this.logs.set([]);
		this.wsService.disconnect();
		void this.loadTrackingSession(item.assignment.id);
	}

	protected async loadTrackingSession(assignmentId: string): Promise<void> {
		this.isLoadingSession.set(true);
		this.errorMessage.set(null);

		try {
			const session = await firstValueFrom(
				this.clientApi.getMyAssignmentTrackingSession(assignmentId)
			);

			this.trackingSession.set(session);
			this.currentTechnicianPoint.set(session.origin);
			this.wsService.connect(session.websocket.url);
		} catch (error) {
			this.errorMessage.set(getApiErrorMessage(error));
		} finally {
			this.isLoadingSession.set(false);
		}
	}

	protected reconnect(): void {
		const session = this.trackingSession();

		if (session) {
			this.wsService.connect(session.websocket.url);
		}
	}

	protected disconnect(): void {
		this.wsService.disconnect();
		this.technicianConnected.set(false);
	}

	protected assignmentCode(item: ClientAssignmentDetail): string {
		return getAssignmentIncidentCode(item);
	}

	protected assignmentDescription(item: ClientAssignmentDetail): string {
		return getAssignmentIncidentDescription(item);
	}

	protected assignmentLocation(item: ClientAssignmentDetail): string {
		return getAssignmentIncidentLocation(item);
	}

	protected technicianLabel(item: ClientAssignmentDetail): string {
		return item.technician.technician_code;
	}

	protected formatPoint(point: RealtimeTrackingPoint | null): string {
		return formatRealtimeTrackingPoint(point);
	}

	protected formatPointDate(point: RealtimeTrackingPoint | null): string {
		return formatRealtimeTrackingDate(point?.occurred_at ?? null);
	}

	protected headingLabel(): string {
		return formatRealtimeTrackingHeading(this.lastHeading());
	}

	protected speedLabel(): string {
		return formatRealtimeTrackingSpeed(this.lastSpeedKmh());
	}

	private listenMessages(): void {
		this.wsService.messages$
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(event => {
				this.logs.update(items => [
					buildRealtimeTrackingLogItem(event),
					...items,
				].slice(0, 25));

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
			});
	}
}
