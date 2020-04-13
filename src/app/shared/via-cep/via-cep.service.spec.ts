import { TestBed } from '@angular/core/testing';

import { ViaCepService } from './via-cep.service';
import { HttpClientModule } from '@angular/common/http';

describe('ViaCepService', () => {
  let service: ViaCepService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ViaCepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
