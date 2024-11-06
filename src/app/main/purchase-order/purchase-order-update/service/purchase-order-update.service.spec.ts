import { TestBed } from '@angular/core/testing';

import { PurchaseOrderUpdateService } from './purchase-order-update.service';

describe('PurchaseOrderUpdateService', () => {
  let service: PurchaseOrderUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseOrderUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
