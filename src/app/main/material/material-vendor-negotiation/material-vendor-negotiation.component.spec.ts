import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialVendorNegotiationComponent } from './material-vendor-negotiation.component';

describe('MaterialVendorNegotiationComponent', () => {
  let component: MaterialVendorNegotiationComponent;
  let fixture: ComponentFixture<MaterialVendorNegotiationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialVendorNegotiationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialVendorNegotiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
