import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private fullname$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private img$ = new BehaviorSubject<string>("");
  constructor() { }
  public getRoleFromStore(){
    return  this.role$.asObservable();
  }
  public setRoleForStore(role:string){
    this.role$.next(role);
  }

  public getFullName(){
   return this.fullname$.asObservable();
  }

  public setFullname(name:string){
    this.fullname$.next(name);
  }
  public getUserImage(){
    return this.fullname$.asObservable();
   }
 
   public setUserImage(img:string){
     this.img$.next(img);
   }
 

}
