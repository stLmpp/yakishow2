import {
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PedidoStatusEnum } from '../../model/pedido-status.enum';
import { MasksEnum } from '../../model/masks.enum';
import { Pessoa } from '../../model/pessoa';
import { PessoaQuery } from '../../pessoa/state/pessoa.query';
import { PessoaService } from '../../pessoa/state/pessoa.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {
  catchError,
  debounceTime,
  filter,
  finalize,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PessoaNovoQuickComponent } from '../../pessoa/pessoa-novo-quick/pessoa-novo-quick.component';
import { Produto } from '../../model/produto';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { ViewportScrollPosition } from '@angular/cdk/scrolling';
import { WINDOW } from '../../core/window.service';

const formGroupModel = () =>
  new FormGroup({
    codigo: new FormControl(),
    descricao: new FormControl({ value: null, disabled: true }),
    observacao: new FormControl(),
    valorUnitario: new FormControl({ value: null, disabled: true }),
    quantidade: new FormControl(),
    valorTotal: new FormControl({ value: null, disabled: true }),
  });

@Component({
  selector: 'app-novo-pedido',
  templateUrl: './novo-pedido.component.html',
  styleUrls: ['./novo-pedido.component.scss'],
})
export class NovoPedidoComponent implements OnInit, OnDestroy {
  constructor(
    private pessoaQuery: PessoaQuery,
    private pessoaService: PessoaService,
    private matDialog: MatDialog,
    private viewportScroller: ViewportScroller,
    @Inject(DOCUMENT) private document: Document
  ) {}

  private _destroy$ = new Subject();

  pedidoStatusEnum = PedidoStatusEnum;
  masksEnum = MasksEnum;
  pessoa: Pessoa;

  celularControl = new FormControl();
  loadingPessoa = false;
  personNotFound = false;

  formProdutos: FormArray;

  /*@HostListener('window:beforeunload', ['$event'])
  @HostListener('window:pagehide', ['$event'])
  onPageUnload($event: BeforeUnloadEvent): BeforeUnloadEvent {
    $event.preventDefault();
    $event.returnValue = 'Unsaved modifications';
    console.log($event);
    return $event;
  }*/

  addForm(): void {
    this.formProdutos.push(formGroupModel());
    setTimeout(() => {
      this.viewportScroller.scrollToPosition([
        0,
        this.document.body.scrollHeight,
      ]);
    });
  }

  get formGroupArray(): FormGroup[] {
    return this.formProdutos.controls as FormGroup[];
  }

  criarPessoa(): void {
    this.matDialog
      .open(PessoaNovoQuickComponent, {
        data: this.celularControl.value,
      })
      .afterClosed()
      .pipe<Pessoa>(take(1))
      .subscribe(pessoa => {
        this.pessoa = pessoa;
      });
  }

  findPessoaByCelular(celular: string): void {
    this.pessoa = this.pessoaQuery.getByCelular(celular);
    if (!this.pessoa) {
      this.loadingPessoa = true;
      this.pessoaService
        .getByCelular(celular)
        .pipe(
          tap(pessoa => {
            this.pessoa = pessoa;
            this.celularControl.setErrors(null);
            this.personNotFound = false;
          }),
          finalize(() => {
            this.loadingPessoa = false;
          }),
          catchError(error => {
            this.personNotFound = true;
            this.celularControl.setErrors({ personNotFund: true });
            return throwError(error);
          })
        )
        .subscribe();
    }
  }

  initSub(): void {
    this.celularControl.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        debounceTime(400),
        filter(() => this.celularControl.valid)
      )
      .subscribe(celular => {
        this.findPessoaByCelular(celular);
      });
  }

  ngOnInit(): void {
    this.initSub();
    this.formProdutos = new FormArray(
      Array.from({ length: 1 }).map(() => formGroupModel())
    );
    setTimeout(() => {
      this.celularControl.setValue('11950887717');
    }, 250);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
