import { TestBed } from '@angular/core/testing';

import { MateriallistService } from './materiallist.service';

describe('MateriallistService', () => {
  let service: MateriallistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriallistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
