import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

import { APP_ROUTES } from "../../../core/routing";
import { AuthLoginForm } from "../../../features/auth/login/auth-login-form";

@Component({
	selector: "app-login-page",
	standalone: true,
	imports: [RouterLink, AuthLoginForm],
	template: `
		<section
			class="bg-card text-card-foreground w-full max-w-md rounded-xl border p-6 shadow-sm"
		>
			<div class="mb-6">
				<h1 class="text-2xl font-semibold">Iniciar sesión</h1>
				<p class="text-muted-foreground mt-2 text-sm">
					Ingresa con tu cuenta para continuar.
				</p>
			</div>

			<app-auth-login-form />

			<p class="text-muted-foreground mt-6 text-center text-sm">
				¿No tienes cuenta?
				<a
					[routerLink]="appRoutes.auth.register"
					class="text-primary font-medium hover:underline"
				>
					Crear cuenta
				</a>
			</p>
		</section>
	`,
})
export class LoginPage {
	protected readonly appRoutes = APP_ROUTES;
}
