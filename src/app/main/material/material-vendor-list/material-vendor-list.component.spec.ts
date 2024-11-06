import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialVendorListComponent } from './material-vendor-list.component';

describe('MaterialVendorListComponent', () => {
  let component: MaterialVendorListComponent;
  let fixture: ComponentFixture<MaterialVendorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialVendorListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialVendorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
