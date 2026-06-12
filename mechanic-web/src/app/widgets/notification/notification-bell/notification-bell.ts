import {
	ChangeDetectionStrategy,
	Component,
	inject,
	OnInit,
	signal,
} from "@angular/core";
import { Router } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	lucideBell,
	lucideBellOff,
	lucideBellRing,
	lucideCheckCheck,
	lucideExternalLink,
	lucideLoaderCircle,
	lucideSettings,
} from "@ng-icons/lucide";
import { finalize } from "rxjs";

import { HlmButtonImports } from "@shared/ui/button";
import { getPrimaryNotificationAction } from "../../../entities/notification/model";
import { NotificationActionService } from "../../../features/notifications/notification-actions/notification-action.service";

import {
	formatNotificationRelativeDate,
	Notification,
} from "../../../entities/notification/model";
import { NotificationStore } from "../../../entities/notification/store/notification.store";
import { NotificationPushService } from "../../../features/notifications/notification-push/notification-push.service";

@Component({
	selector: "app-notification-bell",
	standalone: true,
	imports: [NgIcon, HlmButtonImports],
	providers: [
		provideIcons({
			lucideBell,
			lucideBellOff,
			lucideBellRing,
			lucideCheckCheck,
			lucideExternalLink,
			lucideLoaderCircle,
			lucideSettings,
		}),
	],
	templateUrl: "./notification-bell.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationBell implements OnInit {
	private readonly router = inject(Router);

	private readonly notificationActionService = inject(
		NotificationActionService
	);

	protected readonly notificationStore = inject(NotificationStore);

	protected readonly notificationPush = inject(NotificationPushService);

	protected readonly isOpen = signal(false);
	protected readonly isMarkingAll = signal(false);

	ngOnInit(): void {
		void this.notificationPush.initializeForAuthenticatedUser();
	}

	protected toggle(): void {
		this.isOpen.update(value => !value);

		if (this.isOpen()) {
			this.notificationStore.refresh().subscribe();
		}
	}

	protected close(): void {
		this.isOpen.set(false);
	}

	protected async enablePush(): Promise<void> {
		await this.notificationPush.enablePushNotifications();
	}

	protected async disablePush(): Promise<void> {
		await this.notificationPush.disablePushNotifications();
	}

	protected markAllAsRead(): void {
		if (this.isMarkingAll() || this.notificationStore.unreadCount() === 0) {
			return;
		}

		this.isMarkingAll.set(true);

		this.notificationStore
			.markAllAsRead()
			.pipe(finalize(() => this.isMarkingAll.set(false)))
			.subscribe();
	}

	protected async openNotification(notification: Notification): Promise<void> {
		const action = getPrimaryNotificationAction(notification);

		this.close();

		if (!action) {
			await this.router.navigateByUrl("/tenant/notifications");

			return;
		}

		await this.notificationActionService.handle(action, notification);
	}

	protected openInbox(): void {
		this.close();

		void this.router.navigateByUrl("/tenant/notifications");
	}

	protected relativeDate(notification: Notification): string {
		return formatNotificationRelativeDate(notification.created_at);
	}
}
