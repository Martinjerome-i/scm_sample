import { TestBed } from '@angular/core/testing';

import { MRDocumentService } from './mrdocument.service';

describe('MRDocumentService', () => {
  let service: MRDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MRDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
