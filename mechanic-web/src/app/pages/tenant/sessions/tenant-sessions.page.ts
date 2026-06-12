import { Component } from "@angular/core";

import { AdminPageShell, PageHeader } from "../../../shared/custom-components";
import { TenantSessionsList } from "../../../widgets/tenant/tenant-sessions-list/tenant-sessions-list";

@Component({
	selector: "app-tenant-sessions-page",
	standalone: true,
	imports: [AdminPageShell, PageHeader, TenantSessionsList],
	templateUrl: "./tenant-sessions.page.html",
})
export class TenantSessionsPage {}
