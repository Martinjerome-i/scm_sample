import { TestBed } from '@angular/core/testing';

import { MaterialVendorQualificationService } from './material-vendor-qualification.service';

describe('MaterialVendorQualificationService', () => {
  let service: MaterialVendorQualificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialVendorQualificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
