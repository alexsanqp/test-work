import { Observable } from 'rxjs';

export interface IWrite<T> {
    create(item: T): Observable<boolean>;

    update(id: string, item: T): Observable<boolean>;

    delete(id: string): Observable<boolean>;
}
