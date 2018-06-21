import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, GalleryComponent, PageNotFoundComponent } from '@app/feature';
import { PhotoResolve } from '@app/core';

const routes: Routes = [
    {
        path     : 'home',
        component: HomeComponent,
    },
    {
        path     : 'gallery',
        component: GalleryComponent,
        resolve  : {
            photos: PhotoResolve,
        },
    },
    {
        path      : '',
        redirectTo: '/home',
        pathMatch : 'full',
    },
    {
        path     : '**',
        component: PageNotFoundComponent,
    },
];

@NgModule({
    imports  : [RouterModule.forRoot(routes)],
    exports  : [RouterModule],
    providers: [PhotoResolve],
})
export class AppRoutingModule {
}
