import { Component } from '@angular/core';
import { PhotosService, PhotosRepository } from '@app/core';

@Component({
    selector   : 'plus-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
})
export class AppComponent {

    public constructor(
        private s: PhotosService,
        private photo: PhotosRepository,
    ) {
        this.photo.findAll();
    }
}
