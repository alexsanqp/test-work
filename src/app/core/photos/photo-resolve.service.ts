import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { PhotosRepository } from './photos.repository';
import { IPhoto } from './photo.interface';
import { CoreModule } from '../core.module';

@Injectable({
    providedIn: CoreModule,
})
export class PhotoResolve implements Resolve<Observable<IPhoto[]>> {

    public constructor(private photoRepo: PhotosRepository) {}

    public resolve(route: ActivatedRouteSnapshot): Observable<IPhoto[]> {
        return this.photoRepo.findAll();
    }
}
