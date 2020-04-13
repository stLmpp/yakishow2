import { animate, group, query, style, transition } from '@angular/animations';

const ms = '100ms';
const type = 'ease-out';

export const routeInitialStyle = query(
  ':enter, :leave',
  style({
    position: 'fixed',
    width: '100%',
    height: '100%',
  }),
  {
    optional: true,
  }
);

export const RTL = (right: string, left: string) => {
  return transition(`${right} => ${left}`, [
    routeInitialStyle,
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
    routeInitialStyle,
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
    routeInitialStyle,
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

export const BTT = (bottom: string, top: string) => {
  return transition(`${bottom} => ${top}`, [
    routeInitialStyle,
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateY(100%)' }),
          animate(`${ms} ${type}`, style({ transform: 'translateY(0%)' })),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateY(0%)' }),
          animate(`${ms} ${type}`, style({ transform: 'translateY(-100%)' })),
        ],
        { optional: true }
      ),
    ]),
  ]);
};

export const SLIDE_X = (left: string, right: string) => {
  return [LTR(left, right), RTL(right, left)];
};

export const SLIDE_Y = (top: string, bottom: string) => {
  return [TTB(top, bottom), BTT(bottom, top)];
};
