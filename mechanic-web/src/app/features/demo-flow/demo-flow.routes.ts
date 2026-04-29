import { Routes } from "@angular/router";

export const DEMO_FLOW_ROUTES: Routes = [
	{
		path: "",
		redirectTo: "overview",
		pathMatch: "full",
	},
	{
		path: "overview",
		loadComponent: () =>
			import("./pages/demo-flow-page/demo-flow-page").then(
				m => m.DemoFlowPage
			),
	},
];
