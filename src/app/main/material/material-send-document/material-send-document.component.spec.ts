import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialSendDocumentComponent } from './material-send-document.component';

describe('MaterialSendDocumentComponent', () => {
  let component: MaterialSendDocumentComponent;
  let fixture: ComponentFixture<MaterialSendDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialSendDocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialSendDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
