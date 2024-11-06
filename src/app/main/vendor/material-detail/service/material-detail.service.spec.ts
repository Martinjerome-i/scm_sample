import { TestBed } from '@angular/core/testing';

import { MaterialDetailService } from './material-detail.service';

describe('MaterialDetailService', () => {
  let service: MaterialDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
