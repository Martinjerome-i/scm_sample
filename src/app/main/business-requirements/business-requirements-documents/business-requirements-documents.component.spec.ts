import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessRequirementsDocumentsComponent } from './business-requirements-documents.component';

describe('BusinessRequirementsDocumentsComponent', () => {
  let component: BusinessRequirementsDocumentsComponent;
  let fixture: ComponentFixture<BusinessRequirementsDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessRequirementsDocumentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessRequirementsDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
