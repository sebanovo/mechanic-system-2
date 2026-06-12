import { AuthTenant } from "../../tenant/model";
import { User, UserType } from "../../user/model";

export type TokenPair = {
	access_token: string;
	access_expires_at: string;
	refresh_token?: string;
	refresh_expires_at?: string;
};

export type UserSession = {
	id: string;
	user_id: string;
	tenant_id: string | null;
	session_status: string;
	device_type: string | null;
	device_name: string | null;
	ip_address: string | null;
	user_agent: string | null;
	last_seen_at: string | null;
	expires_at: string | null;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
};

export type AuthContext = {
	user: User;
	user_type: UserType;
	tenant_id: string | null;
	current_tenant: AuthTenant | null;
	available_tenants: AuthTenant[];
	requires_tenant_selection: boolean;
	session: UserSession;
	tokens: TokenPair | null;
};

export type LoginRequest = {
	email: string;
	password: string;
	device_type?: string | null;
	device_name?: string | null;
};

export type SelectTenantRequest = {
	tenant_id: string;
};
