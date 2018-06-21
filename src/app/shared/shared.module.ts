import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorButtonComponent } from './behavior-button/behavior-button.component';
import { TitleComponent } from './title/title.component';
import { PlusPaginationComponent } from './pagination/plus-pagination.component';
import { PopupWindowComponent } from './popup-window/popup-window.component';

@NgModule({
    imports     : [
        CommonModule,
    ],
    declarations: [
        BehaviorButtonComponent,
        TitleComponent,
        PlusPaginationComponent,
        PopupWindowComponent
    ],
    exports     : [
        CommonModule,
        BehaviorButtonComponent,
        TitleComponent,
        PlusPaginationComponent,
        PopupWindowComponent
    ],
})
export class SharedModule {
}
