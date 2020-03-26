import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { MaskEnum } from '../../model/mask.enum';
import { Pessoa } from '../../model/pessoa';
import { PessoaQuery } from '../../pessoa/state/pessoa.query';
import { PessoaService } from '../../pessoa/state/pessoa.service';
import {
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  catchError,
  debounceTime,
  delay,
  filter,
  finalize,
  map,
  startWith,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PessoaNovoQuickComponent } from '../../pessoa/pessoa-novo-quick/pessoa-novo-quick.component';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { DialogService } from '../../shared/dialog/dialog.service';
import { isUndefined } from 'is-what';
import { MatExpansionPanel } from '@angular/material/expansion';
import { SwipeActionsDirective } from '../../shared/swipe-actions/swipe-actions.directive';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from '../../model/pedido';
import { PedidoStatusEnum } from '../../model/pedido-status.enum';
import { PedidoItem } from '../../model/pedido-item';
import { PedidoService } from '../state/pedido.service';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { trackByFactory } from '../../util/util';
import { SnackBarService } from '../../shared/snack-bar/snack-bar.service';

const produtoIdExists: ValidatorFn = control => {
  const produtoIdControl = control?.parent?.get?.('produtoId');
  if (produtoIdControl) {
    return produtoIdControl.value ? null : { produtoIdNotExists: true };
  }
  return null;
};

const formGroupModel = () =>
  new FormGroup({
    codigo: new FormControl(null, [Validators.required, produtoIdExists]),
    descricao: new FormControl({ value: null, disabled: true }),
    observacao: new FormControl(),
    valorUnitario: new FormControl({ value: null, disabled: true }),
    quantidade: new FormControl(null, [Validators.required, Validators.min(0)]),
    valorTotal: new FormControl({ value: null, disabled: true }),
    produtoId: new FormControl(),
  });

@Component({
  selector: 'app-novo-pedido',
  templateUrl: './novo-pedido.component.html',
  styleUrls: ['./novo-pedido.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('items', [
      transition(':leave', [animate('250ms ease', style({ height: '0' }))]),
    ]),
  ],
})
export class NovoPedidoComponent implements OnInit, OnDestroy {
  constructor(
    private pessoaQuery: PessoaQuery,
    private pessoaService: PessoaService,
    private matDialog: MatDialog,
    private viewportScroller: ViewportScroller,
    @Inject(DOCUMENT) private document: Document,
    private dialogService: DialogService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBarService: SnackBarService,
    private pedidoService: PedidoService,
    private routerQuery: RouterQuery
  ) {}

  private _destroy$ = new Subject();

  @ViewChildren('matExpansionPanel')
  matExpansionPanels: QueryList<MatExpansionPanel>;

  masksEnum = MaskEnum;

  pessoa: Pessoa;

  celularControl = new FormControl();
  loadingPessoa = false;
  personNotFound = false;
  formProdutos: FormArray;
  saveDisabled$: Observable<boolean>;
  expanded = 0;

  pedidoSaving = false;

  trackByFormArray = trackByFactory<FormGroup>();

  afterExpand($index: number, swipe: SwipeActionsDirective): void {
    this.expanded = $index;
    swipe.updatePosition();
  }

  afterCollapse(swipe: SwipeActionsDirective): void {
    swipe.updatePosition();
  }

  onDeletePessoa(): void {
    this.dialogService
      .confirm({
        content: 'Deseja excluir também os produtos selecionados?',
        buttonConfirmar: 'Sim',
        buttonCancelar: 'Não',
      })
      .afterClosed()
      .pipe(
        take(1),
        filter(value => !isUndefined(value))
      )
      .subscribe(value => {
        if (value) {
          this.formProdutos.reset();
        }
        this.pessoa = null;
        this.celularControl.setValue(null);
        this.celularControl.enable();
        this.celularControl.markAsUntouched();
        this.celularControl.markAsPristine();
      });
  }

  addForm(): void {
    this.formProdutos.push(formGroupModel());
    this.matExpansionPanels.toArray()[this.expanded]?.close();
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
        this.celularControl.setErrors(null);
        this.celularControl.disable({ emitEvent: false });
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
            this.celularControl.disable({ emitEvent: false });
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
    } else {
      this.celularControl.disable({ emitEvent: false });
    }
  }

  deleteProduto(index: number): void {
    this.formProdutos.removeAt(index);
  }

  salvar(): void {
    if (this.formProdutos.invalid) {
      return;
    }
    this.pedidoSaving = true;
    this.pedidoService
      .postPedido({
        clienteId: this.pessoa.id,
        status: PedidoStatusEnum.pendente,
        pedidoItems: this.formProdutos.controls.map(group => {
          const {
            produtoId,
            quantidade,
            observacao,
          } = group.value as PedidoItem;
          return {
            produtoId,
            quantidade,
            observacao: observacao ?? '',
            total: group.get('valorTotal').value,
          };
        }),
      } as Pedido)
      .pipe(
        finalize(() => {
          this.pedidoSaving = false;
        })
      )
      .subscribe(pedido => {
        this.formProdutos = new FormArray([]);
        setTimeout(() => {
          this.addForm();
        });
        const snackBar = this.snackBarService.open(
          'Pedido salvo com sucesso!',
          'Visualizar'
        );
        // TODO visualizar pedido
        snackBar
          .onAction()
          .pipe(take(1))
          .subscribe(() => {
            this.router.navigate(['../', pedido.id], {
              relativeTo: this.activatedRoute,
            });
          });
      });
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
    this.formProdutos = new FormArray([formGroupModel()]);
    const celular = this.routerQuery.getQueryParams<string>('celular');

    if (celular) {
      this.celularControl.setValue(celular);
    }
    this.saveDisabled$ = this.formProdutos.statusChanges.pipe(
      delay(0),
      startWith('INVALID'),
      map(status => ['INVALID', 'PENDING'].includes(status))
    );
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
