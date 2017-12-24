import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBordComponent } from './order-bord.component';

describe('OrderBordComponent', () => {
  let component: OrderBordComponent;
  let fixture: ComponentFixture<OrderBordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
