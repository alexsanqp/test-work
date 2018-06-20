import { Component, ViewChild } from '@angular/core';
import { PhotosService, PhotosRepository } from '@app/core';
import { IPhoto } from './core/interfaces';
import { Observable } from 'rxjs/index';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
})
export class AppComponent {
    public title: string;

    public constructor(
        private s: PhotosService,
        private photo: PhotosRepository,
    ) {
        this.photo.findAll();

        this.title = 'A gallery containing the most beautiful images';
    }

/*    handleClick(e) {
        let clickTimer;

        const delay              = 400;
        const clickTime          = Date.now();
        const timeSinceLastClick = clickTime - lastClickTime;

        if (timeSinceLastClick > delay) {
            clickTimer = setTimeout(function () {

            }, delay);
        } else {
            clearTimeout(clickTimer);
        }
    }*/
}
