import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryButtonComponent } from './gallary-button/gallery-button.component';

@NgModule({
    imports     : [
        CommonModule,
    ],
    declarations: [
        GalleryButtonComponent,
    ],
    exports     : [
        CommonModule,
        GalleryButtonComponent,
    ],
})
export class SharedModule {
}
