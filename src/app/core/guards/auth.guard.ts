import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (): boolean => {
  const authService = inject(AuthService);
  const isLoggedIn = authService.getIsLoggedIn();

  if (!isLoggedIn) {
    const router = inject(Router);
    router.navigate(['/auth']); // Redirect to the login page when not logged in
  }

  return isLoggedIn;
}