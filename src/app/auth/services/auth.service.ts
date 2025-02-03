import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IUser } from 'src/app/shared/interfaces/user';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject: BehaviorSubject<IUser | null>;
  public currentUser$: Observable<IUser | null>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<IUser | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get isLoggedIn(): IUser | null {
    return this.currentUserSubject.value;
  }
  public get userData(): IUser {
    return this.currentUserSubject.value;
  }
  signUp(userData:IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/signup`, userData)
      .pipe(
        tap(user => this.handleAuthentication(user)),
        catchError(error => this.handleError(error))
      );
  }

  signIn(credentials: {
    email: string;
    password: string;
  }): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(user => this.handleAuthentication(user)),
        catchError(error => this.handleError(error))
      );
  }

  signOut(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/home']);
  }

  private handleAuthentication(user: IUser): void {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    }
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.statusText) {
      errorMessage = error.statusText;
    }
    return throwError(() => new Error(errorMessage));
  }

  // Add to your environment.ts
  // export const environment = {
  //   production: false,
  //   apiUrl: 'http://your-backend-api.com'
  // };
}