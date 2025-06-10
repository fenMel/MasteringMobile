import { Injectable } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const RoleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles: string[] = route.data['roles'];
  const user = authService.currentUserSubject.value;
  const userRole = user?.roles?.[0]?.authority;

  if (user && expectedRoles.includes(<string>userRole)) {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
};
