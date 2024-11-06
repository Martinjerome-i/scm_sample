import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestListingComponent } from './request-listing.component';

describe('RequestListingComponent', () => {
  let component: RequestListingComponent;
  let fixture: ComponentFixture<RequestListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
