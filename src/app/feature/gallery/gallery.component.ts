import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/internal/operators';
import { Subscriber } from 'rxjs';

import { IPhoto } from '@app/core/photos';
import { IPager, IPopupImage } from '@app/shared';
import { Subject } from 'rxjs/index';

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
    public pagesToShow: number;

    public image: Subject<IPopupImage>;

    private subs: Subscriber<any>;
    private schameGrid: number[];

    public constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.photos = [];
        this.subs   = new Subscriber<any>();
        this.image  = new Subject<IPopupImage>();

        this.colorClass  = [
            'lime',
            'orange',
            'blue',
            'redgay',
            'yellow',
            'bluefish',
            'magenta',
        ];
        this.loading     = false;
        this.total       = 0;
        this.page        = 1;
        this.limit       = 21;
        this.pagesToShow = 6;

        this.schameGrid = [2, 8, 11, 16, 17, 20];
    }

    public ngOnInit() {
        const subRouteDada = this.route.data.pipe(
            map((data) => data['photos']),
        ).subscribe(
            (photos) => {
                if (photos) {
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
        if (this.schameGrid.indexOf(index) > -1) {
            return 'wide';
        }

        return 'box';
    }

    public getColorClassBlock(): string {
        const indexColor = this.getRandomInt(0, this.colorClass.length - 1);

        return this.colorClass[indexColor];
    }

    public showImage(image: IPhoto) {
        this.image.next({
            url        : image.url,
            description: image.title,
        });
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

    /**
     * Pagination
     *
     * @param targetArray
     * @param perPage
     * @param page
     */
    public paginate(targetArray: any[], perPage: number, page: number): any[] {
        return targetArray.slice(perPage * (page - 1), perPage * page);
    }

    public goToHome(): void {
        this.router.navigate(['/home']);
    }

    public goToPage(page: number): void {
        this.page = page;
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
