import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Users } from 'src/models/users';
import { environment } from 'src/environments/environments';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }
  validateUser(user:Users){
    this.httpClient.post<Users>(environment.userData,user).subscribe(
      {
        next:(res=>{
          alert(res.userName);
          console.log(res);
        }),
        error:(err=>{
          alert(err?.error.Message);

        }) 
      }
    )

  
  }

}
