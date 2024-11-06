import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorMaterialChecklistComponent } from './vendor-material-checklist.component';

describe('VendorMaterialChecklistComponent', () => {
  let component: VendorMaterialChecklistComponent;
  let fixture: ComponentFixture<VendorMaterialChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorMaterialChecklistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorMaterialChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
