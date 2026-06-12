import { Component } from "@angular/core";

import { AdminPageShell, PageHeader } from "../../../shared/custom-components";
import { TenantRealtimeTrackingPanel } from "../../../widgets/tenant/tenant-realtime-tracking-panel/tenant-realtime-tracking-panel";

@Component({
	selector: "app-tenant-realtime-tracking-page",
	standalone: true,
	imports: [AdminPageShell, PageHeader, TenantRealtimeTrackingPanel],
	templateUrl: "./tenant-realtime-tracking.page.html",
})
export class TenantRealtimeTrackingPage {}
