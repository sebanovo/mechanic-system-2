import { Injectable } from "@angular/core";
import { importLibrary, setOptions } from "@googlemaps/js-api-loader";

import {
	getGoogleMapsMapId,
	getRequiredGoogleMapsApiKey,
} from "../../../shared/config/mechanic-runtime-config";

export type LoadedGoogleMapsLibraries = {
	maps: google.maps.MapsLibrary;
	marker: google.maps.MarkerLibrary;
	routes: {
		Route: typeof google.maps.routes.Route;
	};
};

@Injectable({
	providedIn: "root",
})
export class GoogleMapsLoaderService {
	private configured = false;

	private loadPromise: Promise<LoadedGoogleMapsLibraries> | null = null;

	load(): Promise<LoadedGoogleMapsLibraries> {
		if (this.loadPromise) {
			return this.loadPromise;
		}

		this.configure();

		this.loadPromise = Promise.all([
			importLibrary("maps"),
			importLibrary("marker"),
			importLibrary("routes"),
		]).then(([mapsLibrary, markerLibrary, routesLibrary]) => ({
			maps: mapsLibrary as google.maps.MapsLibrary,

			marker: markerLibrary as google.maps.MarkerLibrary,

			routes: routesLibrary as {
				Route: typeof google.maps.routes.Route;
			},
		}));

		return this.loadPromise;
	}

	getMapId(): string | undefined {
		return getGoogleMapsMapId();
	}

	private configure(): void {
		if (this.configured) {
			return;
		}

		setOptions({
			key: getRequiredGoogleMapsApiKey(),
			v: "weekly",
		});

		this.configured = true;
	}
}
