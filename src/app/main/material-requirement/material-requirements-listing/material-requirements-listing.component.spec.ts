import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialRequirementsListingComponent } from './material-requirements-listing.component';

describe('MaterialRequirementsListingComponent', () => {
  let component: MaterialRequirementsListingComponent;
  let fixture: ComponentFixture<MaterialRequirementsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialRequirementsListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialRequirementsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
