import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ResourceActionsMenu } from "./resource-actions-menu";

describe("ResourceActionsMenu", () => {
	let component: ResourceActionsMenu;
	let fixture: ComponentFixture<ResourceActionsMenu>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ResourceActionsMenu],
		}).compileComponents();

		fixture = TestBed.createComponent(ResourceActionsMenu);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
