import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  pluck,
  switchMap,
} from 'rxjs/operators';
import { isAfter, isBefore, isValid } from 'date-fns';
import { PessoaService } from '../../pessoa/state/pessoa.service';
import { Pessoa } from '../../model/pessoa';
import { trackByFactory } from '../../util/util';
import { MaskEnum } from '../../model/mask.enum';

@Component({
  selector: 'app-pedidos-pesquisar',
  templateUrl: './pedidos-pesquisa.component.html',
  styleUrls: ['./pedidos-pesquisa.component.scss'],
})
export class PedidosPesquisaComponent implements OnInit {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private pessoaService: PessoaService
  ) {}

  form = new FormGroup({
    dataCriacao: new FormControl({ value: null, disabled: true }),
    dataFinalizado: new FormControl({ value: null, disabled: true }),
    cliente: new FormControl(),
    clienteId: new FormControl(),
  });

  touchUi$: Observable<boolean>;

  clientes$: Observable<Pessoa[]>;
  clientesLoading = false;

  maskEnum = MaskEnum;

  trackByCliente = trackByFactory<Pessoa>('id');

  filterBefore = (data: Date | null): boolean => {
    const dataFinalizado = this.form.get('dataFinalizado').value;
    return isValid(dataFinalizado) ? isBefore(data, dataFinalizado) : true;
  };

  filterAfter = (data: Date | null): boolean => {
    const dataCriacao = this.form.get('dataCriacao').value;
    return isValid(dataCriacao) ? isAfter(data, dataCriacao) : true;
  };

  selectCliente(cliente: Pessoa): void {
    this.form.get('clienteId').setValue(cliente.id);
  }

  ngOnInit(): void {
    this.clientes$ = this.form.get('cliente').valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(200),
      switchMap(cliente => {
        this.clientesLoading = true;
        return this.pessoaService.getByTermAutocomplete(cliente).pipe(
          finalize(() => {
            this.clientesLoading = false;
          })
        );
      })
    );
    this.touchUi$ = this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .pipe(pluck('matches'));
  }
}
