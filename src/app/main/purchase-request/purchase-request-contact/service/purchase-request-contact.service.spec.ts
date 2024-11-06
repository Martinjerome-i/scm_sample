import { TestBed } from '@angular/core/testing';

import { PurchaseRequestContactService } from './purchase-request-contact.service';

describe('PurchaseRequestContactService', () => {
  let service: PurchaseRequestContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseRequestContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
