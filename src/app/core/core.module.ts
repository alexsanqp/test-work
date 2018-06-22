import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { LogRequestInterceptors } from './interceptors';

@NgModule({
    imports     : [
        CommonModule,
        HttpClientModule,
        RouterModule
    ],
    declarations: [],
    providers   : [
        {
            provide : HTTP_INTERCEPTORS,
            useClass: LogRequestInterceptors,
            multi   : true,
        },
    ],
})
export class CoreModule {
    public constructor(
        @Optional() @SkipSelf() parentModule: CoreModule,
    ) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded');
        }
    }
}
