import { Component,OnInit, Output } from '@angular/core';
import {FormGroup, FormControl, NgForm, Validators} from '@angular/forms'
import { Route, Router } from '@angular/router';
import { Users } from 'src/models/users';
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
ngOnInit(): void {
  this.userEmail = new FormControl('');
  this.password = new FormControl('');

  this.signInForm = new FormGroup({
    userEmail : this.userEmail,
    password : this.password
  })
}

 onSubmit(user:Users):void{
  console.log(user)
  this.userService.validateUser(user);
}
  
}
