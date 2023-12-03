import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { anonymGuard } from './core/guards/anonym.guard';

export const routes: Routes = [
  {
    path: 'signup',
    loadComponent: () => import('./auth/sign-up/sign-up.component').then((m) => m.SignUpComponent),
    canActivate: [anonymGuard],
  },
  {
    path: 'signin', // default for unauthenticated users
    loadComponent: () => import('./auth/sign-in/sign-in.component').then((m) => m.SignInComponent),
    canActivate: [anonymGuard],
  },
  {
    path: 'groups', // default for authenticated users
    loadComponent: () => import('./groups/groups.component').then((m) => m.GroupsComponent),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [authGuard],
  },
  // {
  //   path: '**',
  //   redirectTo: 'signin',
  // },
];
