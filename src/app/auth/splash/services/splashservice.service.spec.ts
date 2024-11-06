import { TestBed } from '@angular/core/testing';

import { SplashserviceService } from './splashservice.service';

describe('SplashserviceService', () => {
  let service: SplashserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SplashserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
