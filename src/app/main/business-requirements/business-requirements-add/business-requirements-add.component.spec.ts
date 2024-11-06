import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessRequirementsAddComponent } from './business-requirements-add.component';

describe('BusinessRequirementsAddComponent', () => {
  let component: BusinessRequirementsAddComponent;
  let fixture: ComponentFixture<BusinessRequirementsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessRequirementsAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessRequirementsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
