import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollToTopComponent } from './scroll-to-top.component';
import { WINDOW_PROVIDERS } from '../../core/window.service';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { RouterTestingModule } from '@angular/router/testing';

describe('ScrollToTopComponent', () => {
  let component: ScrollToTopComponent;
  let fixture: ComponentFixture<ScrollToTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScrollToTopComponent],
      imports: [AkitaNgRouterStoreModule.forRoot(), RouterTestingModule],
      providers: [...WINDOW_PROVIDERS],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollToTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
