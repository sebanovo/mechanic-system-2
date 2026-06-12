import { Component } from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	lucideArrowRight,
	lucideBarChart3,
	lucideClock3,
	lucideShieldCheck,
	lucideWrench,
} from "@ng-icons/lucide";

@Component({
	selector: "app-public-workshops",
	standalone: true,
	imports: [NgIcon],
	providers: [
		provideIcons({
			lucideArrowRight,
			lucideBarChart3,
			lucideClock3,
			lucideShieldCheck,
			lucideWrench,
		}),
	],
	templateUrl: "./public-workshops.html",
})
export class PublicWorkshops {}
