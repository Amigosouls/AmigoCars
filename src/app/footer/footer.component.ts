import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  d=new Date(Date.now());
date = this.d.toLocaleDateString()+'\t'+this.d.toLocaleTimeString();
}
