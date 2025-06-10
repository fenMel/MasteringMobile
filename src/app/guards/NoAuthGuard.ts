// no-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(): Promise<boolean> {
    const loggedIn = this.authService.isAuthenticated();
    if (loggedIn) {
      await this.authService.redirectUserByRole();
      return false;
    }
    return true;
  }
}
