import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // eslint-disable-next-line class-methods-use-this
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!AuthService.isAuth()) {
      return next.handle(request);
    }

    const { email, token, uid } = AuthService.getCredentials();
    const requestWithAuthHeaders = request.clone({
      headers: request.headers
        .set('rs-email', email)
        .set('Authorization', `Bearer ${token}`)
        .set('rs-uid', uid),
    });

    return next.handle(requestWithAuthHeaders);
  }
}
