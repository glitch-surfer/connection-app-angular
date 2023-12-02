import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isAuth } from '../helpers/is-auth';
// todo refactor isAuth to get this values from store, that should get it from LS, because this doesnt work
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  return isAuth() ? router.createUrlTree(['/groups']) : router.createUrlTree(['/signin']);
};
