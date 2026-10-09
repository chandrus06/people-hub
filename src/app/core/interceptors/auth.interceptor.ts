import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToasterService } from '../services/toaster.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const toasterService = inject(ToasterService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // If the backend returns a 401 (Unauthorized) or 403 (Forbidden), the token is likely expired or invalid.
      if ((error.status === 401 || error.status === 403) && isPlatformBrowser(platformId)) {
        toasterService.showWarn('Session expired. Please log in again.');
        
        // Clear stored authentication data
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        
        // Redirect to the login page
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
