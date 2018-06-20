import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';

import { IRepository } from '../interfaces';
import { CoreModule } from '../core.module';
import { PhotosService } from './photos.service';
import { IPhoto } from './photo.interface';

@Injectable({
    providedIn: CoreModule,
})
export class PhotosRepository implements IRepository<IPhoto> {

    private photos: IPhoto[];

    public constructor(private protoService: PhotosService) {
        this.photos = [];
    }

    public create(item: IPhoto): Observable<boolean> {
        return EMPTY;
    }

    public update(id: string, item: IPhoto): Observable<boolean> {
        return EMPTY;
    }

    public delete(id: string): Observable<boolean> {
        return EMPTY;
    }

    public find(item: IPhoto): Observable<IPhoto[]> {
        return EMPTY;
    }

    public findOne(id: string): Observable<IPhoto> {
        return EMPTY;
    }

    public findAll(): IPhoto[] {
        if (this.photos.length === 0) {
            this.protoService.getAll().subscribe((response: IPhoto[]) => {
                this.photos = response;
            });
        }

        return this.photos;
    }
}
