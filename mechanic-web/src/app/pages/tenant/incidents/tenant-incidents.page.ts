import { Component } from "@angular/core";

import { AdminPageShell, PageHeader } from "../../../shared/custom-components";
import { TenantIncidentsList } from "../../../widgets/tenant/tenant-incidents-list/tenant-incidents-list";

@Component({
	selector: "app-tenant-incidents-page",
	standalone: true,
	imports: [AdminPageShell, PageHeader, TenantIncidentsList],
	templateUrl: "./tenant-incidents.page.html",
})
export class TenantIncidentsPage {}
