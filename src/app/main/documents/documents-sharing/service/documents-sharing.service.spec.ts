import { TestBed } from '@angular/core/testing';

import { DocumentsSharingService } from './documents-sharing.service';

describe('DocumentsSharingService', () => {
  let service: DocumentsSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentsSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
