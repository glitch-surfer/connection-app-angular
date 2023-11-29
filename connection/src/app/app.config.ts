import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { SignUpService } from './api/sign-up.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    SignUpService,
    importProvidersFrom([HttpClientModule]),
    provideAnimations(),
  ],
};
