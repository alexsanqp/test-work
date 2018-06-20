import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

/**
 * BaseService
 */
export abstract class BaseService {
    public constructor(protected httpClient: HttpClient) {}

    /**
     *
     * @param {string} action
     * @return {string}
     */
    public getEndpoint(action?: string): string {
        return `${environment.apiEndpoint + action}`;
    }

    /**
     * GET request
     *
     * @param {string} action
     * @param {HttpParams} params
     * @return {Observable<any>}
     */
    protected get<T>(action: string, params?: HttpParams): Observable<T> {
        return this.httpClient.get<T>(this.getEndpoint(action), {
            params: params,
        });
    }

    /**
     * POST request
     *
     * @param {string} action
     * @param {HttpParams | {}} params
     * @return {Observable<any>}
     */
    protected post(action: string, params?: HttpParams | {}): Observable<any> {
        return this.httpClient.post<any>(this.getEndpoint(action), params);
    }
}
