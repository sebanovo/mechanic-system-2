import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

import { APP_ROUTES } from "../../../core/routing";
import { AuthRegisterForm } from "../../../features/auth/register/auth-register-form";

@Component({
	selector: "app-register-page",
	standalone: true,
	imports: [RouterLink, AuthRegisterForm],
	template: `
		<section class="w-full max-w-5xl">
			<div class="mb-4 flex justify-start">
				<a
					[routerLink]="appRoutes.public.home"
					class="text-foreground/70 hover:text-primary inline-flex items-center gap-2 text-sm font-medium transition"
				>
					<span aria-hidden="true">←</span>
					Volver a la landing
				</a>
			</div>

			<div class="overflow-hidden rounded-[2rem] border border-black bg-card shadow-sm">
				<div class="border-b border-black bg-black px-6 py-8 text-white sm:px-10">
					<div class="max-w-2xl space-y-3">
						<div class="inline-flex items-center gap-3 rounded-full border border-primary bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-black">
							<img src="/logo2.png" alt="Mechanic" class="size-5 object-contain" />
							Crear cuenta
						</div>
						<h1 class="text-3xl font-black uppercase tracking-[0.05em] sm:text-4xl">
							Regístrate como cliente o como taller.
						</h1>
						<p class="text-white/80 text-sm leading-6 sm:text-base">
							Crea tu perfil para solicitar asistencia en ruta o para recibir incidentes y gestionar tu operación desde un solo lugar.
						</p>
					</div>
				</div>

				<div class="px-6 py-8 sm:px-10">
					<app-auth-register-form />

					<p class="text-foreground/75 mt-6 text-center text-sm">
						¿Ya tienes cuenta?
						<a [routerLink]="appRoutes.auth.login" class="text-primary font-bold hover:underline">
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
