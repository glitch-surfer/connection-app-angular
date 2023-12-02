import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'signup',
    loadComponent: () => import('./auth/sign-up/sign-up.component').then((m) => m.SignUpComponent),
  },
  {
    path: 'signin', // default for unauthenticated users
    loadComponent: () => import('./auth/sign-in/sign-in.component').then((m) => m.SignInComponent),
  },
  {
    path: 'groups', // default for authenticated users
    loadComponent: () => import('./groups/groups.component').then((m) => m.GroupsComponent),
  },
  {
    path: '**',
    redirectTo: 'signin',
  },
];
