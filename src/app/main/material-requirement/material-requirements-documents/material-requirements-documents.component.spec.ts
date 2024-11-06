import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialRequirementsDocumentsComponent } from './material-requirements-documents.component';

describe('MaterialRequirementsDocumentsComponent', () => {
  let component: MaterialRequirementsDocumentsComponent;
  let fixture: ComponentFixture<MaterialRequirementsDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialRequirementsDocumentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialRequirementsDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
