import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services';

@Injectable()
/**
 * Class ErrorInterceptor
 *
 * @author Jônatas Ramos
 */
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    /**
     * Interceptor Error
     *
     * @param request
     * @param next
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.authenticationService.logout();
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
