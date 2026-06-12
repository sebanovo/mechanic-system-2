import { Component } from "@angular/core";

import { AdminPageShell, PageHeader } from "../../../shared/custom-components";
import { IncidentAiAnalysesPanel } from "../../../widgets/incident-ai-analysis/incident-ai-analyses-panel/incident-ai-analyses-panel";

@Component({
	selector: "app-platform-incident-ai-analyses-page",
	standalone: true,
	imports: [AdminPageShell, PageHeader, IncidentAiAnalysesPanel],
	templateUrl: "./platform-incident-ai-analyses.page.html",
})
export class PlatformIncidentAiAnalysesPage {}
