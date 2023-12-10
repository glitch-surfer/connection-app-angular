import { ApplicationConfig, importProvidersFrom, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { routes } from './app.routes';
import { AuthService } from './api/auth.service';
import { AuthInterceptor } from './api/interceptors/auth.interceptor';
import { profileReducer } from './store/profile/profile.reducer';
import { groupsReducer } from './store/groups/groups.reducer';
import { peoplesReducer } from './store/peoples/peoples.reducer';

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
    importProvidersFrom([
      HttpClientModule,
      StoreModule.forRoot({
        profile: profileReducer,
        groups: groupsReducer,
        peoples: peoplesReducer,
      }),
    ]),
    provideAnimations(),
  ],
};
