import { Routes } from "@angular/router";

export const PLATFORM_ASSIGNMENT_ROUTES: Routes = [
	{
		path: "",
		redirectTo: "list",
		pathMatch: "full",
	},
	{
		path: "list",
		loadComponent: () =>
			import(
				"./pages/platform-assignment-page/platform-assignment-page"
			).then(m => m.PlatformAssignmentPage),
	},
];
