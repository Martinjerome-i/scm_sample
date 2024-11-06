import { TestBed } from '@angular/core/testing';

import { VendorMaterialService } from './vendor-material.service';

describe('VendorMaterialService', () => {
  let service: VendorMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
