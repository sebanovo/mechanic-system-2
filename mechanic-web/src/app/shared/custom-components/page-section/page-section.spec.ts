import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PageSection } from "./page-section";

describe("PageSection", () => {
	let component: PageSection;
	let fixture: ComponentFixture<PageSection>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PageSection],
		}).compileComponents();

		fixture = TestBed.createComponent(PageSection);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
