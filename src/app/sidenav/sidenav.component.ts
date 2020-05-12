import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { SidenavService } from './sidenav.service';
import { slideX } from '../shared/animations';
import { Observable } from 'rxjs';
import { trackByFactory } from '../util/util';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit {
  constructor(public sidenavService: SidenavService) {}

  trackByMenu = trackByFactory<Sidenav>('title');

  ngOnInit(): void {}
}
