import {
	provideHttpClient,
	withFetch,
	withInterceptors,
} from "@angular/common/http";
import {
	ApplicationConfig,
	inject,
	provideAppInitializer,
	provideBrowserGlobalErrorListeners,
} from "@angular/core";
import { provideRouter, withInMemoryScrolling } from "@angular/router";

import { routes } from "./app.routes";
import { authTokenInterceptor } from "./core/interceptors/auth-token.interceptor";
import { httpErrorInterceptor } from "./core/interceptors/http-error.interceptor";
import { SessionService } from "./core/session/session.service";

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(
			routes,
			withInMemoryScrolling({
				anchorScrolling: "enabled",
				scrollPositionRestoration: "enabled",
			})
		),

		provideHttpClient(
			withFetch(),
			withInterceptors([authTokenInterceptor, httpErrorInterceptor])
		),

		provideAppInitializer(() => {
			const sessionService = inject(SessionService);

			return new Promise<void>(resolve => {
				sessionService.bootstrap().subscribe({
					next: () => resolve(),
					error: () => resolve(),
				});
			});
		}),
	],
};
