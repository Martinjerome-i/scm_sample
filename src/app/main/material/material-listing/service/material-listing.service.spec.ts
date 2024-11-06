import { TestBed } from '@angular/core/testing';

import { MaterialListingService } from './material-listing.service';

describe('MaterialListingService', () => {
  let service: MaterialListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
