import { Routes } from "@angular/router";

import { guestGuard } from "../../core/session/guards/guest.guard";

export const AUTH_ROUTES: Routes = [
	{
		path: "",
		redirectTo: "login",
		pathMatch: "full",
	},
	{
		path: "login",
		canActivate: [guestGuard],
		loadComponent: () =>
			import("./pages/login-page/login-page").then(m => m.LoginPage),
	},
	{
		path: "signup",
		canActivate: [guestGuard],
		loadComponent: () =>
			import("./pages/signup-page/signup-page").then(m => m.SignupPage),
	},
];

export const ADMIN_ROUTES: Routes = [
	{
		path: "",
		redirectTo: "login",
		pathMatch: "full",
	},
	{
		path: "login",
		canActivate: [guestGuard],
		loadComponent: () =>
			import("./pages/login-admin-page/login-admin-page").then(
				m => m.LoginAdminPage
			),
	},
];
