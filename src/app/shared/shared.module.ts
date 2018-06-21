import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorButtonComponent } from './behavior-button/behavior-button.component';
import { TitleComponent } from './title/title.component';
import { PlusPaginationComponent } from './pagination/plus-pagination.component';

@NgModule({
    imports     : [
        CommonModule,
    ],
    declarations: [
        BehaviorButtonComponent,
        TitleComponent,
        PlusPaginationComponent
    ],
    exports     : [
        CommonModule,
        BehaviorButtonComponent,
        TitleComponent,
        PlusPaginationComponent
    ],
})
export class SharedModule {
}
