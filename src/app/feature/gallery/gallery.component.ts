import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators';
import { Subscriber } from 'rxjs';

import { IPhoto } from '@app/core/photos';
import { IPager } from '@app/shared';

@Component({
    selector       : 'plus-gallery',
    templateUrl    : './gallery.component.html',
    styleUrls      : ['./gallery.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent implements OnInit, OnDestroy, IPager {
    public photos: IPhoto[];
    public photoList: IPhoto[];
    public colorClass: string[];
    public loading: boolean;
    public total: number;
    public page: number;
    public limit: number;

    private subs: Subscriber<any>;

    public constructor(
        private route: ActivatedRoute,
    ) {
        this.photos = [];
        this.subs   = new Subscriber<any>();

        this.colorClass = [
            'lime',
            'orange',
            'blue',
            'redgay',
            'yellow',
            'bluefish',
            'magenta',
        ];
        this.loading    = false;
        this.total      = 0;
        this.page       = 1;
        this.limit      = 16;
    }

    public ngOnInit() {
        const subRouteDada = this.route.data.pipe(
            map((data) => data['photos']),
        ).subscribe(
            (photos) => {
                console.log('photos', photos);
                if (photos) {
                    /*for (let i = 0; i < 16; ++i) {
                        this.photos[i] = photos[i];
                    }*/

                    this.photos = photos;

                    this.getPhotoOffset();
                }
            },
        );

        this.subs.add(subRouteDada);
    }

    public ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    public getPhotoOffset() {
        this.total     = this.photos.length;
        this.photoList = this.paginate(this.photos, this.limit, this.page);
    }

    public getClassBlock(index: number): string {
        switch (index) {
            case 0:
            case 5:
            case 11:
            case 13:
                return 'wide';

            default:
                return 'box';
        }
    }

    public getColorClassBlock(): string {
        const indexColor = this.getRandomInt(0, this.colorClass.length - 1);

        return this.colorClass[indexColor];
    }

    /**
     * Get a random integer between `min` and `max`.
     *
     * @param {number} min - min number
     * @param {number} max - max number
     * @return {number} a random integer
     */
    public getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public paginate(arr, perPage, page) {
        return arr.slice(perPage * (page - 1), perPage * page);
    }

    public goToPage(n: number): void {
        this.page = n;
        this.getPhotoOffset();
    }

    public onNext(): void {
        this.page++;
        this.getPhotoOffset();
    }

    public onPrev(): void {
        this.page--;
        this.getPhotoOffset();
    }
}
