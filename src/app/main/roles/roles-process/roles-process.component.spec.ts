import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesProcessComponent } from './roles-process.component';

describe('RolesProcessComponent', () => {
  let component: RolesProcessComponent;
  let fixture: ComponentFixture<RolesProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RolesProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
