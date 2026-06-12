import { Injectable, OnDestroy, signal } from "@angular/core";
import { Subject } from "rxjs";

import {
	RealtimeTrackingConnectionStatus,
	RealtimeTrackingIncomingEvent,
} from "../model";
import { buildRealtimeTrackingWsUrl } from "./realtime-tracking-ws-url";

@Injectable({
	providedIn: "root",
})
export class RealtimeTrackingWebSocketService implements OnDestroy {
	private socket: WebSocket | null = null;
	private reconnectTimeoutId: number | null = null;
	private reconnectAttempts = 0;
	private manualClose = false;

	private readonly maxReconnectAttempts = 5;
	private readonly baseReconnectDelayMs = 1500;

	readonly status = signal<RealtimeTrackingConnectionStatus>("IDLE");
	readonly lastError = signal<string | null>(null);

	readonly messages$ = new Subject<RealtimeTrackingIncomingEvent>();

	connect(relativeWsUrl: string): void {
		this.disconnect();

		this.manualClose = false;
		this.reconnectAttempts = 0;
		this.open(relativeWsUrl);
	}

	disconnect(): void {
		this.manualClose = true;
		this.clearReconnectTimeout();

		if (this.socket) {
			this.socket.close();
			this.socket = null;
		}

		this.status.set("DISCONNECTED");
	}

	ngOnDestroy(): void {
		this.disconnect();
		this.messages$.complete();
	}

	private open(relativeWsUrl: string): void {
		const url = buildRealtimeTrackingWsUrl(relativeWsUrl);

		this.status.set("CONNECTING");
		this.lastError.set(null);

		try {
			// Con cookies httpOnly no se agrega token.
			// El navegador enviará la cookie automáticamente si el WS comparte dominio compatible.
			this.socket = new WebSocket(url);
		} catch (error) {
			this.status.set("ERROR");
			this.lastError.set(
				error instanceof Error
					? error.message
					: "No se pudo abrir el WebSocket."
			);
			this.scheduleReconnect(relativeWsUrl);
			return;
		}

		this.socket.onopen = () => {
			this.reconnectAttempts = 0;
			this.status.set("CONNECTED");
			this.lastError.set(null);
		};

		this.socket.onmessage = event => {
			const parsed = this.parseMessage(event.data);

			if (parsed) {
				this.messages$.next(parsed);
			}
		};

		this.socket.onerror = () => {
			this.status.set("ERROR");
			this.lastError.set("Error en la conexión WebSocket.");
		};

		this.socket.onclose = () => {
			this.socket = null;

			if (this.manualClose) {
				this.status.set("DISCONNECTED");
				return;
			}

			this.status.set("DISCONNECTED");
			this.scheduleReconnect(relativeWsUrl);
		};
	}

	private parseMessage(data: unknown): RealtimeTrackingIncomingEvent | null {
		if (typeof data !== "string") {
			return null;
		}

		try {
			return JSON.parse(data) as RealtimeTrackingIncomingEvent;
		} catch {
			this.lastError.set("Mensaje WebSocket inválido.");
			return null;
		}
	}

	private scheduleReconnect(relativeWsUrl: string): void {
		if (this.manualClose) {
			return;
		}

		if (this.reconnectAttempts >= this.maxReconnectAttempts) {
			this.status.set("ERROR");
			this.lastError.set("No se pudo reconectar al tracking.");
			return;
		}

		this.reconnectAttempts += 1;

		const delay =
			this.baseReconnectDelayMs * Math.min(this.reconnectAttempts, 5);

		this.clearReconnectTimeout();

		this.reconnectTimeoutId = window.setTimeout(() => {
			this.open(relativeWsUrl);
		}, delay);
	}

	private clearReconnectTimeout(): void {
		if (this.reconnectTimeoutId !== null) {
			window.clearTimeout(this.reconnectTimeoutId);
			this.reconnectTimeoutId = null;
		}
	}
}
