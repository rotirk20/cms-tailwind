import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:5000/api/auth/';
  private token: string | null = null; // Store the JWT token
  private tokenKey = 'auth_token'; // Key for token in localStorage

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem(this.tokenKey);
  }
  private loggedIn = !!this.token; // Set initial isLoggedIn based on token existence

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login`, credentials)
    .pipe(
      tap((response) => {
        // Assuming a successful login response from the server
        this.loggedIn = true;
        this.token = response.token; // Replace this with your actual token
        if (this.token) {
          localStorage.setItem(this.tokenKey, this.token);
          delete response.token;
          delete response.password;
          localStorage.setItem('userData', JSON.stringify(response));
        }

      })
    );
  }

  getUser(): Object | null {
    const userDataString = localStorage.getItem('userData');
    return userDataString ? JSON.parse(userDataString) : null;
  }

  logout() {
    // Perform actual logout logic here
    this.token = null;
    this.loggedIn = false;
    localStorage.removeItem(this.tokenKey);
  }

  getIsLoggedIn(): boolean {
    if (this.getToken() != null) {
      return this.loggedIn = true;
    }
    return this.loggedIn;
  }

  // Getter method to retrieve the JWT token
  getToken(): string | null {
    return this.token;
  }
}