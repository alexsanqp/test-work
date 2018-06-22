import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotosRepository } from '@app/core';
import { Subscription } from 'rxjs/index';

@Component({
    selector   : 'plus-home',
    templateUrl: './home.component.html',
    styleUrls  : ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    public title: string;
    public galleryLinkTitle: string;
    public delayLoad: number;

    private subPhotos: Subscription;

    public constructor(
        private router: Router,
        private photoRepo: PhotosRepository,
    ) {
        this.title            = 'A gallery containing the most beautiful images';
        this.galleryLinkTitle = 'GALLERY';
        this.delayLoad        = 250;

        this.subPhotos = new Subscription();
    }

    public ngOnInit() {
    }

    public ngOnDestroy(): void {
        this.subPhotos.unsubscribe();
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
        const subPhotoId = this.photoRepo.findAll().subscribe();

        this.subPhotos.add(subPhotoId);

        if (navigate) {
            this.router.navigate(['/gallery']);
        }
    }
}
