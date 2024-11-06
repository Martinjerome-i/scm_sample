import { TestBed } from '@angular/core/testing';

import { ChecklistTemplateService } from './checklist-template.service';

describe('ChecklistTemplateService', () => {
  let service: ChecklistTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecklistTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
