import { TestBed } from '@angular/core/testing';

import { MaterialVendorDocumentsService } from './material-vendor-documents.service';

describe('MaterialVendorDocumentsService', () => {
  let service: MaterialVendorDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialVendorDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
