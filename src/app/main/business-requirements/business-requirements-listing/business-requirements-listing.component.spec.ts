import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessRequirementsListingComponent } from './business-requirements-listing.component';

describe('BusinessRequirementsListingComponent', () => {
  let component: BusinessRequirementsListingComponent;
  let fixture: ComponentFixture<BusinessRequirementsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessRequirementsListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessRequirementsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
