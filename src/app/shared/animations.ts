import {
  animate,
  AnimationTriggerMetadata,
  style,
  transition,
  trigger,
} from '@angular/animations';

export type DirectionX = 'RTL' | 'LTR';
export type DirectionY = 'TTB' | 'BTT';

export function slideX(directionX: DirectionX): AnimationTriggerMetadata {
  let translateOut = 'translateX(-100%)';
  if (directionX === 'LTR') {
    translateOut = 'translateX(100%)';
  }
  return trigger('slideInOut', [
    transition(':enter', [
      style({ transform: translateOut }),
      animate('200ms ease-in', style({ transform: 'translateX(0%)' })),
    ]),
    transition(':leave', [
      animate('200ms ease-in', style({ transform: translateOut })),
    ]),
  ]);
}

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('200ms ease-in-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [animate('200ms ease-in-out', style({ opacity: 0 }))]),
]);
