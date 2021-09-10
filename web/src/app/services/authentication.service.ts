import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/index';

@Injectable({ providedIn: 'root' })

/**
 * Class AuthenticationService
 *
 * Authentication in the API
 *
 * @author Jônatas Ramos
 */
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;
  public env: any = environment;
  public options: any;
  public api_routes: any = {
    login: `${this.env.apiUrl}/auth/login`
  };

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    let headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    this.options = { headers: headers };
  }

  /**
   * Get current user
   *
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   * API login
   *
   * @param email
   * @param password
   * @returns Object - logged user
   */
  login(email: string, password: string) {
    return this.http.post<any>(this.api_routes.login, { email, password }, this.options)
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  /**
   * Remove user from local storage
   */
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
