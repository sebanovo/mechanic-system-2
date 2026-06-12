import { Routes } from "@angular/router";

import { AuthLayout } from "../layouts/auth-layout/auth-layout";

export const AUTH_ROUTES: Routes = [
	{
		path: "",
		component: AuthLayout,
		children: [
			{
				path: "login",
				loadComponent: () =>
					import("../../pages/auth/login/login.page").then(m => m.LoginPage),
			},
			{
				path: "register",
				loadComponent: () =>
					import("../../pages/auth/register/register.page").then(
						m => m.RegisterPage
					),
			},
			{
				path: "register/client",
				loadComponent: () =>
					import("../../pages/auth/register/register.page").then(
						m => m.RegisterPage
					),
			},
			{
				path: "register/tenant",
				loadComponent: () =>
					import("../../pages/auth/register/register.page").then(
						m => m.RegisterPage
					),
			},
			{
				path: "select-tenant",
				loadComponent: () =>
					import("../../pages/auth/select-tenant/select-tenant.page").then(
						m => m.SelectTenantPage
					),
			},
		],
	},
];
