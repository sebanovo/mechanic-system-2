import { inject, Injectable } from "@angular/core";

import { SessionStore } from "../store/session.store";

@Injectable({
	providedIn: "root",
})
export class SessionBootstrapService {
	private readonly sessionStore = inject(SessionStore);

	async runBootstrap(): Promise<void> {
		await this.sessionStore.bootstrap();
	}
}
