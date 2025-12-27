import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

export interface RegisterRequest {
    name: string;
    email: string;
    mobileNumber: number;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface VerifyOtpRequest {
    email: string;
    otp: string;
}

export interface ResendOtpRequest {
    email: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'http://localhost:8080/api/users';
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor(private http: HttpClient) { }

    login(data: LoginRequest): Observable<any> {
        return this.http.post(`${this.baseUrl}/login`, data, {
            responseType: 'text',
            withCredentials: true
        }).pipe(
            tap(() => this.isAuthenticatedSubject.next(true))
        );
    }

    logout(): Observable<any> {
        return this.http.post(`${this.baseUrl}/logout`, {}, {
            responseType: 'text',
            withCredentials: true
        }).pipe(
            tap(() => this.isAuthenticatedSubject.next(false))
        );
    }

    register(data: RegisterRequest): Observable<any> {
        return this.http.post(`${this.baseUrl}/register`, data, {
            responseType: 'text'
        });
    }

    verifyOtp(data: VerifyOtpRequest): Observable<any> {
        return this.http.post(`${this.baseUrl}/verify-otp`, data, {
            responseType: 'text'
        });
    }

    resendOtp(data: ResendOtpRequest): Observable<any> {
        return this.http.post(`${this.baseUrl}/resend-otp`, data, {
            responseType: 'text'
        });
    }

    getAuthStatus(): boolean {
        return this.isAuthenticatedSubject.value;
    }

    setAuthStatus(status: boolean): void {
        this.isAuthenticatedSubject.next(status);
    }

    getProfile(): Observable<any> {
        return this.http.get(`${this.baseUrl}/profile`, {
            withCredentials: true
        });
    }
}
