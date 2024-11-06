import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialaddComponent } from './materialadd.component';

describe('MaterialaddComponent', () => {
  let component: MaterialaddComponent;
  let fixture: ComponentFixture<MaterialaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialaddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
