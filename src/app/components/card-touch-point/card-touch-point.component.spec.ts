import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTouchPointComponent } from './card-touch-point.component';

describe('CardTouchPointComponent', () => {
  let component: CardTouchPointComponent;
  let fixture: ComponentFixture<CardTouchPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardTouchPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTouchPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
