import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoreModule } from '../core.module';
import { BaseService } from '../base';
import { IPhoto } from '../interfaces';



@Injectable({
    providedIn: CoreModule,
})
export class PhotosService extends BaseService {

    public constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    public getAll(): Observable<IPhoto[]> {
        return this.get<IPhoto[]>('photos');
    }
}
