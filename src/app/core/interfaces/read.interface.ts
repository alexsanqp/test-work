import { Observable } from 'rxjs';

export interface IRead<T> {
    find(item: T): Observable<T[]>;

    findOne(id: string): Observable<T>;
}
