import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideMenu } from "@ng-icons/lucide";

import { HlmButtonImports } from "@shared/ui/button";
import { HlmIcon } from "@shared/ui/icon";

import { NotificationButton } from "../notification-button/notification-button";
import { UserMenu } from "../user-menu/user-menu";

@Component({
	selector: "app-app-header",
	standalone: true,
	imports: [HlmButtonImports, HlmIcon, NgIcon, NotificationButton, UserMenu],
	providers: [provideIcons({ lucideMenu })],
	templateUrl: "./app-header.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeader {
	readonly title = input("Dashboard");
	readonly subtitle = input<string | null>(null);
	readonly tenantName = input<string | null>(null);

	readonly menuClicked = output<void>();
}
