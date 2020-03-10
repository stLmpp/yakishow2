import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipeActionComponent } from './swipe-action.component';

describe('SwipeActionsComponent', () => {
  let component: SwipeActionComponent;
  let fixture: ComponentFixture<SwipeActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SwipeActionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwipeActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
