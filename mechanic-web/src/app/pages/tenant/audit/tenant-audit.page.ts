import { ChangeDetectionStrategy, Component } from "@angular/core";

import { AdminPageShell, PageHeader } from "../../../shared/custom-components";
import { TenantAuditEventsList } from "../../../widgets/tenant/tenant-audit-events-list/tenant-audit-events-list";

@Component({
	selector: "app-tenant-audit-page",
	standalone: true,
	imports: [AdminPageShell, PageHeader, TenantAuditEventsList],
	templateUrl: "./tenant-audit.page.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantAuditPage {}
