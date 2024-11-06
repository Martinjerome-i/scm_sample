import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriallistComponent } from './materiallist.component';

describe('MateriallistComponent', () => {
  let component: MateriallistComponent;
  let fixture: ComponentFixture<MateriallistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriallistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MateriallistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
