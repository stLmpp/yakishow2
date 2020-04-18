import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ProdutoService } from './state/produto.service';
import { ProdutoQuery } from './state/produto.query';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoItemComponent } from './produto-item/produto-item.component';
import { Produto } from '../model/produto';
import { trackByFactory } from '../util/util';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { RouteParamsEnum } from '../model/route-params.enum';
import { ScrollService } from '../shared/scroll/scroll.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdutoComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private produtoService: ProdutoService,
    public produtoQuery: ProdutoQuery,
    private matDialog: MatDialog,
    private routerQuery: RouterQuery,
    private scrollService: ScrollService,
    private router: Router
  ) {}

  private _destroy$ = new Subject();

  @ViewChildren('produtosRef', { read: ElementRef }) produtosRef: QueryList<
    ElementRef
  >;

  idProduto: number;
  searchControl = new FormControl();

  search$: Observable<string> = this.searchControl.valueChanges.pipe(
    debounceTime(400)
  );

  trackByProduto = trackByFactory<Produto>('id');

  @HostListener('swiperight')
  navigateBack(): void {
    this.router.navigate(['/home']);
  }

  openModalProduto(data?: Produto): void {
    this.matDialog.open(ProdutoItemComponent, { data });
  }

  ngOnInit(): void {
    this.idProduto = +this.routerQuery.getQueryParams<string>(
      RouteParamsEnum.idProduto
    );
  }

  ngAfterViewInit(): void {
    if (this.idProduto) {
      setTimeout(() => {
        this.scrollService.scrollIntoViewOffset(
          this.produtosRef.find(o => +o.nativeElement.id === this.idProduto),
          -100
        );
      });
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
