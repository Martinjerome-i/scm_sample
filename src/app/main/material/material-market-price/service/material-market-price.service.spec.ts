import { TestBed } from '@angular/core/testing';

import { MaterialMarketPriceService } from './material-market-price.service';

describe('MaterialMarketPriceService', () => {
  let service: MaterialMarketPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialMarketPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
