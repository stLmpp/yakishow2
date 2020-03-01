import { TestBed } from '@angular/core/testing';

import { CreateInstanceInterceptor } from './create-instance.interceptor';

describe('CreateInstanceInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [CreateInstanceInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: CreateInstanceInterceptor = TestBed.inject(
      CreateInstanceInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
