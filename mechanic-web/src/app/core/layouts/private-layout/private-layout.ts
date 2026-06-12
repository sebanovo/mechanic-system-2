import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { AppShell } from "../../../widgets/layout/app-shell/app-shell";

@Component({
	selector: "app-private-layout",
	standalone: true,
	imports: [RouterOutlet, AppShell],
	templateUrl: "./private-layout.html",
})
export class PrivateLayout {}
