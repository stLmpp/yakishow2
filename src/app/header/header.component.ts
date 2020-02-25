import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../core/loading/loading.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { SidenavService } from '../sidenav/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('inOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)' })),
      ]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  constructor(
    public loadingService: LoadingService,
    public sidenavService: SidenavService
  ) {}

  ngOnInit(): void {}
}
