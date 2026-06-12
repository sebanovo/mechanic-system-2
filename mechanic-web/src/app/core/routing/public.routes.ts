import { Routes } from "@angular/router";

import { PublicLayout } from "../layouts/public-layout/public-layout";

export const PUBLIC_ROUTES: Routes = [
	{
		path: "",
		component: PublicLayout,
		children: [
			{
				path: "",
				pathMatch: "full",
				loadComponent: () =>
					import("../../pages/public/home/public-home.page").then(
						m => m.PublicHomePage
					),
			},
		],
	},
];
