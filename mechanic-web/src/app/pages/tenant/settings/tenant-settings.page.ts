import { Component, signal, viewChild } from "@angular/core";

import { ProviderProfile } from "../../../entities/provider/model";
import {
	Tenant,
	TenantProfile,
	TenantSettings,
} from "../../../entities/tenant/model";
import { UpdateProviderProfileForm } from "../../../features/provider/update-provider-profile/update-provider-profile-form";
import { CreateTenantNetworkForm } from "../../../features/tenant/create-tenant-network/create-tenant-network-form";
import { UpdateTenantProfileForm } from "../../../features/tenant/update-tenant-profile/update-tenant-profile-form";
import { UpdateTenantSettingsForm } from "../../../features/tenant/update-tenant-settings/update-tenant-settings-form";
import {
	AdminPageShell,
	PageHeader,
	SideDrawer,
} from "../../../shared/custom-components";
import { TenantSettingsPanel } from "../../../widgets/tenant/tenant-settings-panel/tenant-settings-panel";

@Component({
	selector: "app-tenant-settings-page",
	standalone: true,
	imports: [
		AdminPageShell,
		PageHeader,
		SideDrawer,
		TenantSettingsPanel,
		UpdateTenantProfileForm,
		UpdateTenantSettingsForm,
		UpdateProviderProfileForm,
		CreateTenantNetworkForm,
	],
	templateUrl: "./tenant-settings.page.html",
})
export class TenantSettingsPage {
	protected readonly showProfileDrawer = signal(false);
	protected readonly showSettingsDrawer = signal(false);
	protected readonly showProviderDrawer = signal(false);
	protected readonly showNetworkDrawer = signal(false);

	protected readonly currentProfile = signal<TenantProfile | null>(null);
	protected readonly currentSettings = signal<TenantSettings | null>(null);
	protected readonly currentProvider = signal<ProviderProfile | null>(null);

	private readonly panel = viewChild(TenantSettingsPanel);

	protected openProfileDrawer(): void {
		const panel = this.panel();

		this.currentProfile.set(panel ? panel["profile"]() : null);
		this.showProfileDrawer.set(true);
	}

	protected closeProfileDrawer(): void {
		this.showProfileDrawer.set(false);
	}

	protected openSettingsDrawer(): void {
		const panel = this.panel();

		this.currentSettings.set(panel ? panel["settings"]() : null);
		this.showSettingsDrawer.set(true);
	}

	protected closeSettingsDrawer(): void {
		this.showSettingsDrawer.set(false);
	}

	protected openProviderDrawer(): void {
		const panel = this.panel();

		this.currentProvider.set(panel ? panel["provider"]() : null);
		this.showProviderDrawer.set(true);
	}

	protected closeProviderDrawer(): void {
		this.showProviderDrawer.set(false);
	}

	protected openNetworkDrawer(): void {
		this.showNetworkDrawer.set(true);
	}

	protected closeNetworkDrawer(): void {
		this.showNetworkDrawer.set(false);
	}

	protected onProfileUpdated(profile: TenantProfile): void {
		this.showProfileDrawer.set(false);
		this.panel()?.updateProfile(profile);
	}

	protected onSettingsUpdated(settings: TenantSettings): void {
		this.showSettingsDrawer.set(false);
		this.panel()?.updateSettings(settings);
	}

	protected onProviderUpdated(provider: ProviderProfile): void {
		this.showProviderDrawer.set(false);
		this.panel()?.updateProvider(provider);
	}

	protected onNetworkCreated(_: Tenant): void {
		this.showNetworkDrawer.set(false);
		this.panel()?.load();
	}
}
