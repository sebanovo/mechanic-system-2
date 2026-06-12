import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

import { APP_ROUTES } from "../../../core/routing";

@Component({
	selector: "app-public-hero",
	standalone: true,
	imports: [RouterLink],
	templateUrl: "./public-hero.html",
})
export class PublicHero {
	protected readonly appRoutes = APP_ROUTES;
}
