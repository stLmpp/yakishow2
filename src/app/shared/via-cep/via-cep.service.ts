import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViaCEP } from '../../model/via-cep';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ViaCepService {
  constructor(private http: HttpClient) {}

  getEndereco(cep: string): Observable<ViaCEP> {
    return this.http.get<ViaCEP>(`external/cep-api/${cep}`);
  }
}
