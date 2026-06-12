import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

import { APP_ROUTES } from "../../../core/routing";

@Component({
	selector: "app-public-cta",
	standalone: true,
	imports: [RouterLink],
	templateUrl: "./public-cta.html",
})
export class PublicCta {
	protected readonly appRoutes = APP_ROUTES;
}
