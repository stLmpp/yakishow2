import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../sidenav/sidenav.service';
import { AuthQuery } from '../auth/state/auth.query';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    public sidenavService: SidenavService,
    public authQuery: AuthQuery
  ) {}

  ngOnInit(): void {}
}
