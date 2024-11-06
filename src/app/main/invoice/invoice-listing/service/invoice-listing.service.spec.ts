import { TestBed } from '@angular/core/testing';

import { InvoiceListingService } from './invoice-listing.service';

describe('InvoiceListingService', () => {
  let service: InvoiceListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
