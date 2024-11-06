import { TestBed } from '@angular/core/testing';

import { CommonDropdownService } from './common-dropdown.service';

describe('CommonDropdownService', () => {
  let service: CommonDropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonDropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
