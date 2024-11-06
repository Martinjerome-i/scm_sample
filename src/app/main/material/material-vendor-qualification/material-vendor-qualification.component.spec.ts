import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialVendorQualificationComponent } from './material-vendor-qualification.component';

describe('MaterialVendorQualificationComponent', () => {
  let component: MaterialVendorQualificationComponent;
  let fixture: ComponentFixture<MaterialVendorQualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialVendorQualificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialVendorQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
