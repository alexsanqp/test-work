import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorButtonComponent } from './behavior-button/behavior-button.component';

@NgModule({
    imports     : [
        CommonModule,
    ],
    declarations: [
        BehaviorButtonComponent,
    ],
    exports     : [
        CommonModule,
        BehaviorButtonComponent,
    ],
})
export class SharedModule {
}
