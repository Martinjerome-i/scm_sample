import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialVendorDocumentsComponent } from './material-vendor-documents.component';

describe('MaterialVendorDocumentsComponent', () => {
  let component: MaterialVendorDocumentsComponent;
  let fixture: ComponentFixture<MaterialVendorDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialVendorDocumentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialVendorDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
