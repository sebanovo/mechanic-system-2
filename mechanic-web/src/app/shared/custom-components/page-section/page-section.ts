import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
	selector: "app-page-section",
	standalone: true,
	templateUrl: "./page-section.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSection {
	readonly title = input<string | null>(null);
	readonly description = input<string | null>(null);
	readonly padded = input(true);
}
