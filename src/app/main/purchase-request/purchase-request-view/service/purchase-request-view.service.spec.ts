import { TestBed } from '@angular/core/testing';

import { PurchaseRequestViewService } from './purchase-request-view.service';

describe('PurchaseRequestViewService', () => {
  let service: PurchaseRequestViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseRequestViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
