import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestContactComponent } from './purchase-request-contact.component';

describe('PurchaseRequestContactComponent', () => {
  let component: PurchaseRequestContactComponent;
  let fixture: ComponentFixture<PurchaseRequestContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseRequestContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseRequestContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
