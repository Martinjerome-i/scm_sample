import { TestBed } from '@angular/core/testing';

import { MaterialRequirementService } from './material-requirement.service';

describe('MaterialRequirementService', () => {
  let service: MaterialRequirementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialRequirementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
