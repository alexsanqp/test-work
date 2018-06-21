import {
    Component, OnInit, Input, Output, EventEmitter, ElementRef, OnDestroy,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { IPopupImage } from './popup-image.interface';

@Component({
    selector   : 'plus-popup-image',
    templateUrl: './popup-window.component.html',
    styleUrls  : ['./popup-window.component.scss'],
})
export class PopupWindowComponent implements OnInit, OnDestroy {
    @Input()
    public image: Subject<IPopupImage>;

    @Output()
    public popupState: EventEmitter<boolean> = new EventEmitter<boolean>();

    public img: IPopupImage;
    public isOpen: boolean;

    private subs: Subscription;

    public constructor(private modalRef: ElementRef) {
        this.image  = new Subject<IPopupImage>();
        this.isOpen = false;

        this.subs = new Subscription();
    }

    public ngOnInit() {
        const subImageId = this.image.subscribe((image: IPopupImage) => {
            this.popupState.emit(true);

            if (!this.isOpen) {
                this.show();
            }

            this.img = image;
        });

        this.subs.add(subImageId);
    }

    public ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    public onClose(): void {
        this.hide();
        this.popupState.emit(false);
    }

    private show(): void {
        this.modalRef.nativeElement.childNodes[0].style.display = 'block';
    }

    private hide(): void {
        this.modalRef.nativeElement.childNodes[0].style.display = 'none';
    }
}
