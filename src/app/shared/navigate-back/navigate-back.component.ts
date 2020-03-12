import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigate-back',
  templateUrl: './navigate-back.component.html',
  styleUrls: ['./navigate-back.component.scss'],
})
export class NavigateBackComponent implements OnInit {
  constructor(private router: Router) {}

  @Input() floating: boolean;
  @Input() bottom: boolean;
  @Input() top: boolean;
  @Input() left: boolean;
  @Input() right: boolean;

  navigateBack(): void {}

  ngOnInit(): void {}
}
