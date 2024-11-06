import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialRequirementsBrComponent } from './material-requirements-br.component';

describe('MaterialRequirementsBrComponent', () => {
  let component: MaterialRequirementsBrComponent;
  let fixture: ComponentFixture<MaterialRequirementsBrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialRequirementsBrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialRequirementsBrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
