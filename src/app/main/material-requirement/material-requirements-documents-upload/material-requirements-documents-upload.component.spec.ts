import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialRequirementsDocumentsUploadComponent } from './material-requirements-documents-upload.component';

describe('MaterialRequirementsDocumentsUploadComponent', () => {
  let component: MaterialRequirementsDocumentsUploadComponent;
  let fixture: ComponentFixture<MaterialRequirementsDocumentsUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialRequirementsDocumentsUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialRequirementsDocumentsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
