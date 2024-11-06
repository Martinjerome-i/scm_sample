import { TestBed } from '@angular/core/testing';

import { RequestUpdateService } from './request-update.service';

describe('RequestUpdateService', () => {
  let service: RequestUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
