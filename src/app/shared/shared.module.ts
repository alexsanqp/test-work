import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorButtonComponent } from './behavior-button/behavior-button.component';
import { TitleComponent } from './title/title.component';

@NgModule({
    imports     : [
        CommonModule,
    ],
    declarations: [
        BehaviorButtonComponent,
        TitleComponent,
    ],
    exports     : [
        CommonModule,
        BehaviorButtonComponent,
        TitleComponent
    ],
})
export class SharedModule {
}
