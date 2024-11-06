import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorNegotiationListingComponent } from './vendor-negotiation-listing.component';

describe('VendorNegotiationListingComponent', () => {
  let component: VendorNegotiationListingComponent;
  let fixture: ComponentFixture<VendorNegotiationListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorNegotiationListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorNegotiationListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
