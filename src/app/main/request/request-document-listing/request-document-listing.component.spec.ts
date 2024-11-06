import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDocumentListingComponent } from './request-document-listing.component';

describe('RequestDocumentListingComponent', () => {
  let component: RequestDocumentListingComponent;
  let fixture: ComponentFixture<RequestDocumentListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestDocumentListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestDocumentListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
