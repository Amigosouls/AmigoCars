import { Component,OnInit } from '@angular/core';
import {FormGroup, FormControl, NgForm, Validators} from '@angular/forms'
import { Route, Router } from '@angular/router';
import { Users } from 'src/models/users';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router:Router, private userService:AuthService) {}
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
  this.userService.validateUser(user);
}

}