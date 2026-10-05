import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private apiUrl = 'http://127.0.0.1:3001/api';

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  loginUser(data: { empId: string; password: string }): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, data)
      .pipe(
        tap((response: any) => {
          if (response?.token && isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.token);
          }
        })
      );
  }

  saveToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }
}
