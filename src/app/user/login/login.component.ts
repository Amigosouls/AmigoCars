import { Component,OnInit, Output } from '@angular/core';
import {FormGroup, FormControl, NgForm, Validators} from '@angular/forms'
import { Route, Router } from '@angular/router';
import { Users } from 'src/models/users';
import { UserStoreService } from 'src/services/user-store.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router:Router, private userService:UserService) {}
signInForm!:FormGroup;
userEmail!:FormControl;
password!:FormControl;
recoveryEmail!:FormControl;
visible:boolean=false;
recoveryForm!:FormGroup;
ngOnInit(): void {
  this.userEmail = new FormControl('',[Validators.required]);
  this.password = new FormControl('',[Validators.required]);
  this.recoveryEmail = new FormControl('',[Validators.required, Validators.email])
  this.signInForm = new FormGroup({
    userEmail : this.userEmail,
    password : this.password
  });
  this.recoveryForm = new FormGroup({
    recoveryEmail :this.recoveryEmail
  });
}

 onSubmit(user:Users):void{
  this.userService.validateUser(user);
}
  forgotPassword(){
    this.visible = true;
  }
  onRecoverSubmit(mail:FormGroup){
    console.log(mail.value.recoveryEmail);
  }

}
