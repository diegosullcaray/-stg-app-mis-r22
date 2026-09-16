import {
  //sequence,
  trigger,
  animate,
  style,
  //group,
  //query,
  transition,
  //animateChild,
  state,
  animation,
  useAnimation,
  //stagger,
} from '@angular/animations';
/*
[
    trigger('slideInOut', [
      state('in', style({
        overflow: 'hidden',
        height: '*',
        width: '300px'
      })),
      state('out', style({
        opacity: '0',
        overflow: 'hidden',
        height: '0px',
        width: '0px'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
*/

export const bottomAlert = [
  trigger('bottomAlert', [
    state('closed', style({
      height: '0',
      width: '100%',
      overflow: 'hidden'
    })),
    state('open', style({
      height: '50px',
      width: '100%',
      overflow: 'hidden'
    })),
    transition('* => *', animate('400ms ease-in-out'))
  ])
];

const reusable = animation(
  [
    style({
      opacity: '{{opacity}}',
      transform: 'scale({{scale}}) translate3d({{x}}, {{y}}, {{z}})',
    }),
    animate('{{duration}} {{delay}} cubic-bezier(0.0, 0.0, 0.2, 1)', style('*')),
  ],
  {
    params: {
      duration: '200ms',
      delay: '0ms',
      opacity: '0',
      scale: '1',
      x: '0',
      y: '0',
      z: '0',
    },
  }
);

export const baseAnimations = [
  trigger('animate', [transition('void => *', [useAnimation(reusable)])]),

  trigger('fadeInOut', [
    state(
      '0',
      style({
        opacity: 0,
        display: 'none',
      })
    ),
    state(
      '1',
      style({
        opacity: 1,
        display: 'block',
      })
    ),
    transition('0 => 1', animate('300ms')),
    transition('1 => 0', animate('300ms')),
  ]),
];
