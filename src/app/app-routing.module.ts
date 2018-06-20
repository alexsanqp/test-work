import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, GalleryComponent, PageNotFoundComponent } from '@app/feature';

const routes: Routes = [
    {
        path     : 'home',
        component: HomeComponent,
    },
    {
        path     : 'gallery',
        component: GalleryComponent,
    },
    {
        path      : '',
        redirectTo: '/home',
        pathMatch : 'full',
    },
    {
        path: '**',
        component: PageNotFoundComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
