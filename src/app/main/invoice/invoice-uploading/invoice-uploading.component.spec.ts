import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceUploadingComponent } from './invoice-uploading.component';

describe('InvoiceUploadingComponent', () => {
  let component: InvoiceUploadingComponent;
  let fixture: ComponentFixture<InvoiceUploadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceUploadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceUploadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
