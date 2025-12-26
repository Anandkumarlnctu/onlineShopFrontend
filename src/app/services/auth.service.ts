import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  loggedIn$ = this.loggedInSubject.asObservable();
  // private baseUrl = 'https://userservice-tg0w.onrender.com/api/users/register';  // Update base URL
  private baseUrl = 'http://localhost:9090/api/users';
  constructor(private http: HttpClient) {}

  private isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null; // Assuming user data is saved in localStorage
  }

  login(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.loggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.loggedInSubject.next(false);
  }

  get isUserLoggedIn(): boolean {
    return this.loggedInSubject.getValue();
  }

  signUp(payload: any): Observable<any> {
    const url = `${this.baseUrl}/register`;

    return this.http.post(url, payload, { responseType: 'text' });

  }

  verifyOtp(email: string, otp: string): Observable<any> {
  return this.http.post(`${this.baseUrl}/verify-otp`, { email, otp }, { responseType: 'text' });
}

}


