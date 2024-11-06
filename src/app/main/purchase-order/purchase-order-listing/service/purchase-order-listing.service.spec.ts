import { TestBed } from '@angular/core/testing';

import { PurchaseOrderListingService } from './purchase-order-listing.service';

describe('PurchaseOrderListingService', () => {
  let service: PurchaseOrderListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseOrderListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
