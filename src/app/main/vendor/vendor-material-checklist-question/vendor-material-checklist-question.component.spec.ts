import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorMaterialChecklistQuestionComponent } from './vendor-material-checklist-question.component';

describe('VendorMaterialChecklistQuestionComponent', () => {
  let component: VendorMaterialChecklistQuestionComponent;
  let fixture: ComponentFixture<VendorMaterialChecklistQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorMaterialChecklistQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorMaterialChecklistQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
