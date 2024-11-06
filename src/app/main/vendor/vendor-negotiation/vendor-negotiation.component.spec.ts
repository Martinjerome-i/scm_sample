import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorNegotiationComponent } from './vendor-negotiation.component';

describe('VendorNegotiationComponent', () => {
  let component: VendorNegotiationComponent;
  let fixture: ComponentFixture<VendorNegotiationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorNegotiationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorNegotiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
