import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueNewCardComponent } from './issue-new-card.component';

describe('IssueNewCardComponent', () => {
  let component: IssueNewCardComponent;
  let fixture: ComponentFixture<IssueNewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueNewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueNewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
