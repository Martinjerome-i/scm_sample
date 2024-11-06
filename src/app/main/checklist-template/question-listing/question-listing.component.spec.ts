import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionListingComponent } from './question-listing.component';

describe('QuestionListingComponent', () => {
  let component: QuestionListingComponent;
  let fixture: ComponentFixture<QuestionListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
