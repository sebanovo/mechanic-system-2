import { Component, inject, signal, viewChild } from "@angular/core";
import { toast } from "@spartan-ng/brain/sonner";

import {
	IncidentOfferEntry,
	IncidentOfferDetail,
	IncidentOfferResponseMode,
	getIncidentOfferId,
} from "../../../entities/incident-offer/model";
import { IncidentOfferApi } from "../../../entities/incident-offer/api/incident-offer.api";
import { RespondIncidentOfferForm } from "../../../features/incident-offer/respond-incident-offer/respond-incident-offer-form";
import {
	AdminPageShell,
	PageHeader,
	SideDrawer,
} from "../../../shared/custom-components";
import { getApiErrorMessage } from "../../../shared/api";
import {
	IncidentOfferRespondAction,
	TenantIncidentOffersList,
} from "../../../widgets/tenant/tenant-incident-offers-list/tenant-incident-offers-list";

@Component({
	selector: "app-tenant-offers-page",
	standalone: true,
	imports: [
		AdminPageShell,
		PageHeader,
		SideDrawer,
		RespondIncidentOfferForm,
		TenantIncidentOffersList,
	],
	templateUrl: "./tenant-offers.page.html",
})
export class TenantOffersPage {
	private readonly incidentOfferApi = inject(IncidentOfferApi);
	protected readonly respondingItem = signal<IncidentOfferDetail | null>(null);
	protected readonly responseMode = signal<IncidentOfferResponseMode>("ACCEPT");

	private readonly list = viewChild(TenantIncidentOffersList);

	protected openResponseDrawer(action: IncidentOfferRespondAction): void {
		this.responseMode.set(action.mode);

		if ("offer" in action.item) {
			this.respondingItem.set(action.item);
			return;
		}

		const offerId = getIncidentOfferId(action.item as IncidentOfferEntry);

		if (!offerId) {
			toast.error("No se pudo abrir la oferta", {
				description: "La oferta no tiene un identificador válido.",
			});
			return;
		}

		this.respondingItem.set(null);

		this.incidentOfferApi.getCurrentTenantOfferById(offerId).subscribe({
			next: detail => {
				this.respondingItem.set(detail);
			},
			error: error => {
				const message = getApiErrorMessage(error);

				toast.error("No se pudo abrir la oferta", {
					description: message,
				});
			},
		});
	}

	protected closeResponseDrawer(): void {
		this.respondingItem.set(null);
	}

	protected onResponded(item: IncidentOfferDetail): void {
		this.respondingItem.set(null);
		this.list()?.patchItem(item);
		this.list()?.loadStats();
	}
}
