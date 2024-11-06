import { TestBed } from '@angular/core/testing';

import { InvoiceUploadingService } from './invoice-uploading.service';

describe('InvoiceUploadingService', () => {
  let service: InvoiceUploadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceUploadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
