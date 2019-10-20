import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusOrdersComponent } from './status-orders.component';

describe('StatusOrdersComponent', () => {
  let component: StatusOrdersComponent;
  let fixture: ComponentFixture<StatusOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
