import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PendingCars } from 'src/models/cars';
import { CarsService } from 'src/services/cars.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  responsiveOptions;
  constructor(private carService:CarsService, private messages:MessageService){
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }
  pendingCars:PendingCars[]=[];
  ngOnInit(): void {
    
    this.carService.getClaimedCars().subscribe(
      {
        next: (res => {
          this.pendingCars = res;         
        }),
        error: (err => {
          this.messages.add({ severity: 'danger', summary: 'No data Found', detail: err?.error, sticky: true });
        })
      }
    );
  }

}
