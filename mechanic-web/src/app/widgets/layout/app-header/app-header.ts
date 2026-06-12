import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	output,
} from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideMenu } from "@ng-icons/lucide";

import { HlmButtonImports } from "@shared/ui/button";
import { HlmIcon } from "@shared/ui/icon";

import { NotificationActionBootstrapService } from "../../../features/notifications/notification-actions/notification-action-bootstrap.service";
import { NotificationBell } from "../../notification/notification-bell/notification-bell";
import { UserMenu } from "../user-menu/user-menu";

@Component({
	selector: "app-app-header",
	standalone: true,
	imports: [HlmButtonImports, HlmIcon, NgIcon, UserMenu, NotificationBell],
	providers: [provideIcons({ lucideMenu })],
	templateUrl: "./app-header.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeader {
	readonly title = input("Dashboard");
	readonly subtitle = input<string | null>(null);
	readonly tenantName = input<string | null>(null);

	readonly menuClicked = output<void>();
	private readonly notificationActionBootstrap = inject(
		NotificationActionBootstrapService
	);

	constructor() {
		this.notificationActionBootstrap.initialize();
	}
}
