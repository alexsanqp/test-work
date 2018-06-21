import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotosRepository } from '@app/core';

@Component({
    selector   : 'plus-home',
    templateUrl: './home.component.html',
    styleUrls  : ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    public title: string;
    public galleryLinkTitle: string;

    public constructor(
        private router: Router,
        private photoRepo: PhotosRepository,
    ) {
        this.title            = 'A gallery containing the most beautiful images';
        this.galleryLinkTitle = 'GALLERY';
    }

    public ngOnInit() {
    }

    public onAfterDelay(time: number): void {
        console.log('onAfterDelay', time);
        this.onHandlerRouteGallery(false);
    }

    public onBeforeDelay(time: number): void {
        console.log('onBeforeDelay', time);
    }

    public onClicked(time: number): void {
        console.log('onClicked', time);
        this.onHandlerRouteGallery();
    }

    private onHandlerRouteGallery(navigate: boolean = true): void {
        this.photoRepo.findAll();

        if (navigate) {
            this.router.navigate(['/gallery']);
        }
    }
}
