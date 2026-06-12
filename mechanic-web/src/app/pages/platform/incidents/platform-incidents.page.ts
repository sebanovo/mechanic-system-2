import { Component } from "@angular/core";

import {
	AdminPageShell,
	PageHeader,
} from "../../../shared/custom-components";
import { PlatformIncidentsList } from "../../../widgets/platform/platform-incidents-list/platform-incidents-list";

@Component({
	selector: "app-platform-incidents-page",
	standalone: true,
	imports: [AdminPageShell, PageHeader, PlatformIncidentsList],
	templateUrl: "./platform-incidents.page.html",
})
export class PlatformIncidentsPage {}
