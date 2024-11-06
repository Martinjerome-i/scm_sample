import { TestBed } from '@angular/core/testing';

import { VendorNegotiationService } from './vendor-negotiation.service';

describe('VendorNegotiationService', () => {
  let service: VendorNegotiationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorNegotiationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
