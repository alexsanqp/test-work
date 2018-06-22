import { animate, state, style, transition, trigger } from '@angular/animations';

export const heightAnimation = trigger('heightAnimation', [
    state('false', style({
        height: 0,
        overflow: 'hidden'
    })),
    state('true', style({
        height: '*',
        overflow: 'visible'
    })),
    transition('* => *', animate(250))
]);
