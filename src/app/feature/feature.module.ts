import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from '@app/shared';

@NgModule({
    imports     : [
        CommonModule,
        RouterModule,
        SharedModule,
    ],
    declarations: [
        HomeComponent,
        GalleryComponent,
        PageNotFoundComponent,
    ],
})
export class FeatureModule {
}
