import { Component } from "@angular/core";

import { PublicCta } from "../../../widgets/public/public-cta/public-cta";
import { PublicFooter } from "../../../widgets/public/public-footer/public-footer";
import { PublicHeader } from "../../../widgets/public/public-header/public-header";
import { PublicHero } from "../../../widgets/public/public-hero/public-hero";
import { PublicHowItWorks } from "../../../widgets/public/public-how-it-works/public-how-it-works";
import { PublicServices } from "../../../widgets/public/public-services/public-services";
import { PublicWorkshops } from "../../../widgets/public/public-workshops/public-workshops";

@Component({
	selector: "app-public-home-page",
	standalone: true,
	imports: [
		PublicHeader,
		PublicHero,
		PublicHowItWorks,
		PublicServices,
		PublicWorkshops,
		PublicCta,
		PublicFooter,
	],
	templateUrl: "./public-home.page.html",
})
export class PublicHomePage {}
