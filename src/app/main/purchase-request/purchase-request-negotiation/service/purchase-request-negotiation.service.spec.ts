import { TestBed } from '@angular/core/testing';

import { PurchaseRequestNegotiationService } from './purchase-request-negotiation.service';

describe('PurchaseRequestNegotiationService', () => {
  let service: PurchaseRequestNegotiationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseRequestNegotiationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
