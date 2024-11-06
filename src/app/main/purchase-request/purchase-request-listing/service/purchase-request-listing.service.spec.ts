import { TestBed } from '@angular/core/testing';

import { PurchaseRequestListingService } from './purchase-request-listing.service';

describe('PurchaseRequestListingService', () => {
  let service: PurchaseRequestListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseRequestListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
