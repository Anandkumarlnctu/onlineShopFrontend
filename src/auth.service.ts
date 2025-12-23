// auth.service.ts for testing loging and singup page
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://reqres.in/api';

  constructor(private http: HttpClient) { }

  signup(data: {email: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: {email: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }
}
