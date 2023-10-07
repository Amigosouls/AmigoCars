import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { TokenDetails, Users } from 'src/models/users';
import { environment } from 'src/environments/environments';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserStoreService } from './user-store.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userPayload: any;
  constructor(private httpClient: HttpClient, private messages: MessageService, private router: Router, private userStore: UserStoreService) {
    this.userPayload = this.decodeToken();
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getLoggedUser(email: any) {
    return this.httpClient.get<Users>(environment.userData + "/LoggedUser?email=" + email);
  }

  validateUser(user: Users): void {
    this.httpClient.post<TokenDetails>(environment.userData + '/GetUsers', user).subscribe(
      {
        next: (res => {
          this.setToken(res.accessToken,user.userEmail);
          this.storeRefreshToken(res.refreshToken);
          this.validateAuth(true);
          const tokenPayload = this.decodeToken();
          this.messages.add({ severity: 'success', summary: 'Login Success!', detail: 'Welcome to AmigoCars', sticky: true });
          this.userStore.setFullname(tokenPayload.name);
          this.userStore.setRoleForStore(tokenPayload.role);
          
        }),
        error: (err => {
          this.messages.add({ severity: 'error', summary: 'Not Found!', detail: 'User Not Found', sticky: true });

        })
      }
    )


  }
  postUsers(userData: Users): void {
    this.httpClient.post<Response>(environment.userData + '/RegisterUser', userData).subscribe(
      {
        next: (res => {
          this.messages.add({ severity: 'success', summary: 'User Registered', detail: res.statusText, sticky: true });
          this.router.navigateByUrl('/');
        }),
        error: (err => {
          this.messages.add({ severity: 'danger', summary: 'Registration UnSuccessFull', detail: err?.error.Message, sticky: true });

        })
      }
    );
  }

  setToken(token: string,email:string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('email',email);
  }

  storeRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token);
  }
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  public static isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  public authoriseSubject = new Subject<boolean>();
  public validateAuth(state: boolean) {
    this.authoriseSubject.next(state);
  }
  public signOut() {
    localStorage.clear();
    this.validateAuth(false);
  }
  getFullNameFromToken() {
    if (this.userPayload) {
      return this.userPayload.unique_name;
    }
  }
  getRoleFromToken() {
    if (this.userPayload) {
      return this.userPayload.role;
    }
  }

  getImgFromToken() {
    if (this.userPayload) {
      return this.userPayload.certthumbprint;
    }
  }

  renewToken(tokenApi:TokenDetails){
    return this.httpClient.post<any>(environment.userData+'/Refresh',tokenApi)
  }
}
