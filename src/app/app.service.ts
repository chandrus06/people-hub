import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://127.0.0.1:3001/api';

  constructor(private http: HttpClient) { }

  getMessage() {
    return this.http.get<{ message: string }>(
      `${this.apiUrl}/hello`
    );
  }

  
}
