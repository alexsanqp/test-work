import { Component, Input, EventEmitter, Output, HostListener } from '@angular/core';
import { IPagination } from './pagination.interface';

export enum KEY_CODE {
    RIGHT_ARROW = 39,
    LEFT_ARROW = 37
}

@Component({
    selector   : 'plus-pagination',
    templateUrl: './plus-pagination.component.html',
    styleUrls  : ['./plus-pagination.component.scss'],
})
export class PlusPaginationComponent implements IPagination {
    @Input()
    public page: number;

    @Input()
    public count: number;

    @Input()
    public perPage: number;

    @Input()
    public loading: boolean;

    @Input()
    public pagesToShow: number;

    @Output()
    public goPrev = new EventEmitter<boolean>();

    @Output()
    public goNext = new EventEmitter<boolean>();

    @Output()
    public goPage = new EventEmitter<number>();

    public constructor() { }

    @HostListener('window:keyup', ['$event'])
    public keyEvent(event: KeyboardEvent) {
        if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
            this.onNext();
        }

        if (event.keyCode === KEY_CODE.LEFT_ARROW) {
            this.onPrev();
        }
    }

    public getMin(): number {
        return ((this.perPage * this.page) - this.perPage) + 1;
    }

    public getMax(): number {
        let max = this.perPage * this.page;

        if (max > this.count) {
            max = this.count;
        }
        return max;
    }

    public onPage(n: number): void {
        this.goPage.emit(n);
    }

    public onPrev(): void {
        this.goPrev.emit(true);
    }

    public onNext(): void {
        this.goNext.emit(true);
    }

    public totalPages(): number {
        return Math.ceil(this.count / this.perPage) || 0;
    }

    public lastPage(): boolean {
        return this.perPage * this.page >= this.count;
    }

    public getPages(): number[] {
        const c               = Math.ceil(this.count / this.perPage);
        const p               = this.page || 1;
        const pagesToShow     = this.pagesToShow || 9;
        const pages: number[] = [];
        const times           = pagesToShow - 1;

        pages.push(p);

        for (let i = 0; i < times; i++) {
            if (pages.length < pagesToShow) {
                if (Math.min.apply(null, pages) > 1) {
                    pages.push(Math.min.apply(null, pages) - 1);
                }
            }
            if (pages.length < pagesToShow) {
                if (Math.max.apply(null, pages) < c) {
                    pages.push(Math.max.apply(null, pages) + 1);
                }
            }
        }

        pages.sort((a, b) => a - b);

        return pages;
    }

    public isVisiblePrev() {
        return !(this.page !== 1 && this.page > this.pagesToShow - 2);
    }

    public isVisibleNext() {
        return this.page > this.totalPages() - 4;
    }
}
