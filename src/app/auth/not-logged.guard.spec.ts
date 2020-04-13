import { TestBed } from '@angular/core/testing';

import { NotLoggedGuard } from './not-logged.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('NotLoggedGuard', () => {
  let guard: NotLoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    guard = TestBed.inject(NotLoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
