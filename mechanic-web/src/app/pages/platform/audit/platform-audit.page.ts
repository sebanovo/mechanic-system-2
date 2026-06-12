import { Component } from "@angular/core";

import {
	AdminPageShell,
	PageHeader,
} from "../../../shared/custom-components";
import { PlatformAuditEventsList } from "../../../widgets/platform/platform-audit-events-list/platform-audit-events-list";

@Component({
	selector: "app-platform-audit-page",
	standalone: true,
	imports: [AdminPageShell, PageHeader, PlatformAuditEventsList],
	templateUrl: "./platform-audit.page.html",
})
export class PlatformAuditPage {}
