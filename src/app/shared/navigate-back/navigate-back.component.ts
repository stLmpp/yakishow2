import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RouteHistoryService } from '../history/route-history.service';
import { RouteHistoryQuery } from '../history/route-history.query';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navigate-back',
  templateUrl: './navigate-back.component.html',
  styleUrls: ['./navigate-back.component.scss'],
})
export class NavigateBackComponent implements OnInit, OnDestroy {
  constructor(
    private routeHistoryService: RouteHistoryService,
    private routeHistoryQuery: RouteHistoryQuery
  ) {}

  @Input() floating: boolean;
  @Input() bottom: boolean;
  @Input() top: boolean;
  @Input() left: boolean;
  @Input() right: boolean;
  @Input() miniFab: boolean;

  hasHistory$: Observable<boolean>;

  navigateBack(): void {
    this.routeHistoryService.back();
  }

  ngOnInit(): void {
    this.routeHistoryService.init();
    this.hasHistory$ = this.routeHistoryQuery
      .selectAll()
      .pipe(map(({ length }) => length > 1));
  }
  ngOnDestroy(): void {
    this.routeHistoryService.destroy();
  }
}
