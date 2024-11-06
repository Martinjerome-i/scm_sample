import { TestBed } from '@angular/core/testing';

import { BusinessRequirementsAddService } from './business-requirements-add.service';

describe('BusinessRequirementsAddService', () => {
  let service: BusinessRequirementsAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessRequirementsAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
