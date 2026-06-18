import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import { API_CONFIG, buildHttpParams, QueryParams } from "../../../shared/api";
import { ApiResponse } from "../../../shared/api/api.types";
import {
	ClientAssignmentDetail,
	ClientAssignmentListData,
	ClientAssignmentListQuery,
	ClientAssignmentTrackingEventListData,
	ClientAssignmentTrackingEventListQuery,
	ClientDashboardQuery,
	ClientIncident,
	ClientIncidentCancelRequest,
	ClientIncidentCreateRequest,
	ClientIncidentListData,
	ClientIncidentListQuery,
	ClientIncidentUpdateRequest,
	ClientNotification,
	ClientNotificationBulkActionData,
	ClientNotificationDevice,
	ClientNotificationDeviceListData,
	ClientNotificationDeviceListQuery,
	ClientNotificationDevicePlatform,
	ClientNotificationListData,
	ClientNotificationListQuery,
	ClientOperationalDashboard,
	ClientPasswordChangeRequest,
	ClientProfile,
	ClientProfileUpdateRequest,
	ClientSession,
	ClientSessionListData,
	ClientSessionListQuery,
	ClientVehicle,
	ClientVehicleCreateRequest,
	ClientVehicleDetail,
	ClientVehicleListData,
	ClientVehicleListQuery,
	ClientVehicleStatusChangeRequest,
	ClientVehicleUpdateRequest,
} from "../model";
import {
	IncidentAiAnalysis,
	IncidentAiAnalysisListData,
	IncidentAiAnalysisListQuery,
} from "../../../entities/incident-ai-analysis/model";

@Injectable({
	providedIn: "root",
})
export class ClientApi {
	private readonly http = inject(HttpClient);

	getMyProfile(): Observable<ClientProfile> {
		return this.request<ClientProfile>("GET", "/clients/me");
	}

	updateMyProfile(payload: ClientProfileUpdateRequest): Observable<ClientProfile> {
		return this.request<ClientProfile, ClientProfileUpdateRequest>(
			"PUT",
			"/clients/me",
			{ body: payload }
		);
	}

	changeMyPassword(payload: ClientPasswordChangeRequest): Observable<Record<string, never>> {
		return this.request<Record<string, never>, ClientPasswordChangeRequest>(
			"PATCH",
			"/clients/me/password",
			{ body: payload }
		);
	}

	listMySessions(
		query?: ClientSessionListQuery
	): Observable<ClientSessionListData> {
		return this.request<ClientSessionListData, never>(
			"GET",
			"/clients/me/sessions",
			{ params: this.toQueryParams(query) }
		);
	}

	revokeMySession(sessionId: string): Observable<ClientSession> {
		return this.request<ClientSession, never>(
			"DELETE",
			`/clients/me/sessions/${sessionId}`
		);
	}

	listMyVehicles(
		query?: ClientVehicleListQuery
	): Observable<ClientVehicleListData> {
		return this.request<ClientVehicleListData, never>(
			"GET",
			"/clients/me/vehicles",
			{ params: this.toQueryParams(query) }
		);
	}

	createMyVehicle(
		payload: ClientVehicleCreateRequest
	): Observable<ClientVehicle> {
		return this.request<ClientVehicle, ClientVehicleCreateRequest>(
			"POST",
			"/clients/me/vehicles",
			{ body: payload }
		);
	}

	getMyVehicle(vehicleId: string): Observable<ClientVehicleDetail> {
		return this.request<ClientVehicleDetail, never>(
			"GET",
			`/clients/me/vehicles/${vehicleId}`
		);
	}

	updateMyVehicle(
		vehicleId: string,
		payload: ClientVehicleUpdateRequest
	): Observable<ClientVehicle> {
		return this.request<ClientVehicle, ClientVehicleUpdateRequest>(
			"PUT",
			`/clients/me/vehicles/${vehicleId}`,
			{ body: payload }
		);
	}

	deleteMyVehicle(vehicleId: string): Observable<ClientVehicle> {
		return this.request<ClientVehicle, never>(
			"DELETE",
			`/clients/me/vehicles/${vehicleId}`
		);
	}

	changeMyVehicleStatus(
		vehicleId: string,
		payload: ClientVehicleStatusChangeRequest
	): Observable<ClientVehicle> {
		return this.request<ClientVehicle, ClientVehicleStatusChangeRequest>(
			"PATCH",
			`/clients/me/vehicles/${vehicleId}/status`,
			{ body: payload }
		);
	}

	listMyIncidents(
		query?: ClientIncidentListQuery
	): Observable<ClientIncidentListData> {
		return this.request<ClientIncidentListData, never>(
			"GET",
			"/clients/me/incidents",
			{ params: this.toQueryParams(query) }
		);
	}

	createMyIncident(
		payload: ClientIncidentCreateRequest
	): Observable<ClientIncident> {
		return this.request<ClientIncident, ClientIncidentCreateRequest>(
			"POST",
			"/clients/me/incidents",
			{ body: payload }
		);
	}

	getMyIncident(incidentId: string): Observable<ClientIncident> {
		return this.request<ClientIncident, never>(
			"GET",
			`/clients/me/incidents/${incidentId}`
		);
	}

	updateMyIncident(
		incidentId: string,
		payload: ClientIncidentUpdateRequest
	): Observable<ClientIncident> {
		return this.request<ClientIncident, ClientIncidentUpdateRequest>(
			"PUT",
			`/clients/me/incidents/${incidentId}`,
			{ body: payload }
		);
	}

	listMyIncidentAiAnalyses(
		incidentId: string,
		query?: IncidentAiAnalysisListQuery
	): Observable<IncidentAiAnalysisListData> {
		return this.request<IncidentAiAnalysisListData, never>(
			"GET",
			`/clients/me/incidents/${incidentId}/ai-analyses`,
			{ params: this.toQueryParams(query) }
		);
	}

	getMyIncidentAiAnalysis(
		incidentId: string,
		analysisId: string
	): Observable<IncidentAiAnalysis> {
		return this.request<IncidentAiAnalysis, never>(
			"GET",
			`/clients/me/incidents/${incidentId}/ai-analyses/${analysisId}`
		);
	}

	cancelMyIncident(
		incidentId: string,
		payload: ClientIncidentCancelRequest = {}
	): Observable<ClientIncident> {
		return this.request<ClientIncident, ClientIncidentCancelRequest>(
			"PATCH",
			`/clients/me/incidents/${incidentId}/cancel`,
			{ body: payload }
		);
	}

	listMyAssignments(
		query?: ClientAssignmentListQuery
	): Observable<ClientAssignmentListData> {
		return this.request<ClientAssignmentListData, never>(
			"GET",
			"/clients/me/assignments",
			{ params: this.toQueryParams(query) }
		);
	}

	getMyAssignment(assignmentId: string): Observable<ClientAssignmentDetail> {
		return this.request<ClientAssignmentDetail, never>(
			"GET",
			`/clients/me/assignments/${assignmentId}`
		);
	}

	listMyAssignmentTrackingEvents(
		assignmentId: string,
		query?: ClientAssignmentTrackingEventListQuery
	): Observable<ClientAssignmentTrackingEventListData> {
		return this.request<ClientAssignmentTrackingEventListData, never>(
			"GET",
			`/clients/me/assignments/${assignmentId}/tracking-events`,
			{ params: this.toQueryParams(query) }
		);
	}

	getMyAssignmentTrackingSession(
		assignmentId: string
	): Observable<import("../../../entities/realtime-tracking/model").RealtimeTrackingSession> {
		return this.request<
			import("../../../entities/realtime-tracking/model").RealtimeTrackingSession,
			never
		>("GET", `/clients/me/assignments/${assignmentId}/tracking-session`);
	}

	getMyOperationalDashboard(
		query?: ClientDashboardQuery
	): Observable<ClientOperationalDashboard> {
		return this.request<ClientOperationalDashboard, never>(
			"GET",
			"/clients/me/dashboard/operational",
			{ params: this.toQueryParams(query) }
		);
	}

	listMyNotificationDevices(
		query?: ClientNotificationDeviceListQuery
	): Observable<ClientNotificationDeviceListData> {
		return this.request<ClientNotificationDeviceListData, never>(
			"GET",
			"/notification/devices",
			{ params: this.toQueryParams(query) }
		);
	}

	registerMyNotificationDevice(
		payload: {
			device_token: string;
			platform: ClientNotificationDevicePlatform;
			device_name?: string;
			app_version?: string;
			os_version?: string;
		}
	): Observable<ClientNotificationDevice> {
		return this.request<ClientNotificationDevice, typeof payload>(
			"POST",
			"/notification/devices",
			{ body: payload }
		);
	}

	revokeMyNotificationDevice(deviceId: string): Observable<ClientNotificationDevice> {
		return this.request<ClientNotificationDevice, never>(
			"DELETE",
			`/notification/devices/${deviceId}`
		);
	}

	listMyNotifications(
		query?: ClientNotificationListQuery
	): Observable<ClientNotificationListData> {
		return this.request<ClientNotificationListData, never>(
			"GET",
			"/notifications",
			{ params: this.toQueryParams(query) }
		);
	}

	markMyNotificationAsRead(
		notificationId: string
	): Observable<ClientNotification> {
		return this.request<ClientNotification, never>(
			"PATCH",
			`/notifications/${notificationId}/read`
		);
	}

	markAllMyNotificationsAsRead(): Observable<ClientNotificationBulkActionData> {
		return this.request<ClientNotificationBulkActionData, never>(
			"PATCH",
			"/notifications/read-all"
		);
	}

	private request<TResponse, TPayload = unknown>(
		method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
		path: string,
		options?: {
			body?: TPayload;
			params?: QueryParams;
		}
	): Observable<TResponse> {
		const requestOptions: Record<string, unknown> = {
			observe: "response",
			responseType: "json",
			withCredentials: API_CONFIG.withCredentials,
		};

		const params = buildHttpParams(options?.params);

		if (params) {
			requestOptions["params"] = params;
		}

		if (options && "body" in options && options.body !== undefined) {
			requestOptions["body"] = options.body;
		}

		const response$ = this.http.request<ApiResponse<TResponse>>(
			method,
			this.url(path),
			requestOptions as any
		) as Observable<HttpResponse<ApiResponse<TResponse>>>;

		return response$.pipe(map(response => this.extractResponseData(response)));
	}

	private toQueryParams<T extends object>(
		query?: T
	): QueryParams | undefined {
		return query ? (query as unknown as QueryParams) : undefined;
	}

	private extractResponseData<TResponse>(
		response: HttpResponse<ApiResponse<TResponse>>
	): TResponse {
		const body = response.body;
		const statusCode = response.status !== 200 ? response.status : 400;

		if (response.status !== 200 || !body || body.success !== true) {
			throw this.toHttpError(response, body, statusCode);
		}

		return body.data;
	}

	private toHttpError<TResponse>(
		response: HttpResponse<ApiResponse<TResponse>>,
		body: ApiResponse<TResponse> | null,
		statusOverride?: number
	): HttpErrorResponse {
		return new HttpErrorResponse({
			error: body ?? {
				success: false,
				message: "La respuesta del servidor no fue válida.",
				data: null,
			},
			status: statusOverride ?? response.status,
			statusText: response.statusText,
			url: response.url ?? undefined,
		});
	}

	private url(path: string): string {
		if (path.startsWith("http://") || path.startsWith("https://")) {
			return path;
		}

		const normalizedPath = path.startsWith("/") ? path : `/${path}`;

		return `${API_CONFIG.baseUrl}${normalizedPath}`;
	}
}
