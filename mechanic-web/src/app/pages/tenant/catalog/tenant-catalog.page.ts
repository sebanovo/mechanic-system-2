import { Component } from "@angular/core";

import { AdminPageShell, PageHeader } from "../../../shared/custom-components";
import { TenantServiceCatalogList } from "../../../widgets/tenant/tenant-service-catalog-list/tenant-service-catalog-list";

@Component({
	selector: "app-tenant-catalog-page",
	standalone: true,
	imports: [AdminPageShell, PageHeader, TenantServiceCatalogList],
	templateUrl: "./tenant-catalog.page.html",
})
export class TenantCatalogPage {}
