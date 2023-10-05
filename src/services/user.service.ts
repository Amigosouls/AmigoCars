import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { TokenDetails, Users } from 'src/models/users';
import { environment } from 'src/environments/environments';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private messages:MessageService,private router:Router) { }

  decodeToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }
  
  getLoggedUser(email:any){
    return this.httpClient.get(environment.userData+"/LoggedUser?email="+email);
  }

  validateUser(user: Users):void {
    this.httpClient.post<TokenDetails>(environment.userData + '/GetUsers', user).subscribe(
      {
        next: (res => {
          alert(res.message);
          console.log(res);
          this.setToken(res.token,res.email);
          console.log(res);
          this.validateAuth(true);
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

  setToken(token:string,email:string):void{
    localStorage.setItem('token',token);
    localStorage.setItem('email',email);
  }
  getToken():string|null{
    return localStorage.getItem('token');
  }
  public static isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }
  public authoriseSubject = new Subject<boolean>();
  public validateAuth(state:boolean){
    this.authoriseSubject.next(state);
  }
  public signOut(){
    localStorage.clear();
  }
}
