import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialMarketPriceComponent } from './material-market-price.component';

describe('MaterialMarketPriceComponent', () => {
  let component: MaterialMarketPriceComponent;
  let fixture: ComponentFixture<MaterialMarketPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialMarketPriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialMarketPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
