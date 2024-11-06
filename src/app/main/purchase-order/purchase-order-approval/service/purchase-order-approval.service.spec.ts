import { TestBed } from '@angular/core/testing';

import { PurchaseOrderApprovalService } from './purchase-order-approval.service';

describe('PurchaseOrderApprovalService', () => {
  let service: PurchaseOrderApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseOrderApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
