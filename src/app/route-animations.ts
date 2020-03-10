import { animate, group, query, style, transition } from '@angular/animations';

const ms = '150ms';
const type = 'ease-out';

export const RTL = (right: string, left: string) => {
  return transition(`${right} => ${left}`, [
    query(
      ':enter, :leave',
      style({
        position: 'fixed',
        width: '90%',
        height: '90%',
      }),
      {
        optional: true,
      }
    ),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateX(-100%)' }),
          animate(`${ms} ${type}`, style({ transform: 'translateX(0%)' })),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate(`${ms} ${type}`, style({ transform: 'translateX(100%)' })),
        ],
        { optional: true }
      ),
    ]),
  ]);
};

export const LTR = (left: string, right: string) => {
  return transition(`${left} => ${right}`, [
    query(
      ':enter, :leave',
      style({
        position: 'fixed',
        width: '90%',
        height: '90%',
      }),
      {
        optional: true,
      }
    ),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateX(100%)' }),
          animate(`${ms} ${type}`, style({ transform: 'translateX(0%)' })),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate(`${ms} ${type}`, style({ transform: 'translateX(-100%)' })),
        ],
        { optional: true }
      ),
    ]),
  ]);
};

export const TTB = (top: string, bottom: string) => {
  return transition(`${top} => ${bottom}`, [
    query(
      ':enter, :leave',
      style({
        position: 'fixed',
        width: '90%',
        height: '90%',
      }),
      {
        optional: true,
      }
    ),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateY(-100%)' }),
          animate(`${ms} ${type}`, style({ transform: 'translateY(0%)' })),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateY(0%)' }),
          animate(`${ms} ${type}`, style({ transform: 'translateY(100%)' })),
        ],
        { optional: true }
      ),
    ]),
  ]);
};

export const SLIDE_X = (left: string, right: string) => {
  return [LTR(left, right), RTL(right, left)];
};
