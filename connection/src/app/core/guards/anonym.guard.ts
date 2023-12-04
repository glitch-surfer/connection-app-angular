import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../api/auth.service';

export const anonymGuard: CanActivateFn = () => {
  const router = inject(Router);

  return !AuthService.isAuth() || router.createUrlTree(['/']);
};
