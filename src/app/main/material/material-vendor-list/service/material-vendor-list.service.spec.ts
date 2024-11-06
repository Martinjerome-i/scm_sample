import { TestBed } from '@angular/core/testing';

import { MaterialVendorListService } from './material-vendor-list.service';

describe('MaterialVendorListService', () => {
  let service: MaterialVendorListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialVendorListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
