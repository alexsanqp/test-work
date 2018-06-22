import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_ID, Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { FeatureModule } from '@app/feature';

@NgModule({
    imports     : [
        BrowserModule.withServerTransition({
            appId: 'enkonix',
        }),
        BrowserAnimationsModule,
        AppRoutingModule,

        CoreModule,
        SharedModule,
        FeatureModule,
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
