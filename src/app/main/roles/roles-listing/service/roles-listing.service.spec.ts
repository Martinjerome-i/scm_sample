import { TestBed } from '@angular/core/testing';

import { RolesListingService } from './roles-listing.service';

describe('RolesListingService', () => {
  let service: RolesListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
