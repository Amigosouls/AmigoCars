import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserStoreService } from 'src/services/user-store.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(private userService:UserService, private messageService:MessageService , private userStore:UserStoreService){}
  visible: boolean = false;
  public logged:boolean=false;
  public fullName :string='';
  public roleName :string='';
  public userImg :string='';
  userData:any;
    showDialog() {
        this.visible = true;
    }
    ngOnInit(): void {
      
      this.userService.authoriseSubject.subscribe(
        (res)=>{
          if(res){
            this.logged=true;
            this.ngOnInit();
          }
        }
      );
        this.userStore.getFullName()
        .subscribe(val=>{
          
          let fullNameFromToken = this.userService.getFullNameFromToken();
          if(fullNameFromToken){
            this.logged =true;
          }
          this.fullName = val || fullNameFromToken;
          console.log(fullNameFromToken);
        });
        this.userStore.getRoleFromStore()
        .subscribe(val=>{
          let roleFromToken = this.userService.getRoleFromToken();
          this.roleName = val || roleFromToken;
        });
        this.userStore.getUserImage()
        .subscribe(val=>{
          let imgFromToken = this.userService.getImgFromToken();
          this.userImg = val || imgFromToken;
        });
    }
   logout(){
      this.userService.signOut();
      this.messageService.add({ severity: 'info', summary: 'Signed Out', detail: 'Signed out Successfully!', sticky: true });
      this.logged=false;
    }

}
