import { Component } from "@angular/core";

import { SelectTenantPanel } from "../../../features/auth/select-tenant/select-tenant-panel";

@Component({
	selector: "app-select-tenant-page",
	standalone: true,
	imports: [SelectTenantPanel],
	template: `
		<section
			class="bg-card text-card-foreground w-full max-w-lg rounded-[2rem] border border-black p-6 shadow-sm"
		>
			<div class="mb-6">
				<p class="text-primary text-xs font-bold uppercase tracking-[0.2em]">Acceso</p>
				<h1 class="mt-2 text-2xl font-black uppercase tracking-[0.05em]">Seleccionar taller</h1>
				<p class="text-foreground/75 mt-2 text-sm">
					Elige el tenant con el que deseas trabajar.
				</p>
			</div>

			<app-select-tenant-panel />
		</section>
	`,
})
export class SelectTenantPage {}
