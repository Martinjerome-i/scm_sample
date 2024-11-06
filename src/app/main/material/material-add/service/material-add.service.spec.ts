import { TestBed } from '@angular/core/testing';

import { MaterialAddService } from './material-add.service';

describe('MaterialAddService', () => {
  let service: MaterialAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
