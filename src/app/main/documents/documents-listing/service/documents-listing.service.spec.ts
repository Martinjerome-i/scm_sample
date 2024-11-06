import { TestBed } from '@angular/core/testing';

import { DocumentsListingService } from './documents-listing.service';

describe('DocumentsListingService', () => {
  let service: DocumentsListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentsListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
