import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	lucideBell,
	lucideBot,
	lucideBriefcase,
	lucideBuilding,
	lucideCar,
	lucideClipboard,
	lucideClock,
	lucideDatabase,
	lucideFileText,
	lucideGauge,
	lucideHome,
	lucideListChecks,
	lucideMap,
	lucideRoute,
	lucideSettings,
	lucideShield,
	lucideUsers,
	lucideWrench,
} from "@ng-icons/lucide";

import { NavigationGroup, NavigationIcon } from "../../../core/navigation";

@Component({
	selector: "app-app-sidebar",
	standalone: true,
	imports: [RouterLink, RouterLinkActive, NgIcon],
	providers: [
		provideIcons({
			lucideHome,
			lucideGauge,
			lucideUsers,
			lucideBuilding,
			lucideCar,
			lucideWrench,
			lucideClipboard,
			lucideBell,
			lucideSettings,
			lucideShield,
			lucideFileText,
			lucideMap,
			lucideBriefcase,
			lucideListChecks,
			lucideBot,
			lucideDatabase,
			lucideClock,
			lucideRoute,
		}),
	],
	templateUrl: "./app-sidebar.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSidebar {
	readonly groups = input.required<NavigationGroup[]>();
	readonly appName = input("Mechanic");
	readonly contextLabel = input("Panel");

	protected iconName(icon?: NavigationIcon): string {
		const icons: Record<NavigationIcon, string> = {
			home: "lucideHome",
			dashboard: "lucideGauge",
			users: "lucideUsers",
			building: "lucideBuilding",
			car: "lucideCar",
			wrench: "lucideWrench",
			clipboard: "lucideClipboard",
			bell: "lucideBell",
			settings: "lucideSettings",
			shield: "lucideShield",
			"file-text": "lucideFileText",
			map: "lucideMap",
			briefcase: "lucideBriefcase",
			"list-checks": "lucideListChecks",
			bot: "lucideBot",
			database: "lucideDatabase",
			clock: "lucideClock",
			route: "lucideRoute",
		};

		return icons[icon ?? "dashboard"];
	}
}
