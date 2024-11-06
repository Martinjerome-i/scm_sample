import { TestBed } from '@angular/core/testing';

import { MaterialaddService } from './materialadd.service';

describe('MaterialaddService', () => {
  let service: MaterialaddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialaddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
