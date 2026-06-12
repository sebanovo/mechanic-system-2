import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

import { APP_ROUTES } from "../../../core/routing";
import { AuthRegisterForm } from "../../../features/auth/register/auth-register-form";

@Component({
	selector: "app-register-page",
	standalone: true,
	imports: [RouterLink, AuthRegisterForm],
	template: `
		<section class="w-full max-w-4xl">
			<div class="mb-4 flex justify-start">
				<a
					[routerLink]="appRoutes.public.home"
					class="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition"
				>
					<span aria-hidden="true">←</span>
					Volver a la landing
				</a>
			</div>

			<div class="overflow-hidden rounded-3xl border bg-card shadow-xl">
				<div class="border-b bg-[linear-gradient(135deg,_rgba(13,148,136,0.12),_rgba(255,255,255,0.02))] px-6 py-8 sm:px-10">
					<div class="max-w-2xl space-y-3">
						<div class="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
							Crear cuenta
						</div>
						<h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">
							Regístrate como cliente o como taller.
						</h1>
						<p class="text-muted-foreground text-sm leading-6 sm:text-base">
							Crea tu perfil para solicitar asistencia en ruta o para recibir incidentes y gestionar tu operación desde un solo lugar.
						</p>
					</div>
				</div>

				<div class="px-6 py-8 sm:px-10">
					<app-auth-register-form />

					<p class="text-muted-foreground mt-6 text-center text-sm">
						¿Ya tienes cuenta?
						<a [routerLink]="appRoutes.auth.login" class="text-primary font-medium hover:underline">
							Iniciar sesión
						</a>
					</p>
				</div>
			</div>
		</section>
	`,
})
export class RegisterPage {
	protected readonly appRoutes = APP_ROUTES;
}
