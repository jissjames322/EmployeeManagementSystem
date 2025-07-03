import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  //1 Verify UserName and Password
  public loginVerify(credentials: {
    username: string;
    password: string;
  }): Observable<User> {
    // Call WebAPI for checking UserName and Password
    return this.httpClient.post<User>(
      environment.apiUrl + 'login/',
      credentials
    );
  }
  //2 LogOut
  public logOutRemoveItems() {
    //clear all session and localstorage keys
    localStorage.removeItem('USER_NAME');
    sessionStorage.removeItem('USER_NAME');
    localStorage.removeItem('ACCESS_ROLE');
    localStorage.removeItem('JWT_TOKEN');
    //redirect to LOgin
    this.router.navigate(['auth/login']);
  }
}
