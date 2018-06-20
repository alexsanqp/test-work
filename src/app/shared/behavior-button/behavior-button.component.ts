import {
    Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild,
} from '@angular/core';
import { Observable, fromEvent, timer, Subscription } from 'rxjs';
import { timestamp, sample, pluck, map } from 'rxjs/operators';

@Component({
    selector : 'plus-behavior-button',
    template : `
        <a #behaviorLink class="btn btn-md btn-black"
           href="javascript:void(0);">{{title}}</a>
    `,
    styleUrls: ['./behavior-button.component.scss'],
})
export class BehaviorButtonComponent implements OnInit, OnDestroy {
    public readonly START_TIME: number    = 0;
    public readonly DEFAULT_DELAY: number = 400;

    @Input()
    public title: string;

    @Input()
    public delay: number;

    @Input()
    public clearEventAfterClick: boolean;

    @Output()
    public beforeDelay: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    public afterDelay: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    public clicked: EventEmitter<number> = new EventEmitter<number>();

    @ViewChild('behaviorLink')
    private link;

    private startTime: number;
    private endTime: number;
    private timerId: Subscription;
    private subs: Subscription;

    public constructor() {
        this.startTime            = 0;
        this.endTime              = this.START_TIME;
        this.delay                = this.DEFAULT_DELAY;
        this.clearEventAfterClick = false;
        this.timerId              = new Subscription();
        this.subs                 = new Subscription();
    }

    public ngOnInit() {
        const galleryLinkOver  = fromEvent(this.link.nativeElement, 'mouseover');
        const galleryLinkOut   = fromEvent(this.link.nativeElement, 'mouseout');
        const galleryLinkClick = fromEvent(this.link.nativeElement, 'click');

        this.onEventMouse(galleryLinkOver, galleryLinkOut);
        this.onEventClick(galleryLinkClick);
    }

    public ngOnDestroy(): void {
        this.clearTimer();
        this.clearEventSubscribe();
    }

    /**
     *
     * @param {Observable<any>} over
     * @param {Observable<any>} out
     */
    private onEventMouse(over: Observable<any>, out: Observable<any>): void {
        const subLinkOver = over.pipe(
            map(this.beforeMapHandler.bind(this)),
            timestamp(),
            sample(out),
            pluck('timestamp'),
            timestamp(),
            map(this.afterMapHandler.bind(this)),
        ).subscribe();

        this.subs.add(subLinkOver);
    }

    /**
     *
     * @param {Observable<any>} click
     */
    private onEventClick(click: Observable<any>): void {
        const subLinkClick = click.subscribe((e) => {
            const passedTime = this.validEndTime(true) - this.startTime;

            if (this.clearEventAfterClick === true) {
                this.clearEventSubscribe();
            }

            this.clearTimer();

            this.clicked.emit(passedTime);
        });

        this.subs.add(subLinkClick);
    }

    /**
     *
     * @param {*} item
     * @return {*}
     */
    private beforeMapHandler(item: any): any {
        this.startTime = Date.now();
        this.endTime   = this.START_TIME;
        this.timerId   = timer(this.delay)
            .subscribe(
                this.timeOutHandler.bind(this),
            );

        return item;
    }

    /**
     *
     * @param {*} item
     * @return {any}
     */
    private afterMapHandler(item: any): any {
        this.endTime = item.timestamp;

        const passedTime: number = this.endTime - this.startTime;

        if (passedTime < this.delay) {
            this.clearTimer();
            this.beforeDelay.emit(passedTime);
        }
    }

    /**
     * Timeout handler
     */
    private timeOutHandler(): void {
        const passedTime = this.validEndTime() - this.startTime;

        if (passedTime >= this.delay || this.endTime === 0) {
            this.afterDelay.emit(passedTime);
        } else {
            this.beforeDelay.emit(passedTime);
        }

        this.clearTimer();
    }

    /**
     * Clear timer subscribe
     */
    private clearTimer(): void {
        if (this.timerId) {
            this.timerId.unsubscribe();
        }
    }

    /**
     * Clear mouse event subscribe
     */
    private clearEventSubscribe(): void {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    }

    /**
     *
     * @param {boolean} update
     * @return {number}
     */
    private validEndTime(update: boolean = false): number {
        if (this.endTime === 0 || update) {
            this.endTime = Date.now();
        }

        return this.endTime;
    }
}
