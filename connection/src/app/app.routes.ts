import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'signup',
    loadComponent: () => import('./auth/sign-up/sign-up.component').then((m) => m.SignUpComponent),
  },
  {
    path: 'signin',
    loadComponent: () => import('./auth/sign-in/sign-in.component').then((m) => m.SignInComponent),
  },
];
