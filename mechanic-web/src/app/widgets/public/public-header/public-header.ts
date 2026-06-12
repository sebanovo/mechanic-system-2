import { Component, computed, signal } from "@angular/core";
import { RouterLink } from "@angular/router";

import { PUBLIC_NAVIGATION } from "../../../core/navigation";
import { APP_ROUTES } from "../../../core/routing";

@Component({
	selector: "app-public-header",
	standalone: true,
	imports: [RouterLink],
	templateUrl: "./public-header.html",
})
export class PublicHeader {
	protected readonly appRoutes = APP_ROUTES;
	protected readonly isMobileMenuOpen = signal(false);

	protected readonly navigationItems = computed(() => {
		const group = PUBLIC_NAVIGATION[0];

		return {
			links: group.items.filter(item => item.fragment),
			actions: group.items.filter(item => item.route),
		};
	});

	protected toggleMobileMenu(): void {
		this.isMobileMenuOpen.update(value => !value);
	}

	protected closeMobileMenu(): void {
		this.isMobileMenuOpen.set(false);
	}
}
