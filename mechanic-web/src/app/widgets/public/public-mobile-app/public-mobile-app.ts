import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	lucideArrowRight,
	lucideBellRing,
	lucideClock3,
	lucideQrCode,
	lucideShieldCheck,
	lucideSmartphone,
} from "@ng-icons/lucide";

import { APP_ROUTES } from "../../../core/routing";

@Component({
	selector: "app-public-mobile-app",
	standalone: true,
	imports: [RouterLink, NgIcon],
	providers: [
		provideIcons({
			lucideArrowRight,
			lucideBellRing,
			lucideClock3,
			lucideQrCode,
			lucideShieldCheck,
			lucideSmartphone,
		}),
	],
	templateUrl: "./public-mobile-app.html",
})
export class PublicMobileApp {
	protected readonly appRoutes = APP_ROUTES;

	protected readonly qrPattern = [
		[1, 1, 1, 0, 1, 0],
		[1, 0, 1, 1, 0, 1],
		[1, 1, 0, 0, 1, 1],
		[0, 1, 1, 1, 0, 1],
		[1, 0, 1, 0, 1, 0],
		[1, 1, 0, 1, 1, 1],
	];
}
