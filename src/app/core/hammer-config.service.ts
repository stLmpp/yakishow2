import { HammerGestureConfig } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement): any {
    return new Hammer(element, {
      touchAction: 'pan-y',
    });
  }
}
