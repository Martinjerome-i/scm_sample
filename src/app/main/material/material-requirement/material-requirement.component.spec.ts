import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialRequirementComponent } from './material-requirement.component';

describe('MaterialRequirementComponent', () => {
  let component: MaterialRequirementComponent;
  let fixture: ComponentFixture<MaterialRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialRequirementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
