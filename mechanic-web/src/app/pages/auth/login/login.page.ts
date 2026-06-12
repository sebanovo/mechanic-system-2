import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

import { APP_ROUTES } from "../../../core/routing";
import { AuthLoginForm } from "../../../features/auth/login/auth-login-form";

@Component({
	selector: "app-login-page",
	standalone: true,
	imports: [RouterLink, AuthLoginForm],
	template: `
		<section class="w-full max-w-5xl">
			<div class="mb-4 flex justify-start">
				<a
					[routerLink]="appRoutes.public.home"
					class="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition"
				>
					<span aria-hidden="true">←</span>
					Volver a la landing
				</a>
			</div>

			<div class="grid overflow-hidden rounded-3xl border bg-card shadow-xl lg:grid-cols-[1.05fr_0.95fr]">
					<div class="relative flex flex-col justify-between overflow-hidden bg-[linear-gradient(135deg,_rgba(13,148,136,0.14),_rgba(17,24,39,0.02))] p-8 sm:p-10">
						<div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(13,148,136,0.12),_transparent_40%)]"></div>

					<div class="relative space-y-4">
						<div class="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
							Acceso seguro
						</div>
						<h1 class="max-w-md text-3xl font-semibold tracking-tight sm:text-4xl">
							Inicia sesión y vuelve a tu operación en segundos.
						</h1>
						<p class="text-muted-foreground max-w-lg text-sm leading-6 sm:text-base">
							Accede a tus incidentes, asignaciones, notificaciones y dashboards con una experiencia clara y rápida.
						</p>
					</div>

					<div class="relative mt-10 grid gap-3 text-sm sm:grid-cols-2">
						<div class="bg-background/70 rounded-2xl border px-4 py-3 backdrop-blur">
							<p class="font-medium">Entrada unificada</p>
							<p class="text-muted-foreground mt-1">Un solo acceso para cliente, taller y técnico.</p>
						</div>
						<div class="bg-background/70 rounded-2xl border px-4 py-3 backdrop-blur">
							<p class="font-medium">Sesión persistente</p>
							<p class="text-muted-foreground mt-1">Tu cuenta mantiene cookies y tokens seguros.</p>
						</div>
					</div>
				</div>

				<div class="flex items-center justify-center p-6 sm:p-10">
					<div class="w-full max-w-md rounded-2xl border bg-background p-6 shadow-sm sm:p-8">
						<div class="mb-6">
							<h2 class="text-2xl font-semibold">Iniciar sesión</h2>
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
					</div>
				</div>
			</div>
		</section>
	`,
})
export class LoginPage {
	protected readonly appRoutes = APP_ROUTES;
}
