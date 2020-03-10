import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SidenavService } from './sidenav.service';
import { slideX } from '../shared/animations';
import { Observable } from 'rxjs';

export interface Sidenav {
  routerLink: any[] | string;
  auth?: Observable<boolean>;
  icon: string;
  title: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [slideX('RTL')],
  encapsulation: ViewEncapsulation.None,
})
export class SidenavComponent implements OnInit {
  constructor(public sidenavService: SidenavService) {}

  ngOnInit(): void {}
}
