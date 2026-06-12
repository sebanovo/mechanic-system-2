import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

import { APP_ROUTES } from "../../../core/routing";
import { AuthLoginForm } from "../../../features/auth/login/auth-login-form";

@Component({
	selector: "app-login-page",
	standalone: true,
	imports: [RouterLink, AuthLoginForm],
	template: `
		<section class="w-full max-w-6xl">
			<div class="mb-4 flex justify-start">
				<a
					[routerLink]="appRoutes.public.home"
					class="text-foreground/70 hover:text-primary inline-flex items-center gap-2 text-sm font-medium transition"
				>
					<span aria-hidden="true">←</span>
					Volver a la landing
				</a>
			</div>

			<div class="grid overflow-hidden rounded-[2rem] border border-black bg-card shadow-sm lg:grid-cols-[1.05fr_0.95fr]">
				<div class="flex flex-col justify-between border-b border-black bg-black p-8 text-white lg:border-b-0 lg:border-r lg:p-10">
					<div class="space-y-5">
						<div class="inline-flex items-center gap-3 rounded-full border border-primary bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-black">
							<img src="/logo2.png" alt="Mechanic" class="size-5 object-contain" />
							Acceso seguro
						</div>

						<h1 class="max-w-md text-3xl font-black uppercase tracking-[0.05em] sm:text-4xl">
							Inicia sesión y vuelve a tu operación en segundos.
						</h1>

						<p class="max-w-lg text-sm leading-6 text-white/80 sm:text-base">
							Accede a tus incidentes, asignaciones, notificaciones y dashboards con una
							experiencia clara y rápida.
						</p>
					</div>

					<div class="mt-10 grid gap-3 text-sm sm:grid-cols-2">
						<div class="rounded-2xl border border-primary/40 bg-[#1A1A1A] px-4 py-3">
							<p class="font-semibold text-primary">Entrada unificada</p>
							<p class="mt-1 text-white/75">Un solo acceso para cliente, taller y técnico.</p>
						</div>
						<div class="rounded-2xl border border-primary/40 bg-[#1A1A1A] px-4 py-3">
							<p class="font-semibold text-primary">Sesión persistente</p>
							<p class="mt-1 text-white/75">Tu cuenta mantiene cookies y tokens seguros.</p>
						</div>
					</div>
				</div>

				<div class="flex items-center justify-center p-6 sm:p-10">
					<div class="w-full max-w-md rounded-2xl border border-black bg-background p-6 shadow-sm sm:p-8">
						<div class="mb-6">
							<p class="text-primary text-xs font-bold uppercase tracking-[0.2em]">Mechanic</p>
							<h2 class="mt-2 text-2xl font-black uppercase tracking-[0.04em]">Iniciar sesión</h2>
							<p class="text-foreground/75 mt-2 text-sm">
								Ingresa con tu cuenta para continuar.
							</p>
						</div>

						<app-auth-login-form />

						<p class="text-foreground/75 mt-6 text-center text-sm">
							¿No tienes cuenta?
							<a
								[routerLink]="appRoutes.auth.register"
								class="text-primary font-bold hover:underline"
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
