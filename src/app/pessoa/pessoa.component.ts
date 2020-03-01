import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PessoaQuery } from './state/pessoa.query';
import { WINDOW } from '../core/window.service';
import { Pessoa } from '../model/pessoa';
import { compareByFactory, trackByFactory } from '../util/util';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MasksEnum } from '../model/masks.enum';
import { VirtualScrollerComponent } from 'ngx-virtual-scroller';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { RouterParamsEnum } from '../model/router-params.enum';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { FormsState } from '../model/forms-state';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss'],
})
export class PessoaComponent implements OnInit, AfterViewInit {
  constructor(
    public pessoaQuery: PessoaQuery,
    @Inject(WINDOW) public window: Window,
    private routerQuery: RouterQuery,
    private akitaNgFormsManager: AkitaNgFormsManager<FormsState>
  ) {}

  @ViewChild('virtualScroller')
  virtualScroller: VirtualScrollerComponent;

  viewPortItems: Pessoa[] = [];

  searchControl = new FormControl();
  search$ = this.searchControl.valueChanges.pipe(debounceTime(400));

  masksEnum = MasksEnum;

  idPessoaParam: number;

  comparePessoa = compareByFactory<Pessoa>('id');
  trackByPessoa = trackByFactory<Pessoa>('id');

  ngOnInit(): void {
    this.idPessoaParam = +this.routerQuery.getQueryParams(
      RouterParamsEnum.idPessoa
    );
    if (this.idPessoaParam) {
      this.akitaNgFormsManager.upsert('searchPessoa', this.searchControl);
    }
  }

  ngAfterViewInit(): void {
    this.idPessoaParam = +this.routerQuery.getQueryParams(
      RouterParamsEnum.idPessoa
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
  }
}
