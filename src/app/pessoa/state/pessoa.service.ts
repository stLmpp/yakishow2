import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PessoaStore } from './pessoa.store';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pessoa } from '../../model/pessoa';
import { cacheableCustom } from '../../util/akita';
import { setLoading } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class PessoaService {
  constructor(private pessoaStore: PessoaStore, private http: HttpClient) {}

  private target = 'pessoa';

  getAll(): Observable<Pessoa[]> {
    return cacheableCustom(
      this.pessoaStore,
      this.http.get<Pessoa[]>(`${this.target}/all`).pipe(
        setLoading(this.pessoaStore),
        tap(pessoas => {
          this.pessoaStore.set(pessoas);
        })
      )
    );
  }

  getById(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.target}/id/${id}`).pipe(
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
    return this.http.post<Pessoa>(this.target, pessoa).pipe(
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

  getByTermAutocomplete(
    term: string,
    withPedido?: boolean
  ): Observable<Pessoa[]> {
    const params = new HttpParams({
      fromObject: { term, withPedido: '' + withPedido },
    });
    return this.http.get<Pessoa[]>(`${this.target}/search/autocomplete`, {
      params,
    });
  }
}
