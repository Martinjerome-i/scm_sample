import { TestBed } from '@angular/core/testing';

import { MaterialVendorNegotiationService } from './material-vendor-negotiation.service';

describe('MaterialVendorNegotiationService', () => {
  let service: MaterialVendorNegotiationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialVendorNegotiationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
