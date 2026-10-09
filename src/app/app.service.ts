import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://127.0.0.1:3001/api';

  loggedUser$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  setLoggedInUser(user: any) {
    this.loggedUser$.next(user);
  }

  getLoggedInUser() {
    return this.loggedUser$.asObservable();
  }
}
