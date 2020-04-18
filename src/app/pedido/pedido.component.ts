import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PedidoComponent implements OnInit {
  constructor(private router: Router) {}

  @HostListener('swiperight')
  navigateBack(): void {
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {}
}
