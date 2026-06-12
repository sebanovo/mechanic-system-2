import { Component } from "@angular/core";

import { AdminPageShell, PageHeader } from "../../../shared/custom-components";
import { TenantCandidateProvidersList } from "../../../widgets/tenant/tenant-candidate-providers-list/tenant-candidate-providers-list";

@Component({
	selector: "app-tenant-candidates-page",
	standalone: true,
	imports: [AdminPageShell, PageHeader, TenantCandidateProvidersList],
	templateUrl: "./tenant-candidates.page.html",
})
export class TenantCandidatesPage {}
