import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

import { APP_ROUTES } from "../../../core/routing";

@Component({
	selector: "app-public-footer",
	standalone: true,
	imports: [RouterLink],
	templateUrl: "./public-footer.html",
})
export class PublicFooter {
	protected readonly appRoutes = APP_ROUTES;
}
