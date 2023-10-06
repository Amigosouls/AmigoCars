import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CarsData, PendingCars } from 'src/models/cars';
import { CarsService } from 'src/services/cars.service';

@Component({
  selector: 'app-view-cars',
  templateUrl: './view-cars.component.html',
  styleUrls: ['./view-cars.component.css']
})
export class ViewCarsComponent implements OnInit {
  constructor(private carService:CarsService, private messages:MessageService){}
  visible: boolean = false;
  pendingCars:PendingCars[]=[];
  ngOnInit(): void {
    this.carService.getAllCars().subscribe(
      {
        next: (res => {
          this.pendingCars = res;         
        }),
        error: (err => {
          this.messages.add({ severity: 'danger', summary: 'No data Found', detail: err?.error, sticky: true });
        })
      }
    )
  }
  claimVehicle(carToClaim:PendingCars) {
    this.visible = true;
}

}
