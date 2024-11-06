import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestListingComponent } from './purchase-request-listing.component';

describe('PurchaseRequestListingComponent', () => {
  let component: PurchaseRequestListingComponent;
  let fixture: ComponentFixture<PurchaseRequestListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseRequestListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseRequestListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
