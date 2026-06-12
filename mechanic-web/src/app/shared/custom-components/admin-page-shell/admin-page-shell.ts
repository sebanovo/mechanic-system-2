import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-admin-page-shell",
	standalone: true,
	templateUrl: "./admin-page-shell.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPageShell {}
