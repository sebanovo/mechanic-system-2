import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	OnInit,
	signal,
} from "@angular/core";
import { Router } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	lucideBell,
	lucideBellRing,
	lucideCalendar,
	lucideCheck,
	lucideCheckCheck,
	lucideCircleAlert,
	lucideCode2,
	lucideExternalLink,
	lucideInbox,
	lucideInfo,
	lucideLoaderCircle,
	lucideMail,
	lucideMailOpen,
	lucideNavigation,
	lucideRefreshCw,
	lucideTag,
	lucideUserRound,
	lucideX,
} from "@ng-icons/lucide";
import { toast } from "@spartan-ng/brain/sonner";
import { catchError, finalize, forkJoin, map, of } from "rxjs";

import { HlmButtonImports } from "@shared/ui/button";
import {
	getNotificationActions,
	ResolvedNotificationAction,
} from "../../../entities/notification/model";
import { NotificationActionService } from "../../../features/notifications/notification-actions/notification-action.service";

import { IncidentOfferApi } from "../../../entities/incident-offer/api/incident-offer.api";
import { IncidentOfferStatus } from "../../../entities/incident-offer/model";
import { AssignmentApi } from "../../../entities/assignment/api/assignment.api";
import { AssignmentStatus } from "../../../entities/assignment/model";
import { NotificationApi } from "../../../entities/notification/api/notification.api";
import {
	createEmptyNotificationPagination,
	createEmptyNotificationSummary,
	formatNotificationData,
	formatNotificationDate,
	formatNotificationRelativeDate,
	formatNotificationType,
	getNotificationAudience,
	getNotificationResourceReference,
	isNotificationRead,
	isNotificationUnread,
	matchesNotificationSearch,
	Notification,
	NOTIFICATION_STATUS_OPTIONS,
	notificationHasData,
	NotificationPagination,
	NotificationStatus,
	NotificationSummary,
	resolveNotificationFrontendRoute,
} from "../../../entities/notification/model";
import { NotificationStore } from "../../../entities/notification/store/notification.store";
import { NotificationStatusBadge } from "../../../entities/notification/ui/notification-status-badge/notification-status-badge";
import { getApiErrorMessage } from "../../../shared/api";
import {
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

@Component({
	selector: "app-notification-inbox",
	standalone: true,
	imports: [
		NgIcon,
		HlmButtonImports,
		DataToolbar,
		ErrorState,
		LoadingState,
		PageSection,
		Pagination,
		ResourceActionsMenu,
		SideDrawer,
		StatCard,
		NotificationStatusBadge,
	],
	providers: [
		provideIcons({
			lucideBell,
			lucideBellRing,
			lucideCalendar,
			lucideCheck,
			lucideCheckCheck,
			lucideCircleAlert,
			lucideCode2,
			lucideExternalLink,
			lucideInbox,
			lucideInfo,
			lucideMail,
			lucideMailOpen,
			lucideRefreshCw,
			lucideTag,
			lucideUserRound,
			lucideLoaderCircle,
			lucideNavigation,
			lucideX,
		}),
	],
	templateUrl: "./notification-inbox.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationInbox implements OnInit {
	private readonly router = inject(Router);
	private readonly assignmentApi = inject(AssignmentApi);
	private readonly notificationApi = inject(NotificationApi);
	private readonly incidentOfferApi = inject(IncidentOfferApi);

	protected readonly notificationStore = inject(NotificationStore);

	protected readonly items = signal<Notification[]>([]);

	protected readonly pagination = signal<NotificationPagination>(
		createEmptyNotificationPagination()
	);

	protected readonly summary = signal<NotificationSummary>(
		createEmptyNotificationSummary()
	);

	protected readonly search = signal("");

	protected readonly status = signal<NotificationStatus | "">("");

	protected readonly statusOptions = NOTIFICATION_STATUS_OPTIONS;

	protected readonly isLoading = signal(false);

	protected readonly isMarkingAll = signal(false);

	protected readonly markingNotificationId = signal<string | null>(null);

	protected readonly errorMessage = signal<string | null>(null);

	protected readonly selectedNotification = signal<Notification | null>(null);

	protected readonly isDetailOpen = signal(false);
	protected readonly offerStatusesById = signal<
		Record<string, IncidentOfferStatus>
	>({});

	protected readonly assignmentStatusesById = signal<
		Record<string, AssignmentStatus>
	>({});

	protected readonly filteredItems = computed(() =>
		this.items().filter(item => matchesNotificationSearch(item, this.search()))
	);

	ngOnInit(): void {
		this.load();
		this.loadSummary();
	}

	load(): void {
		this.isLoading.set(true);
		this.errorMessage.set(null);

		this.notificationApi
			.listMyNotifications({
				page: this.pagination().page,
				page_size: this.pagination().page_size,
				status: this.status(),
			})
			.pipe(
				finalize(() => {
					this.isLoading.set(false);
				})
			)
			.subscribe({
				next: response => {
					this.items.set(response.items);
					this.pagination.set(response.pagination);
					this.offerStatusesById.set({});
					this.assignmentStatusesById.set({});
					this.syncOfferStatuses(response.items);
					this.syncAssignmentStatuses(response.items);

					this.notificationStore.setLatest(response.items.slice(0, 8));
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);

					toast.error("No se pudieron cargar las notificaciones", {
						description: message,
					});
				},
			});
	}

	loadSummary(): void {
		forkJoin({
			all: this.notificationApi.listMyNotifications({
				page: 1,
				page_size: 1,
			}),
			read: this.notificationApi.listMyNotifications({
				page: 1,
				page_size: 1,
				status: "READ",
			}),
			pending: this.notificationApi.listMyNotifications({
				page: 1,
				page_size: 1,
				status: "PENDING",
			}),
			sent: this.notificationApi.listMyNotifications({
				page: 1,
				page_size: 1,
				status: "SENT",
			}),
			failed: this.notificationApi.listMyNotifications({
				page: 1,
				page_size: 1,
				status: "FAILED",
			}),
		}).subscribe({
			next: response => {
				const total = response.all.pagination.total;

				const read = response.read.pagination.total;

				this.summary.set({
					total,
					read,
					unread: Math.max(0, total - read),
					pending: response.pending.pagination.total,
					sent: response.sent.pagination.total,
					failed: response.failed.pagination.total,
				});

				this.notificationStore.refresh().subscribe();
			},
			error: () => {
				this.summary.set(createEmptyNotificationSummary());
			},
		});
	}

	protected onSearch(value: string): void {
		this.search.set(value);
	}

	protected onStatusChange(event: Event): void {
		const target = event.target as HTMLSelectElement;

		this.status.set(target.value as NotificationStatus | "");

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

	protected actionsFor(item: Notification): ResourceActionItem[] {
		const actions: ResourceActionItem[] = [
			{
				id: "view",
				label: "Ver detalle",
			},
		];

		if (isNotificationUnread(item)) {
			actions.push({
				id: "read",
				label: "Marcar como leída",
			});
		}

		if (resolveNotificationFrontendRoute(item)) {
			actions.push({
				id: "open-resource",
				label: "Abrir recurso",
			});
		}

		return actions;
	}

	protected onAction(actionId: string, item: Notification): void {
		if (actionId === "view") {
			this.openDetail(item);
			return;
		}

		if (actionId === "read") {
			this.markAsRead(item);
			return;
		}

		if (actionId === "open-resource") {
			this.openRelatedResource(item);
		}
	}

	protected openDetail(item: Notification): void {
		this.selectedNotification.set(item);
		this.isDetailOpen.set(true);

		if (isNotificationUnread(item)) {
			this.markAsRead(item, false);
		}
	}

	protected closeDetail(): void {
		this.isDetailOpen.set(false);
		this.selectedNotification.set(null);
	}

	protected markAsRead(item: Notification, showSuccessToast = true): void {
		if (isNotificationRead(item) || this.markingNotificationId()) {
			return;
		}

		this.markingNotificationId.set(item.id);

		this.notificationStore
			.markAsRead(item.id)
			.pipe(
				finalize(() => {
					this.markingNotificationId.set(null);
				})
			)
			.subscribe({
				next: updated => {
					this.patchNotification(updated);

					if (showSuccessToast) {
						toast.success("Notificación marcada como leída");
					}
				},
				error: error => {
					const message = getApiErrorMessage(error);

					toast.error("No se pudo actualizar la notificación", {
						description: message,
					});
				},
			});
	}

	protected markAllAsRead(): void {
		if (this.isMarkingAll() || this.summary().unread === 0) {
			return;
		}

		this.isMarkingAll.set(true);

		this.notificationStore
			.markAllAsRead()
			.pipe(
				finalize(() => {
					this.isMarkingAll.set(false);
				})
			)
			.subscribe({
				next: response => {
					const readAt = new Date().toISOString();

					this.items.update(items =>
						items.map(item => ({
							...item,
							notification_status: "READ",
							read_at: item.read_at ?? readAt,
						}))
					);

					this.selectedNotification.update(current =>
						current
							? {
									...current,
									notification_status: "READ",
									read_at: current.read_at ?? readAt,
								}
							: null
					);

					this.summary.update(current => ({
						...current,
						read: current.total,
						unread: 0,
					}));

					toast.success("Notificaciones actualizadas", {
						description: `${response.updated_count} notificaciones fueron marcadas como leídas.`,
					});
				},
				error: error => {
					const message = getApiErrorMessage(error);

					toast.error("No se pudieron marcar todas como leídas", {
						description: message,
					});
				},
			});
	}

	protected openRelatedResource(item: Notification): void {
		const route = resolveNotificationFrontendRoute(item);

		if (!route) {
			toast.info("La notificación no tiene una ruta disponible.");
			return;
		}

		if (isNotificationUnread(item)) {
			this.markAsRead(item, false);
		}

		void this.router.navigateByUrl(route);
	}

	protected relativeDate(item: Notification): string {
		return formatNotificationRelativeDate(item.created_at);
	}

	protected fullDate(value: string | null | undefined): string {
		return formatNotificationDate(value);
	}

	protected typeLabel(item: Notification): string {
		return formatNotificationType(item.notification_type);
	}

	protected audienceLabel(item: Notification): string {
		return getNotificationAudience(item);
	}

	protected resourceReference(item: Notification): string {
		return getNotificationResourceReference(item);
	}

	protected dataLabel(item: Notification): string {
		return formatNotificationData(item);
	}

	protected hasData(item: Notification): boolean {
		return notificationHasData(item);
	}

	protected isRead(item: Notification): boolean {
		return isNotificationRead(item);
	}

	protected isUnread(item: Notification): boolean {
		return isNotificationUnread(item);
	}

	protected canOpenResource(item: Notification): boolean {
		return Boolean(resolveNotificationFrontendRoute(item));
	}

	private patchNotification(updated: Notification): void {
		const previous = this.items().find(item => item.id === updated.id);

		this.items.update(items =>
			items.map(item => (item.id === updated.id ? updated : item))
		);

		this.selectedNotification.update(current =>
			current?.id === updated.id ? updated : current
		);

		if (
			previous &&
			isNotificationUnread(previous) &&
			isNotificationRead(updated)
		) {
			this.summary.update(current => ({
				...current,
				read: Math.min(current.total, current.read + 1),
				unread: Math.max(0, current.unread - 1),
			}));
		}
	}

	private readonly notificationActionService = inject(
		NotificationActionService
	);

	protected actionsForNotification(
		item: Notification
	): ResolvedNotificationAction[] {
		const actions = getNotificationActions(item);
		const offerId = item.data?.offer_id;
		const offerStatus = this.getOfferStatus(item);
		const assignmentId = item.data?.assignment_id;
		const assignmentStatus = this.getAssignmentStatus(item);

		if (!offerId) {
			return this.filterAssignmentActions(actions, assignmentId, assignmentStatus);
		}

		if (offerStatus === "PENDING") {
			return this.filterAssignmentActions(actions, assignmentId, assignmentStatus);
		}

		return this.filterAssignmentActions(
			actions.filter(action => !this.isOfferResponseAction(action.key)),
			assignmentId,
			assignmentStatus
		);
	}

	protected async executeNotificationAction(
		item: Notification,
		action: ResolvedNotificationAction
	): Promise<void> {
		const completed = await this.notificationActionService.handle(action, item);

		if (completed) {
			this.patchReadState(item.id);
		}
	}

	protected actionIsExecuting(action: ResolvedNotificationAction): boolean {
		return this.notificationActionService.executingActionKey() === action.key;
	}

	private patchReadState(notificationId: string): void {
		const readAt = new Date().toISOString();

		this.items.update(items =>
			items.map(item =>
				item.id === notificationId
					? {
							...item,
							notification_status: "READ",
							read_at: item.read_at ?? readAt,
						}
					: item
			)
		);

		this.selectedNotification.update(current =>
			current?.id === notificationId
				? {
						...current,
						notification_status: "READ",
						read_at: current.read_at ?? readAt,
					}
				: current
		);
	}

	private syncOfferStatuses(items: Notification[]): void {
		const offerIds = [
			...new Set(
				items
					.map(item => item.data?.offer_id)
					.filter((offerId): offerId is string => Boolean(offerId))
			),
		];

		if (offerIds.length === 0) {
			return;
		}

		forkJoin(
			offerIds.map(offerId =>
				this.incidentOfferApi.getCurrentTenantOfferById(offerId).pipe(
					map(offer => ({
						offerId,
						status: offer.offer.offer_status,
					})),
					catchError(() => of(null))
				)
			)
		).subscribe({
			next: responses => {
				const nextStatuses = { ...this.offerStatusesById() };

				for (const response of responses) {
					if (!response) {
						continue;
					}

					nextStatuses[response.offerId] = response.status;
				}

				this.offerStatusesById.set(nextStatuses);
			},
		});
	}

	private syncAssignmentStatuses(items: Notification[]): void {
		const assignmentIds = [
			...new Set(
				items
					.map(item => item.data?.assignment_id)
					.filter((assignmentId): assignmentId is string =>
						Boolean(assignmentId)
					)
			),
		];

		if (assignmentIds.length === 0) {
			return;
		}

		forkJoin(
			assignmentIds.map(assignmentId =>
				this.assignmentApi.getCurrentTenantAssignmentById(assignmentId).pipe(
					map(assignment => ({
						assignmentId,
						status: assignment.assignment.assignment_status,
					})),
					catchError(() => of(null))
				)
			)
		).subscribe({
			next: responses => {
				const nextStatuses = { ...this.assignmentStatusesById() };

				for (const response of responses) {
					if (!response) {
						continue;
					}

					nextStatuses[response.assignmentId] = response.status;
				}

				this.assignmentStatusesById.set(nextStatuses);
			},
		});
	}

	private getOfferStatus(item: Notification): IncidentOfferStatus | null {
		const explicitStatus = item.data?.offer_status;

		if (
			explicitStatus === "PENDING" ||
			explicitStatus === "ACCEPTED" ||
			explicitStatus === "REJECTED" ||
			explicitStatus === "EXPIRED" ||
			explicitStatus === "CANCELLED"
		) {
			return explicitStatus;
		}

		const offerId = item.data?.offer_id;

		if (!offerId) {
			return null;
		}

		return this.offerStatusesById()[offerId] ?? null;
	}

	private getAssignmentStatus(item: Notification): AssignmentStatus | null {
		const explicitStatus = item.data?.assignment_status;

		if (
			explicitStatus === "PENDING" ||
			explicitStatus === "ASSIGNED" ||
			explicitStatus === "EN_ROUTE" ||
			explicitStatus === "ARRIVED" ||
			explicitStatus === "IN_SERVICE" ||
			explicitStatus === "COMPLETED" ||
			explicitStatus === "CANCELLED"
		) {
			return explicitStatus;
		}

		const assignmentId = item.data?.assignment_id;

		if (!assignmentId) {
			return null;
		}

		return this.assignmentStatusesById()[assignmentId] ?? null;
	}

	private filterAssignmentActions(
		actions: ResolvedNotificationAction[],
		assignmentId: string | undefined,
		assignmentStatus: AssignmentStatus | null
	): ResolvedNotificationAction[] {
		if (!assignmentId) {
			return actions;
		}

		if (assignmentStatus === "ASSIGNED") {
			return actions;
		}

		return actions.filter(action => !this.isAssignmentStartRouteAction(action.key));
	}

	private isOfferResponseAction(
		actionKey: string
	): boolean {
		return actionKey === "accept" || actionKey === "reject";
	}

	private isAssignmentStartRouteAction(actionKey: string): boolean {
		return actionKey === "start_route";
	}
}
