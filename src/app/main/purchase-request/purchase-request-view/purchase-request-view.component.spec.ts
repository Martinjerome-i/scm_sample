import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestViewComponent } from './purchase-request-view.component';

describe('PurchaseRequestViewComponent', () => {
  let component: PurchaseRequestViewComponent;
  let fixture: ComponentFixture<PurchaseRequestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseRequestViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
