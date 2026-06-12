import { Component } from "@angular/core";

@Component({
	selector: "app-register-page",
	standalone: true,
	template: `
		<section
			class="bg-card text-card-foreground w-full max-w-md rounded-xl border p-6 shadow-sm"
		>
			<h1 class="text-2xl font-semibold">Crear cuenta</h1>
			<p class="text-muted-foreground mt-2 text-sm">
				Aquí irá el registro de cliente o taller.
			</p>
		</section>
	`,
})
export class RegisterPage {}
