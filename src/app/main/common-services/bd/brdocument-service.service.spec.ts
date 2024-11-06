import { TestBed } from '@angular/core/testing';

import { BRDocumentService } from './brdocument-service.service';

describe('BRDocumentService', () => {
  let service: BRDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BRDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
