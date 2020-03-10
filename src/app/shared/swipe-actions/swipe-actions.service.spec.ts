import { TestBed } from '@angular/core/testing';

import { SwipeActionsService } from './swipe-actions.service';

describe('SwipeActionsService', () => {
  let service: SwipeActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwipeActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
