import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
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
  distinctUntilChanged,
  filter,
  finalize,
  map,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Observable, of, Subject, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PessoaNovoQuickComponent } from '../../pessoa/pessoa-novo-quick/pessoa-novo-quick.component';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { DialogService } from '../../shared/dialog/dialog.service';
import { isUndefined } from 'is-what';
import { MatExpansionPanel } from '@angular/material/expansion';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from '../../model/pedido';
import { PedidoStatusEnum } from '../../model/pedido-status.enum';
import { PedidoItem } from '../../model/pedido-item';
import { PedidoService } from '../state/pedido.service';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { trackByFactory } from '../../util/util';
import { SnackBarService } from '../../shared/snack-bar/snack-bar.service';
import { RouteParamsEnum } from '../../model/route-params.enum';
import { MaskApplierService } from 'ngx-mask';
import { SwipeActionsDirective } from '../../shared/swipe-actions/swipe-actions.directive';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoPedidoComponent implements OnInit, OnDestroy, AfterViewInit {
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
    private routerQuery: RouterQuery,
    private maskApplierService: MaskApplierService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  private _destroy$ = new Subject();

  @ViewChildren('matExpansionPanel') matExpansionPanelsRef: QueryList<
    MatExpansionPanel
  >;
  @ViewChildren('swipeActions') swipeActionsRef: QueryList<
    SwipeActionsDirective
  >;
  @ViewChild('clienteRef') clienteRef: ElementRef<HTMLInputElement>;

  pessoa: Pessoa;

  clientes$: Observable<Pessoa[]>;

  maskEnum = MaskEnum;

  clienteControl = new FormControl(null, [Validators.required]);
  loadingPessoa = false;
  formProdutos: FormArray;
  saveDisabled$: Observable<boolean>;
  expanded = 0;

  pedidoSaving = false;

  trackByFormArray = trackByFactory<FormGroup>();
  trackByCliente = trackByFactory<Pessoa>('id');

  selectCliente(cliente: Pessoa): void {
    this.pessoa = cliente;
    this.clienteControl.disable({ emitEvent: false });
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
          this.formProdutos = new FormArray([formGroupModel()]);
        }
        this.pessoa = null;
        this.clienteControl.setValue(null);
        this.clienteControl.enable();
        this.clienteControl.markAsUntouched();
        this.clienteControl.markAsPristine();
        this.changeDetectorRef.markForCheck();
      });
  }

  addForm(): void {
    this.formProdutos.push(formGroupModel());
    setTimeout(() => {
      this.matExpansionPanelsRef.last?.open();
    });
  }

  get formGroupArray(): FormGroup[] {
    return this.formProdutos.controls as FormGroup[];
  }

  criarPessoa(data: string): void {
    this.matDialog
      .open(PessoaNovoQuickComponent, { data })
      .afterClosed()
      .pipe<Pessoa>(take(1))
      .subscribe(pessoa => {
        if (pessoa) {
          this.pessoa = pessoa;
          this.clienteControl.setValue(this.getPessoaInfo(this.pessoa));
          this.clienteControl.disable({ emitEvent: false });
        }
      });
  }

  deleteProduto(index: number): void {
    const close = !!this.swipeActionsRef.toArray()[index + 1]?.isOpened;
    this.formProdutos.removeAt(index);
    if (!close) {
      this.swipeActionsRef.toArray()[index]?.close();
    }
  }

  salvar(): void {
    if (this.formProdutos.invalid) {
      return;
    }
    this.pedidoSaving = true;
    this.pedidoService
      .postPedido(
        new Pedido({
          clienteId: this.pessoa.id,
          status: PedidoStatusEnum.pendente,
          pedidoItems: this.formProdutos.controls.map((group: FormGroup) => {
            const {
              produtoId,
              quantidade,
              observacao,
              valorTotal: total,
            } = group.getRawValue();
            return new PedidoItem({
              produtoId,
              quantidade,
              observacao: observacao ?? '',
              total,
            });
          }),
        })
      )
      .pipe(
        finalize(() => {
          this.pedidoSaving = false;
          this.changeDetectorRef.markForCheck();
        }),
        catchError(err => {
          this.snackBarService.error(
            err?.message ?? 'Erro ao tentar salvar o pedido!'
          );
          return throwError(err);
        })
      )
      .subscribe(pedido => {
        const backUrl = this.routerQuery.getQueryParams<string>(
          RouteParamsEnum.backUrl
        );
        if (backUrl && backUrl === '/pedidos/dia') {
          this.navigateBack();
        } else {
          this.formProdutos = new FormArray([formGroupModel()]);
          this.formProdutos.reset();
          this.matExpansionPanelsRef.first.close();
          this.snackBarService
            .success('Pedido salvo com sucesso!', 'Visualizar')
            .onAction()
            .pipe(take(1))
            .subscribe(() => {
              this.router.navigate(['../', pedido.id], {
                relativeTo: this.activatedRoute,
              });
            });
        }
      });
  }

  private getPessoaInfo({ celular }: Pessoa): string {
    return this.maskApplierService.applyMask(celular, MaskEnum.celular);
  }

  @HostListener('swiperight')
  navigateBack(): void {
    const backUrl = this.routerQuery.getQueryParams<string>(
      RouteParamsEnum.backUrl
    );
    if (backUrl) {
      this.router.navigateByUrl(backUrl);
    } else {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
  }

  initSub(): void {
    this.clientes$ = this.clienteControl.valueChanges.pipe(
      takeUntil(this._destroy$),
      distinctUntilChanged(),
      tap(() => (this.loadingPessoa = true)),
      debounceTime(200),
      switchMap(cliente => {
        if (!cliente) {
          this.loadingPessoa = false;
          return of([]);
        } else {
          return this.pessoaService
            .getByTermAutocomplete(cliente)
            .pipe(finalize(() => (this.loadingPessoa = false)));
        }
      })
    );
  }

  ngOnInit(): void {
    this.formProdutos = new FormArray([formGroupModel()]);
    this.initSub();
    const idPessoa = +this.routerQuery.getQueryParams<string>(
      RouteParamsEnum.idPessoa
    );
    if (idPessoa) {
      this.loadingPessoa = true;
      this.clienteControl.disable();
      this.pessoaService
        .getById(idPessoa)
        .pipe(
          finalize(() => {
            this.loadingPessoa = false;
          })
        )
        .subscribe(pessoa => {
          this.pessoa = pessoa;
          this.clienteControl.setValue(this.getPessoaInfo(pessoa));
        });
    }
    this.saveDisabled$ = this.formProdutos.statusChanges.pipe(
      delay(0),
      startWith('INVALID'),
      map(status => ['INVALID', 'PENDING'].includes(status))
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const term = this.routerQuery.getQueryParams<string>('term');
      if (term) {
        this.clienteControl.setValue(term);
        this.clienteRef.nativeElement.focus();
      }
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
