import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialRequirementsAddComponent } from './material-requirements-add.component';

describe('MaterialRequirementsAddComponent', () => {
  let component: MaterialRequirementsAddComponent;
  let fixture: ComponentFixture<MaterialRequirementsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialRequirementsAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialRequirementsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
