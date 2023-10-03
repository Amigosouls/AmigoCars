import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  visible: boolean = false;
  logged:boolean=false;
    showDialog() {
        this.visible = true;
    }

}
