import { ApplicationConfig, importProvidersFrom, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { AuthService } from './api/auth.service';
import { AuthInterceptor } from './api/interceptors/auth.interceptor';

export const authInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    AuthService,
    authInterceptorProvider,
    importProvidersFrom([HttpClientModule]),
    provideAnimations(),
  ],
};
