import { TestBed } from '@angular/core/testing';

import { RolesAddService } from './roles-add.service';

describe('RolesAddService', () => {
  let service: RolesAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
