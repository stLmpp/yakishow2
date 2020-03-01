import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ProdutoService } from './state/produto.service';
import { ProdutoQuery } from './state/produto.query';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoItemComponent } from './produto-item/produto-item.component';
import { Produto } from '../model/produto';
import { trackByFactory } from '../util/util';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProdutoComponent implements OnInit, OnDestroy {
  constructor(
    private produtoService: ProdutoService,
    public produtoQuery: ProdutoQuery,
    private matDialog: MatDialog
  ) {}

  private _destroy$ = new Subject();

  searchControl = new FormControl();

  search$: Observable<string> = this.searchControl.valueChanges.pipe(
    debounceTime(400)
  );

  trackByProduto = trackByFactory<Produto>('id');

  openModalProduto(data?: Produto): void {
    this.matDialog.open(ProdutoItemComponent, { data });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
