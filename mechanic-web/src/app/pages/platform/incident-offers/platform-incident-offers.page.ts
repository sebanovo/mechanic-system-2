import { Component } from "@angular/core";

import {
	AdminPageShell,
	PageHeader,
} from "../../../shared/custom-components";
import { PlatformIncidentOffersList } from "../../../widgets/platform/platform-incident-offers-list/platform-incident-offers-list";

@Component({
	selector: "app-platform-incident-offers-page",
	standalone: true,
	imports: [AdminPageShell, PageHeader, PlatformIncidentOffersList],
	templateUrl: "./platform-incident-offers.page.html",
})
export class PlatformIncidentOffersPage {}
