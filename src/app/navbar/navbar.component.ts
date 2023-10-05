import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(private userService:UserService){}
  visible: boolean = false;
  public logged:boolean=false;
  userData:any;
    showDialog() {
        this.visible = true;
    }
    ngOnInit(): void {
      this.userService.getLoggedUser(localStorage.getItem('email')).subscribe(
        {
          next: (res => {
            this.logged=true;
            this.userData=res;
          }),
          error: (err => {
            console.log(err.message);
  
          })
        }
      )
      this.userService.authoriseSubject.subscribe(
        (res)=>{
          if(res){
            this.ngOnInit();
          }
        }
      )
     
    }

}
