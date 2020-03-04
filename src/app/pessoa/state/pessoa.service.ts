import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PessoaStore } from './pessoa.store';
import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pessoa } from '../../model/pessoa';
import { cacheableCustom } from '../../util/akita';
import { createInstanceHeaders } from '../../core/create-instance/create-instance.interceptor';

@Injectable({ providedIn: 'root' })
export class PessoaService {
  constructor(private pessoaStore: PessoaStore, private http: HttpClient) {}

  private target = 'pessoa';

  getAll(): Observable<Pessoa[]> {
    this.pessoaStore.setLoading(true);
    return cacheableCustom(
      this.pessoaStore,
      this.http
        .get<Pessoa[]>(`${this.target}/all`, {
          headers: createInstanceHeaders(Pessoa),
        })
        .pipe(
          tap(pessoas => {
            this.pessoaStore.set(pessoas);
          }),
          finalize(() => {
            this.pessoaStore.setLoading(false);
          })
        )
    );
  }

  getById(id: number): Observable<Pessoa> {
    return this.http
      .get<Pessoa>(`${this.target}/id/${id}`, {
        headers: createInstanceHeaders(Pessoa),
      })
      .pipe(
        tap(pessoa => {
          this.pessoaStore.upsert(pessoa.id, pessoa);
        })
      );
  }

  existsByCelular(celular: string, id?: number): Observable<boolean> {
    let params = new HttpParams({ fromObject: { celular } });
    if (id) params = params.append('id', '' + id);
    return this.http.get<boolean>(`${this.target}/exists/celular`, { params });
  }

  existsByEmail(email: string, id?: number): Observable<boolean> {
    let params = new HttpParams({ fromObject: { email } });
    if (id) params = params.append('id', '' + id);
    return this.http.get<boolean>(`${this.target}/exists/email`, { params });
  }

  postPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http
      .post<Pessoa>(this.target, pessoa, {
        headers: createInstanceHeaders(Pessoa),
      })
      .pipe(
        tap(createdPessoa => {
          this.pessoaStore.upsert(createdPessoa.id, createdPessoa);
        })
      );
  }

  patchPessoa(id: number, pessoa: Partial<Pessoa>): Observable<Pessoa> {
    this.pessoaStore.update(id, { loading: true });
    return this.http.patch<Pessoa>(`${this.target}/${id}`, pessoa).pipe(
      tap(() => {
        this.pessoaStore.update(id, { ...pessoa, loading: false });
      })
    );
  }

  getByCelular(celular: string): Observable<Pessoa> {
    const params = new HttpParams({ fromObject: { celular } });
    return this.http
      .get<Pessoa>(`${this.target}/celular`, { params })
      .pipe(
        tap(pessoa => {
          this.pessoaStore.upsert(pessoa.id, pessoa);
        })
      );
  }
}
