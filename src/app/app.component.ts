import { Component } from '@angular/core';
import { routerTransition } from '@app/core/animations';

@Component({
    selector   : 'plus-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
    animations : [routerTransition],
})
export class AppComponent {
    public constructor() {
    }
}
