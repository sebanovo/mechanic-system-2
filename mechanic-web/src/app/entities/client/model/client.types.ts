import { AssignmentDetail, AssignmentListData, AssignmentListQuery } from "../../../entities/assignment/model";
import { AssignmentTrackingEventDetail, AssignmentTrackingEventListData, AssignmentTrackingEventListQuery } from "../../../entities/assignment-tracking-event/model";
import { Incident, IncidentListData, IncidentListQuery, IncidentPriority, IncidentStatus } from "../../../entities/incident/model";
import { IncidentAiAnalysis, IncidentAiAnalysisListData, IncidentAiAnalysisListQuery } from "../../../entities/incident-ai-analysis/model";
import { Notification, NotificationBulkActionData, NotificationListData, NotificationListQuery, NotificationStatus, NotificationSummary } from "../../../entities/notification/model";
import { NotificationDevice, NotificationDeviceListData, NotificationDeviceListQuery, NotificationDevicePlatform, NotificationDeviceStatus } from "../../../entities/notification-device/model";
import { Session, SessionListData, SessionStatus } from "../../../entities/session/model";
import { User, UserUpdatePayload } from "../../../entities/user/model";
import { ListQuery } from "../../../shared/api";

export type ClientProfile = User;
export type ClientProfileUpdateRequest = UserUpdatePayload;

export type ClientPasswordChangeRequest = {
	current_password: string;
	new_password: string;
};

export type ClientCustomerStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

export type ClientVehicleType = "CAR" | "MOTORCYCLE" | "TRUCK" | "VAN" | "SUV" | "OTHER";
export type ClientVehicleStatus = "ACTIVE" | "INACTIVE";

export type ClientVehicle = {
	id: string;
	customer_id: string;
	plate_number: string;
	brand: string | null;
	model: string | null;
	year: number | null;
	color: string | null;
	vehicle_type: ClientVehicleType;
	status: ClientVehicleStatus;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
};

export type ClientVehicleCustomer = {
	customer: {
		id: string;
		user_id: string;
		customer_code: string;
		status: ClientCustomerStatus;
		created_at: string;
		updated_at: string;
		deleted_at: string | null;
	};
	user: User;
};

export type ClientVehicleDetail = {
	vehicle: ClientVehicle;
	customer: ClientVehicleCustomer;
};

export type ClientVehicleCreateRequest = {
	plate_number: string;
	vehicle_type: ClientVehicleType;
	brand?: string | null;
	model?: string | null;
	year?: number | null;
	color?: string | null;
};

export type ClientVehicleUpdateRequest = Partial<ClientVehicleCreateRequest>;

export type ClientVehicleStatusChangeRequest = {
	status: ClientVehicleStatus;
};

export type ClientVehiclePagination = {
	page: number;
	page_size: number;
	total: number;
	total_pages: number;
	has_next?: boolean;
	has_previous?: boolean;
};

export type ClientVehicleListData = {
	items: ClientVehicle[];
	pagination: ClientVehiclePagination;
};

export type ClientVehicleListQuery = ListQuery<{
	search?: string;
	vehicle_type?: ClientVehicleType | "";
	status?: ClientVehicleStatus | "";
}>;

export type ClientIncidentCreateRequest = {
	vehicle_id: string;
	description?: string | null;
	latitude: number;
	longitude: number;
	priority?: IncidentPriority;
};
export type ClientIncidentUpdateRequest = {
	service_catalog_id?: string | null;
	title?: string | null;
	description?: string | null;
	latitude?: number | string | null;
	longitude?: number | string | null;
	address_text?: string | null;
	priority?: IncidentPriority | null;
};

export type ClientIncidentCancelRequest = {
	cancellation_reason?: string | null;
	cancellation_notes?: string | null;
};

export type ClientIncidentListQuery = IncidentListQuery;
export type ClientIncidentAiAnalysisListQuery = IncidentAiAnalysisListQuery;

export type ClientAssignmentListQuery = AssignmentListQuery;
export type ClientAssignmentTrackingEventListQuery = AssignmentTrackingEventListQuery;
export type ClientSessionListQuery = ListQuery<{
	session_status?: SessionStatus | "";
}>;

export type ClientNotificationListQuery = NotificationListQuery;
export type ClientNotificationDeviceListQuery = NotificationDeviceListQuery;

export interface ClientCurrentIncidentKpi {
	has_active_incident: boolean;
	incident_status: IncidentStatus | null;
	incident_code: string | null;
	service_name: string | null;
}

export interface ClientTopWorkshopKpiItem {
	name: string;
	efficiency: number;
}

export interface ClientDashboardKpis {
	current_incident: ClientCurrentIncidentKpi;
	top_workshops: ClientTopWorkshopKpiItem[];
	completed_cases: number;
	cancelled_cases: number;
	unattended_cases: number;
	total_requested_services: number;
}

export interface ClientServicesByTypeChartItem {
	name: string;
	value: number;
}

export interface ClientRequestedServicesTrendChartItem {
	date: string;
	requested: number;
}

export interface ClientCasesByStatusChartItem {
	status: string;
	value: number;
}

export interface ClientTopWorkshopChartItem {
	name: string;
	efficiency: number;
}

export interface ClientDashboardCharts {
	services_by_type: ClientServicesByTypeChartItem[];
	requested_services_trend: ClientRequestedServicesTrendChartItem[];
	cases_by_status: ClientCasesByStatusChartItem[];
	top_workshops: ClientTopWorkshopChartItem[];
}

export interface ClientOperationalDashboard {
	kpis: ClientDashboardKpis;
	charts: ClientDashboardCharts;
}

export interface ClientDashboardQuery {
	date_from?: string;
	date_to?: string;
}

export type ClientAssignmentListData = AssignmentListData;
export type ClientAssignmentDetail = AssignmentDetail;
export type ClientAssignmentTrackingEventListData = AssignmentTrackingEventListData;
export type ClientAssignmentTrackingEventDetail = AssignmentTrackingEventDetail;
export type ClientIncident = Incident;
export type ClientIncidentListData = IncidentListData;
export type ClientIncidentAiAnalysis = IncidentAiAnalysis;
export type ClientIncidentAiAnalysisListData = IncidentAiAnalysisListData;
export type ClientSession = Session;
export type ClientSessionListData = SessionListData;
export type ClientNotification = Notification;
export type ClientNotificationListData = NotificationListData;
export type ClientNotificationDevice = NotificationDevice;
export type ClientNotificationDeviceListData = NotificationDeviceListData;
export type ClientNotificationSummary = NotificationSummary;
export type ClientNotificationBulkActionData = NotificationBulkActionData;
export type ClientNotificationStatus = NotificationStatus;
export type ClientNotificationDevicePlatform = NotificationDevicePlatform;
export type ClientNotificationDeviceStatus = NotificationDeviceStatus;
