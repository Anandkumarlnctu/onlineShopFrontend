import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Check strict boolean value
    if (authService.getAuthStatus()) {
        return true;
    }

    // If not authenticated, redirect to login
    return router.createUrlTree(['/login']);
};
