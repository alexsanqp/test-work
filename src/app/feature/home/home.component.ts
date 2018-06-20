import { Component, OnInit } from '@angular/core';

@Component({
    selector   : 'plus-home',
    templateUrl: './home.component.html',
    styleUrls  : ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    public title: string;
    public galleryLinkTitle: string;

    public constructor() {
        this.title            = 'A gallery containing the most beautiful images';
        this.galleryLinkTitle = 'GALLERY';
    }

    public ngOnInit() {
    }

    public onAfterDelay(time: number): void {
        console.log('onAfterDelay', time);
    }

    public onBeforeDelay(time: number): void {
        console.log('onBeforeDelay', time);
    }

    public onClicked(time: number): void {
        console.log('onClicked', time);
    }
}
