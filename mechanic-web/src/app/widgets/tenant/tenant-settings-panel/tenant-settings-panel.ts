import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	OnInit,
	output,
	signal,
} from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	lucideBuilding,
	lucideCalendar,
	lucideClock,
	lucideGlobe,
	lucideMail,
	lucideMapPin,
	lucidePhone,
	lucideSettings,
	lucideShieldCheck,
	lucideStar,
	lucideWrench,
} from "@ng-icons/lucide";
import { toast } from "@spartan-ng/brain/sonner";
import { forkJoin } from "rxjs";

import { ProviderApi } from "../../../entities/provider/api/provider.api";
import {
	formatProviderRating,
	formatProviderResponseScore,
	getProviderEmergencyLabel,
	getProviderOperationalText,
	getProviderTypeLabel,
	ProviderProfile,
} from "../../../entities/provider/model";
import { ProviderOperationalStatusBadge } from "../../../entities/provider/ui/provider-operational-status-badge/provider-operational-status-badge";
import { TenantApi } from "../../../entities/tenant/api/tenant.api";
import {
	formatTenantDate,
	getTenantContactLabel,
	getTenantKindLabel,
	getTenantLocationLabel,
	Tenant,
	TenantDetail,
	TenantProfile,
	TenantSettings,
} from "../../../entities/tenant/model";
import { TenantKindBadge } from "../../../entities/tenant/ui/tenant-kind-badge/tenant-kind-badge";
import { TenantStatusBadge } from "../../../entities/tenant/ui/tenant-status-badge/tenant-status-badge";
import { getApiErrorMessage } from "../../../shared/api";
import {
	ErrorState,
	LoadingState,
	PageSection,
	StatCard,
} from "../../../shared/custom-components";

@Component({
	selector: "app-tenant-settings-panel",
	standalone: true,
	imports: [
		NgIcon,
		PageSection,
		LoadingState,
		ErrorState,
		StatCard,
		TenantStatusBadge,
		TenantKindBadge,
		ProviderOperationalStatusBadge,
	],
	providers: [
		provideIcons({
			lucideBuilding,
			lucideCalendar,
			lucideClock,
			lucideGlobe,
			lucideMail,
			lucideMapPin,
			lucidePhone,
			lucideSettings,
			lucideShieldCheck,
			lucideStar,
			lucideWrench,
		}),
	],
	templateUrl: "./tenant-settings-panel.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantSettingsPanel implements OnInit {
	private readonly tenantApi = inject(TenantApi);
	private readonly providerApi = inject(ProviderApi);

	readonly editProfileClicked = output<void>();
	readonly editSettingsClicked = output<void>();
	readonly editProviderClicked = output<void>();
	readonly createNetworkClicked = output<void>();

	protected readonly tenantDetail = signal<TenantDetail | null>(null);
	protected readonly provider = signal<ProviderProfile | null>(null);

	protected readonly isLoading = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly tenant = computed<Tenant | null>(
		() => this.tenantDetail()?.tenant ?? null
	);

	protected readonly profile = computed<TenantProfile | null>(
		() => this.tenantDetail()?.profile ?? null
	);

	protected readonly settings = computed<TenantSettings | null>(
		() => this.tenantDetail()?.settings ?? null
	);

	ngOnInit(): void {
		this.load();
	}

	load(): void {
		this.isLoading.set(true);
		this.errorMessage.set(null);

		forkJoin({
			tenantDetail: this.tenantApi.getCurrentTenantDetail(),
			provider: this.providerApi.getCurrentProviderProfile(),
		}).subscribe({
			next: response => {
				this.tenantDetail.set(response.tenantDetail);
				this.provider.set(response.provider);
				this.isLoading.set(false);
			},
			error: error => {
				const message = getApiErrorMessage(error);

				this.errorMessage.set(message);
				this.isLoading.set(false);

				toast.error("No se pudo cargar la configuración del tenant", {
					description: message,
				});
			},
		});
	}

	updateProfile(profile: TenantProfile): void {
		this.tenantDetail.update(current =>
			current
				? {
						...current,
						profile,
					}
				: current
		);
	}

	updateSettings(settings: TenantSettings): void {
		this.tenantDetail.update(current =>
			current
				? {
						...current,
						settings,
					}
				: current
		);
	}

	updateProvider(provider: ProviderProfile): void {
		this.provider.set(provider);
	}

	protected tenantKindLabel(): string {
		const tenant = this.tenant();

		return tenant ? getTenantKindLabel(tenant.tenant_kind) : "Sin tipo";
	}

	protected tenantCreatedAtLabel(): string {
		return formatTenantDate(this.tenant()?.created_at ?? null);
	}

	protected tenantUpdatedAtLabel(): string {
		return formatTenantDate(this.tenant()?.updated_at ?? null);
	}

	protected profileContactLabel(): string {
		return getTenantContactLabel(this.profile());
	}

	protected profileLocationLabel(): string {
		return getTenantLocationLabel(this.profile());
	}

	protected providerTypeLabel(): string {
		const provider = this.provider();

		return provider ? getProviderTypeLabel(provider.provider_type) : "Sin tipo";
	}

	protected providerEmergencyLabel(): string {
		return getProviderEmergencyLabel(this.provider());
	}

	protected providerOperationalText(): string {
		return getProviderOperationalText(this.provider());
	}

	protected providerRatingLabel(): string {
		return formatProviderRating(this.provider());
	}

	protected providerResponseScoreLabel(): string {
		return formatProviderResponseScore(this.provider());
	}
}
