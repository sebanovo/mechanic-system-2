import { Component } from "@angular/core";

import { SelectTenantPanel } from "../../../features/auth/select-tenant/select-tenant-panel";

@Component({
	selector: "app-select-tenant-page",
	standalone: true,
	imports: [SelectTenantPanel],
	template: `
		<section
			class="bg-card text-card-foreground w-full max-w-lg rounded-xl border p-6 shadow-sm"
		>
			<div class="mb-6">
				<h1 class="text-2xl font-semibold">Seleccionar taller</h1>
				<p class="text-muted-foreground mt-2 text-sm">
					Elige el tenant con el que deseas trabajar.
				</p>
			</div>

			<app-select-tenant-panel />
		</section>
	`,
})
export class SelectTenantPage {}
