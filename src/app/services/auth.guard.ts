import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import LoginService from './login-service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(LoginService).isLogined()? true :  router.parseUrl('/login');  
};
