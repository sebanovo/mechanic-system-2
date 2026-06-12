import { Component } from "@angular/core";

import { AdminPageShell, PageHeader } from "../../../shared/custom-components";
import { TenantMembersList } from "../../../widgets/tenant/tenant-members-list/tenant-members-list";

@Component({
	selector: "app-tenant-members-page",
	standalone: true,
	imports: [AdminPageShell, PageHeader, TenantMembersList],
	templateUrl: "./tenant-members.page.html",
})
export class TenantMembersPage {}
