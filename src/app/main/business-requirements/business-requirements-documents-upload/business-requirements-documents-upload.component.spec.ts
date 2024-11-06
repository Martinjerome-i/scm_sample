import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessRequirementsDocumentsUploadComponent } from './business-requirements-documents-upload.component';

describe('BusinessRequirementsDocumentsUploadComponent', () => {
  let component: BusinessRequirementsDocumentsUploadComponent;
  let fixture: ComponentFixture<BusinessRequirementsDocumentsUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessRequirementsDocumentsUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessRequirementsDocumentsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
