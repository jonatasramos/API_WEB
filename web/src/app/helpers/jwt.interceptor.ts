import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services';

@Injectable()

/**
 * Class JwtInterceptor
 *
 * @author Jônatas Ramos
 */
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  /**
   * Interceptor Authorization
   *
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.access_token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.access_token}`
        }
      });
    }

    return next.handle(request);
  }
}
