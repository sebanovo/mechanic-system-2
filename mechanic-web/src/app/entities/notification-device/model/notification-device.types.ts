export type NotificationDevicePlatform = "ANDROID" | "IOS" | "WEB";

export type NotificationDeviceStatus =
	| "ACTIVE"
	| "INACTIVE"
	| "REVOKED"
	| "EXPIRED";

export type NotificationDevice = {
	id: string;
	user_id: string;
	device_token: string;
	platform: NotificationDevicePlatform;
	device_name: string | null;
	app_version: string | null;
	os_version: string | null;
	status: NotificationDeviceStatus;
	last_seen_at: string | null;
	created_at: string;
	updated_at: string;
};

export type NotificationDeviceCreateRequest = {
	device_token: string;
	platform: NotificationDevicePlatform;
	device_name?: string;
	app_version?: string;
	os_version?: string;
};

export type NotificationDevicePagination = {
	page: number;
	page_size: number;
	total: number;
	total_pages: number;
	has_next?: boolean;
	has_previous?: boolean;
};

export type NotificationDeviceListData = {
	items: NotificationDevice[];
	pagination: NotificationDevicePagination;
};

export type NotificationDeviceListQuery = {
	page?: number;
	page_size?: number;
	status?: NotificationDeviceStatus | "";
};
