import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http:HttpClient) { }

private apiUrl='http://127.0.0.1:3001/api';

signup(userData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/signup`, userData);
}
}
