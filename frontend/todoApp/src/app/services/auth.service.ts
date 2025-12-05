import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private base = 'http://localhost:4000/auth';

    constructor(private http: HttpClient) {}

    register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.base}/register`, { name, email, password });
    }

    login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.base}/login`, { email, password }).pipe(
        tap((res: any) => {
        if (res?.token) {
            localStorage.setItem('token', res.token);
        }
        })
    );
    }

    logout() {
        localStorage.removeItem('token');
    }

    getToken() {
        return localStorage.getItem('token');
    }

    isAuthenticated() {
        return !!this.getToken();
    }
}
