import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/modules/dashboard/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:5000/api/auth/';
  private readonly userUrl = 'http://localhost:5000/api/';
  private token: string | null = null; // Store the JWT token
  private tokenKey = 'auth_token'; // Key for token in localStorage

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem(this.tokenKey);
  }
  private loggedIn = !!this.token; // Set initial isLoggedIn based on token existence

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}login`, credentials).pipe(
      tap((response) => {
        // Assuming a successful login response from the server
        this.loggedIn = true;
        this.token = response.token || null; // Replace this with your actual token
        if (this.token) {
          localStorage.setItem(this.tokenKey, this.token);
          delete response.token;
          delete response.password;
          localStorage.setItem('userData', JSON.stringify(response));
        }
      }),
    );
  }

  register(userData: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}register`, userData).pipe(
      tap((response) => {
        // Assuming a successful login response from the server
        if (response.hasOwnProperty('first_name')) {
          this.loggedIn = true;
          this.token = response.token || null; // Replace this with your actual token
          if (this.token) {
            localStorage.setItem(this.tokenKey, this.token);
            delete response.token;
            delete response.password;
            localStorage.setItem('userData', JSON.stringify(response));
          }
        }
      }),
    );
  }

  createUser(userData: User) {
    return this.http.post<User>(`${this.apiUrl}register`, userData);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}users`);
  }

  getUser(): Object | null {
    const userDataString = localStorage.getItem('userData');
    return userDataString ? JSON.parse(userDataString) : null;
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}users/${id}`);
  }

  logout() {
    // Perform actual logout logic here
    this.token = null;
    this.loggedIn = false;
    localStorage.removeItem(this.tokenKey);
  }

  getIsLoggedIn(): boolean {
    if (this.getToken() != null) {
      return (this.loggedIn = true);
    }
    return this.loggedIn;
  }

  // Getter method to retrieve the JWT token
  getToken(): string | null {
    return this.token;
  }
}
