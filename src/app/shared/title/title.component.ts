import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'plus-title',
    template: `
        <h1 class="plus-section-title plus-title-p plus-title-display">{{title}}</h1>
    `,
    styles  : [`
        .plus-section-title {
            font-style: normal;
            line-height: 1.2;
        }

        .plus-title-display {
            font-family: sans-serif;
            font-size: 4.25rem;
        }
        .plus-title-p {
            padding-top: 1rem;
            padding-bottom: 1rem;
        }
    `],
})
export class TitleComponent implements OnInit {
    @Input()
    public title: string;

    public constructor() { }

    public ngOnInit() {
    }
}
