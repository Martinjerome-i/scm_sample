import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestNegotiationComponent } from './purchase-request-negotiation.component';

describe('PurchaseRequestNegotiationComponent', () => {
  let component: PurchaseRequestNegotiationComponent;
  let fixture: ComponentFixture<PurchaseRequestNegotiationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseRequestNegotiationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseRequestNegotiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
