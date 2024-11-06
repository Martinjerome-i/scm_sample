import { TestBed } from '@angular/core/testing';

import { BusinessRequirementsService } from './business-requirements.service';

describe('BusinessRequirementsService', () => {
  let service: BusinessRequirementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessRequirementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
