import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PessoaQuery } from './state/pessoa.query';
import { WINDOW } from '../core/window.service';
import { Pessoa } from '../model/pessoa';
import { compareByFactory, trackByFactory } from '../util/util';
import { FormControl } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { MaskEnum } from '../model/mask.enum';
import { VirtualScrollerComponent } from 'ngx-virtual-scroller';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { RouteParamsEnum } from '../model/route-params.enum';
import { Subject } from 'rxjs';
import { PessoaService } from './state/pessoa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PessoaComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    public pessoaQuery: PessoaQuery,
    @Inject(WINDOW) public window: Window,
    private routerQuery: RouterQuery,
    private pessoaService: PessoaService,
    private router: Router
  ) {}

  private _destroy$ = new Subject();

  @ViewChild('virtualScroller')
  virtualScroller: VirtualScrollerComponent;

  viewPortItems: Pessoa[] = [];

  searchControl = new FormControl();
  search$ = this.searchControl.valueChanges.pipe(debounceTime(400));

  masksEnum = MaskEnum;

  idPessoaParam: number;

  comparePessoa = compareByFactory<Pessoa>('id');
  trackByPessoa = trackByFactory<Pessoa>('id');

  @HostListener('swiperight')
  navigateBack(): void {
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.idPessoaParam = +this.routerQuery.getQueryParams(
      RouteParamsEnum.idPessoa
    );
    this.searchControl.setValue(this.pessoaQuery.getSearchTerm());
    this.search$
      .pipe(takeUntil(this._destroy$))
      .subscribe(term => this.pessoaService.updateSearch(term));
  }

  ngAfterViewInit(): void {
    this.idPessoaParam = +this.routerQuery.getQueryParams(
      RouteParamsEnum.idPessoa
    );
    if (this.idPessoaParam) {
      // Set timeout para que a lista seja carregada antes de fazer o scroll
      setTimeout(() => {
        const item = this.virtualScroller.items.find(
          o => o.id === this.idPessoaParam
        );
        this.virtualScroller.scrollInto(item, true, -100);
      });
    }
    setTimeout(() => {
      this.searchControl.enable();
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
