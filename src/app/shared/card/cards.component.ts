import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-cards',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./cards.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
