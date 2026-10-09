import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:3001/api/users'; // Adjust if route is different

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return headers;
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.getHeaders() });
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createUser(userData: any): Observable<any> {
    // Uses the custom '/create-user' route from your backend
    return this.http.post<any>(`${this.apiUrl}/create-user`, userData, { headers: this.getHeaders() });
  }

  updateUser(id: string, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, userData, { headers: this.getHeaders() });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
