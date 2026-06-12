import { computed, inject, Injectable, signal } from "@angular/core";
import { catchError, finalize, forkJoin, map, Observable, of, tap } from "rxjs";

import { NotificationApi } from "../api/notification.api";
import {
	createEmptyNotificationSummary,
	Notification,
	NotificationBulkActionData,
	NotificationSummary,
} from "../model";

@Injectable({
	providedIn: "root",
})
export class NotificationStore {
	private readonly notificationApi = inject(NotificationApi);

	private readonly _latest = signal<Notification[]>([]);

	private readonly _summary = signal<NotificationSummary>(
		createEmptyNotificationSummary()
	);

	private readonly _isLoading = signal(false);

	private readonly _loaded = signal(false);

	readonly latest = this._latest.asReadonly();
	readonly summary = this._summary.asReadonly();
	readonly isLoading = this._isLoading.asReadonly();
	readonly loaded = this._loaded.asReadonly();

	readonly unreadCount = computed(() => this._summary().unread);

	readonly hasUnread = computed(() => this.unreadCount() > 0);

	loadSummaryAndLatest(force = false): Observable<NotificationSummary> {
		if (this._loaded() && !force) {
			return of(this._summary());
		}

		this._isLoading.set(true);

		return forkJoin({
			all: this.notificationApi.listMyNotifications({
				page: 1,
				page_size: 8,
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
		}).pipe(
			map(response => {
				const total = response.all.pagination.total;

				const read = response.read.pagination.total;

				const summary: NotificationSummary = {
					total,
					read,
					unread: Math.max(0, total - read),
					pending: response.pending.pagination.total,
					sent: response.sent.pagination.total,
					failed: response.failed.pagination.total,
				};

				this._latest.set(response.all.items);

				this._summary.set(summary);
				this._loaded.set(true);

				return summary;
			}),
			catchError(() => {
				const empty = createEmptyNotificationSummary();

				this._summary.set(empty);
				this._latest.set([]);
				this._loaded.set(false);

				return of(empty);
			}),
			finalize(() => {
				this._isLoading.set(false);
			})
		);
	}

	refresh(): Observable<NotificationSummary> {
		return this.loadSummaryAndLatest(true);
	}

	markAsRead(notificationId: string): Observable<Notification> {
		return this.notificationApi.markMyNotificationAsRead(notificationId).pipe(
			tap(updated => {
				this.patchNotification(updated);

				this._summary.update(current => ({
					...current,
					read: Math.min(current.total, current.read + 1),
					unread: Math.max(0, current.unread - 1),
				}));
			})
		);
	}

	markAllAsRead(): Observable<NotificationBulkActionData> {
		return this.notificationApi.markAllMyNotificationsAsRead().pipe(
			tap(() => {
				const readAt = new Date().toISOString();

				this._latest.update(items =>
					items.map(item => ({
						...item,
						notification_status: "READ",
						read_at: item.read_at ?? readAt,
					}))
				);

				this._summary.update(current => ({
					...current,
					read: current.total,
					unread: 0,
				}));
			})
		);
	}

	setLatest(items: Notification[]): void {
		this._latest.set(items);
	}

	patchNotification(updated: Notification): void {
		this._latest.update(items =>
			items.map(item => (item.id === updated.id ? updated : item))
		);
	}

	invalidate(): void {
		this._loaded.set(false);
	}

	reset(): void {
		this._latest.set([]);
		this._summary.set(createEmptyNotificationSummary());
		this._loaded.set(false);
		this._isLoading.set(false);
	}
}
