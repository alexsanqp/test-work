import { BrowserModule } from '@angular/platform-browser';
import { APP_ID, Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';

@NgModule({
    imports     : [
        BrowserModule.withServerTransition({
            appId: 'enkonix',
        }),
        AppRoutingModule,
        CoreModule,
        SharedModule
    ],
    declarations: [
        AppComponent,
    ],
    providers   : [],
    bootstrap   : [AppComponent],
})
export class AppModule {
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(APP_ID) private appId: string,
    ) {
        const platform = isPlatformBrowser(platformId)
            ? 'Browser'
            : 'Server';

        console.log(`${platform} = ${appId}`);
    }
}
