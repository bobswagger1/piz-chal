import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaSummaryComponent } from './pizza-summary.component';

describe('PizzaSummaryComponent', () => {
  let component: PizzaSummaryComponent;
  let fixture: ComponentFixture<PizzaSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzaSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
