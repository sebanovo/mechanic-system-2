import { DatePipe } from "@angular/common";
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	effect,
	ElementRef,
	inject,
	input,
	OnDestroy,
	signal,
	ViewChild,
} from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	lucideClock,
	lucideMapPin,
	lucideNavigation,
	lucideRoute,
} from "@ng-icons/lucide";

import { LoadingState } from "../../../../shared/custom-components";
import {
	GoogleMapsLoaderService,
	LoadedGoogleMapsLibraries,
} from "../../lib/google-maps-loader.service";
import {
	buildCoordinateBounds,
	distanceBetweenCoordinates,
	formatRouteDistance,
	formatRouteDuration,
	toGoogleLatLng,
} from "../../lib/realtime-map.utils";
import {
	formatRealtimeTrackingCoordinate,
	formatRealtimeTrackingDate,
	RealtimeTrackingConnectionStatus,
	RealtimeTrackingPoint,
} from "../../model";

@Component({
	selector: "app-realtime-google-map",
	standalone: true,
	imports: [DatePipe, NgIcon, LoadingState],
	providers: [
		provideIcons({
			lucideClock,
			lucideMapPin,
			lucideNavigation,
			lucideRoute,
		}),
	],
	templateUrl: "./realtime-google-map.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RealtimeGoogleMap implements AfterViewInit, OnDestroy {
	private readonly googleMapsLoader = inject(GoogleMapsLoaderService);

	readonly origin = input<RealtimeTrackingPoint | null>(null);
	readonly destination = input<RealtimeTrackingPoint | null>(null);

	readonly connectionStatus = input<RealtimeTrackingConnectionStatus>("IDLE");

	readonly technicianConnected = input(false);

	@ViewChild("mapContainer", { static: true })
	private readonly mapContainer!: ElementRef<HTMLDivElement>;

	protected readonly isLoading = signal(true);
	protected readonly errorMessage = signal<string | null>(null);
	protected readonly distanceLabel = signal("Sin distancia");
	protected readonly etaLabel = signal("Sin ETA");

	protected readonly lastRouteCalculatedAt = signal<string | null>(null);

	private libraries: LoadedGoogleMapsLibraries | null = null;
	private map: google.maps.Map | null = null;

	private technicianMarker: google.maps.marker.AdvancedMarkerElement | null =
		null;

	private destinationMarker: google.maps.marker.AdvancedMarkerElement | null =
		null;

	private routePolylines: google.maps.Polyline[] = [];

	private lastRouteOrigin: google.maps.LatLngLiteral | null = null;
	private lastRouteDestination: google.maps.LatLngLiteral | null = null;

	private lastRouteCalculationMs = 0;
	private routeRequestId = 0;
	private destroyed = false;

	private readonly minRouteRecalculationMs = 30_000;
	private readonly minRouteRecalculationDistanceMeters = 100;

	constructor() {
		effect(() => {
			const origin = this.origin();
			const destination = this.destination();

			if (!this.map || this.destroyed) {
				return;
			}

			this.renderMapState(origin, destination);
		});
	}

	ngAfterViewInit(): void {
		void this.initializeMap();
	}

	ngOnDestroy(): void {
		this.destroyed = true;
		this.routeRequestId += 1;

		this.clearRoutePolylines();

		if (this.technicianMarker) {
			this.technicianMarker.map = null;
		}

		if (this.destinationMarker) {
			this.destinationMarker.map = null;
		}

		this.technicianMarker = null;
		this.destinationMarker = null;
		this.map = null;
		this.libraries = null;
	}

	protected originLabel(): string {
		const point = this.origin();

		if (!point) {
			return "Sin ubicación del técnico";
		}

		const latitude = formatRealtimeTrackingCoordinate(point.latitude);

		const longitude = formatRealtimeTrackingCoordinate(point.longitude);

		return `${latitude}, ${longitude}`;
	}

	protected destinationLabel(): string {
		const point = this.destination();

		if (!point) {
			return "Sin destino";
		}

		const latitude = formatRealtimeTrackingCoordinate(point.latitude);

		const longitude = formatRealtimeTrackingCoordinate(point.longitude);

		return `${latitude}, ${longitude}`;
	}

	protected lastOriginDateLabel(): string {
		return formatRealtimeTrackingDate(this.origin()?.occurred_at ?? null);
	}

	private async initializeMap(): Promise<void> {
		this.isLoading.set(true);
		this.errorMessage.set(null);

		try {
			this.libraries = await this.googleMapsLoader.load();

			if (this.destroyed) {
				return;
			}

			const initialCenter = toGoogleLatLng(this.origin()) ??
				toGoogleLatLng(this.destination()) ?? {
					lat: -16.5,
					lng: -68.15,
				};

			const mapOptions: google.maps.MapOptions = {
				center: initialCenter,
				zoom: 14,
				fullscreenControl: true,
				mapTypeControl: false,
				streetViewControl: false,
				clickableIcons: false,
				mapId: this.googleMapsLoader.getMapId() ?? "DEMO_MAP_ID",
			};

			this.map = new this.libraries.maps.Map(
				this.mapContainer.nativeElement,
				mapOptions
			);

			this.isLoading.set(false);

			this.renderMapState(this.origin(), this.destination());
		} catch (error) {
			if (this.destroyed) {
				return;
			}

			this.errorMessage.set(
				error instanceof Error
					? error.message
					: "No se pudo cargar Google Maps."
			);

			this.isLoading.set(false);
		}
	}

	private renderMapState(
		originPoint: RealtimeTrackingPoint | null,
		destinationPoint: RealtimeTrackingPoint | null
	): void {
		const origin = toGoogleLatLng(originPoint);
		const destination = toGoogleLatLng(destinationPoint);

		this.renderMarkers(origin, destination);

		if (origin && destination) {
			void this.renderRouteIfNeeded(origin, destination);
			return;
		}

		this.clearRoute();
		this.fitAvailablePoints(origin, destination);
	}

	private renderMarkers(
		origin: google.maps.LatLngLiteral | null,
		destination: google.maps.LatLngLiteral | null
	): void {
		if (!this.map || !this.libraries) {
			return;
		}

		if (origin) {
			if (!this.technicianMarker) {
				this.technicianMarker = new this.libraries.marker.AdvancedMarkerElement(
					{
						map: this.map,
						position: origin,
						title: "Técnico",
					}
				);
			} else {
				this.technicianMarker.map = this.map;
				this.technicianMarker.position = origin;
			}
		} else if (this.technicianMarker) {
			this.technicianMarker.map = null;
		}

		if (destination) {
			if (!this.destinationMarker) {
				this.destinationMarker =
					new this.libraries.marker.AdvancedMarkerElement({
						map: this.map,
						position: destination,
						title: "Destino",
					});
			} else {
				this.destinationMarker.map = this.map;
				this.destinationMarker.position = destination;
			}
		} else if (this.destinationMarker) {
			this.destinationMarker.map = null;
		}
	}

	private async renderRouteIfNeeded(
		origin: google.maps.LatLngLiteral,
		destination: google.maps.LatLngLiteral
	): Promise<void> {
		if (
			!this.map ||
			!this.libraries ||
			!this.shouldRecalculateRoute(origin, destination)
		) {
			return;
		}

		this.lastRouteOrigin = { ...origin };
		this.lastRouteDestination = { ...destination };
		this.lastRouteCalculationMs = Date.now();

		const requestId = ++this.routeRequestId;

		try {
			const request: google.maps.routes.ComputeRoutesRequest = {
				origin,
				destination,
				travelMode: "DRIVING",
				fields: ["path", "distanceMeters", "durationMillis"],
			};

			const response = await this.libraries.routes.Route.computeRoutes(request);

			if (this.destroyed || requestId !== this.routeRequestId) {
				return;
			}

			const route = response.routes?.[0];

			if (!route) {
				this.handleRouteUnavailable(origin, destination);
				return;
			}

			this.clearRoutePolylines();

			this.routePolylines = route.createPolylines();

			for (const polyline of this.routePolylines) {
				polyline.setOptions({
					strokeWeight: 5,
					strokeOpacity: 0.85,
				});

				polyline.setMap(this.map);
			}

			this.distanceLabel.set(formatRouteDistance(route.distanceMeters));

			this.etaLabel.set(formatRouteDuration(route.durationMillis));

			this.lastRouteCalculatedAt.set(new Date().toISOString());

			this.fitRoutePath(route.path);
		} catch (error) {
			if (this.destroyed || requestId !== this.routeRequestId) {
				return;
			}

			this.handleRouteUnavailable(origin, destination);

			console.error("[RealtimeGoogleMap] Error calculating route", error);
		}
	}

	private shouldRecalculateRoute(
		origin: google.maps.LatLngLiteral,
		destination: google.maps.LatLngLiteral
	): boolean {
		if (!this.lastRouteOrigin || !this.lastRouteDestination) {
			return true;
		}

		const elapsed = Date.now() - this.lastRouteCalculationMs;

		if (elapsed >= this.minRouteRecalculationMs) {
			return true;
		}

		const originDistance = distanceBetweenCoordinates(
			this.lastRouteOrigin,
			origin
		);

		const destinationDistance = distanceBetweenCoordinates(
			this.lastRouteDestination,
			destination
		);

		return (
			originDistance >= this.minRouteRecalculationDistanceMeters ||
			destinationDistance >= this.minRouteRecalculationDistanceMeters
		);
	}

	private handleRouteUnavailable(
		origin: google.maps.LatLngLiteral,
		destination: google.maps.LatLngLiteral
	): void {
		this.clearRoutePolylines();

		this.distanceLabel.set("Ruta no disponible");
		this.etaLabel.set("ETA no disponible");
		this.lastRouteCalculatedAt.set(null);

		this.fitAvailablePoints(origin, destination);
	}

	private clearRoute(): void {
		this.routeRequestId += 1;
		this.clearRoutePolylines();

		this.distanceLabel.set("Sin distancia");
		this.etaLabel.set("Sin ETA");
		this.lastRouteCalculatedAt.set(null);
		this.lastRouteOrigin = null;
		this.lastRouteDestination = null;
		this.lastRouteCalculationMs = 0;
	}

	private clearRoutePolylines(): void {
		for (const polyline of this.routePolylines) {
			polyline.setMap(null);
		}

		this.routePolylines = [];
	}

	private fitRoutePath(path: google.maps.LatLngAltitude[] | undefined): void {
		if (!this.map || !path || path.length === 0) {
			return;
		}

		const points: google.maps.LatLngLiteral[] = path.map(point => ({
			lat: point.lat,
			lng: point.lng,
		}));

		const bounds = buildCoordinateBounds(points);

		if (bounds) {
			this.map.fitBounds(bounds, 60);
		}
	}

	private fitAvailablePoints(
		origin: google.maps.LatLngLiteral | null,
		destination: google.maps.LatLngLiteral | null
	): void {
		if (!this.map) {
			return;
		}

		const points = [origin, destination].filter(
			(point): point is google.maps.LatLngLiteral => point !== null
		);

		if (points.length === 0) {
			return;
		}

		if (points.length === 1) {
			this.map.setCenter(points[0]);
			this.map.setZoom(15);
			return;
		}

		const bounds = buildCoordinateBounds(points);

		if (bounds) {
			this.map.fitBounds(bounds, 60);
		}
	}
}
