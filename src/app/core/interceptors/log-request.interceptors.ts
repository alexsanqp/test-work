import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse,
} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable()
export class LogRequestInterceptors implements HttpInterceptor {

    public constructor() {}

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now();

        return next.handle(req).pipe(
            map((res: HttpResponse<any>) => {

                if (environment.production === false) {
                    console.warn(
                        `Request for ${req.urlWithParams} took ${(Date.now() - started)} ms.`,
                    );
                }

                return res;
            }),
            catchError((err: HttpErrorResponse) => {
                if (err instanceof HttpErrorResponse) {
                    if (environment.production === false) {
                        console.error(err.message);
                    }
                }

                return EMPTY;
            }),
        );
    }
}
