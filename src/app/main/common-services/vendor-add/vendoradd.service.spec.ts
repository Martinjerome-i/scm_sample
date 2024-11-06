import { TestBed } from '@angular/core/testing';

import { VendoraddService } from './vendoradd.service';

describe('VendoraddserviceService', () => {
  let service: VendoraddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendoraddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
