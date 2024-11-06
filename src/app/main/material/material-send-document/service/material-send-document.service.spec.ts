import { TestBed } from '@angular/core/testing';

import { MaterialSendDocumentService } from './material-send-document.service';

describe('MaterialSendDocumentService', () => {
  let service: MaterialSendDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialSendDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
