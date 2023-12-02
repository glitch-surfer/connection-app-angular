import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInService } from '../../auth/sign-in/sign-in.service';
import { Credentials } from '../model/sign-in';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private credentials: Credentials | null = null;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isAuth(this.credentials)) {
      return next.handle(request);
    }

    const { email, token, uid } = this.credentials;
    const requestWithAuthHeaders = request.clone({
      headers: request.headers
        .set('rs-email', email)
        .set('Authorization', `Bearer ${token}`)
        .set('rs-uid', uid),
    });

    return next.handle(requestWithAuthHeaders);
  }

  private isAuth(credentials: Credentials | null): credentials is Credentials {
    if (credentials) return true;

    const { email, token, uid } = SignInService.getCredentials();

    if (!token) return false;

    this.credentials = { email, token, uid };

    return true;
  }
}
