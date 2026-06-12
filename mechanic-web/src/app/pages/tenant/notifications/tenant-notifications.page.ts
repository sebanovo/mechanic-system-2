import { ChangeDetectionStrategy, Component } from "@angular/core";

import { AdminPageShell, PageHeader } from "../../../shared/custom-components";
import { NotificationInbox } from "../../../widgets/notification/notification-inbox/notification-inbox";

@Component({
	selector: "app-tenant-notifications-page",
	standalone: true,
	imports: [AdminPageShell, PageHeader, NotificationInbox],
	templateUrl: "./tenant-notifications.page.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantNotificationsPage {}
