import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-swipe-action',
  templateUrl: './swipe-action.component.html',
  styleUrls: ['./swipe-action.component.scss'],
})
export class SwipeActionComponent implements OnInit {
  constructor() {}

  @ViewChild('button')
  matButton: MatButton;

  @Input() icon: string;
  @Input() hide: boolean;
  @Input() color: ThemePalette;
  @HostBinding('style.top.px') @Input() top: number;
  @HostBinding('style.right.px') @Input() right: number;
  @HostBinding('style.height.px') @Input() height: number;
  @HostBinding('style.width.px') @Input() width: number;
  @HostBinding('style.z-index') @Input() zIndex = 0;
  @HostBinding('style.display')
  get display(): string {
    return this.hide ? 'none' : 'flex';
  }

  @Output() clicked = new EventEmitter<MouseEvent>();

  ngOnInit(): void {}
}
