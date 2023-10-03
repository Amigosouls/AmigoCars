import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { TokenDetails, Users } from 'src/models/users';
import { environment } from 'src/environments/environments';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private messages:MessageService,private router:Router) { }
  validateUser(user: Users):void {
    this.httpClient.post<TokenDetails>(environment.userData + '/GetUsers', user).subscribe(
      {
        next: (res => {
          alert(res.message);
          console.log(res);
          this.setToken(res.token);
          console.log(res);
          setTimeout(() => {
            this.router.navigateByUrl('/');
          }, 2000);
        }),
        error: (err => {
          alert(err?.error.Message);

        })
      }
    )


  }
  postUsers(userData: Users):void{
   this.httpClient.post<Response>(environment.userData+'/RegisterUser', userData).subscribe(
      {
        next: (res=> {
          this.messages.add({ severity: 'success', summary: 'User Registered', detail: res.statusText, sticky: true });
          this.router.navigateByUrl('/');
        }),
        error: (err => {
          this.messages.add({ severity: 'danger', summary: 'Registration UnSuccessFull', detail: err?.error.Message, sticky: true });

        })
      }
    );
  }

  setToken(token:string):void{
    localStorage.setItem('token',token);
  }
  getToken():string|null{
    return localStorage.getItem('token');
  }
  public static isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }
  signOut():void{
    localStorage.clear();
  }
}
