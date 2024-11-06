import { TestBed } from '@angular/core/testing';

import { RequestDocumentListingService } from './request-document-listing.service';

describe('RequestDocumentListingService', () => {
  let service: RequestDocumentListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestDocumentListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
