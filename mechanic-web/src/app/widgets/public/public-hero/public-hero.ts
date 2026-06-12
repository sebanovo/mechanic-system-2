import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	lucideBot,
	lucideQrCode,
	lucideShieldCheck,
	lucideWorkflow,
} from "@ng-icons/lucide";

import { APP_ROUTES } from "../../../core/routing";

@Component({
	selector: "app-public-hero",
	standalone: true,
	imports: [RouterLink, NgIcon],
	providers: [
		provideIcons({
			lucideBot,
			lucideQrCode,
			lucideShieldCheck,
			lucideWorkflow,
		}),
	],
	templateUrl: "./public-hero.html",
})
export class PublicHero {
	protected readonly appRoutes = APP_ROUTES;
}
