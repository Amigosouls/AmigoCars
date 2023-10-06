import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PendingCars } from 'src/models/cars';
import { CarsService } from 'src/services/cars.service';

@Component({
  selector: 'app-masterview',
  templateUrl: './masterview.component.html',
    styleUrls: ['./masterview.component.css']
})
export class MasterviewComponent implements OnInit {
  constructor(private carService:CarsService, private messages:MessageService){}
  pageSize:number=10;
  p:number=1;
  visible:boolean=false;
collection:PendingCars[]=[];
deletedCar!:PendingCars;
sortParam: any;
searchGroup!:FormGroup
searchTerm !:FormControl
sortOrder: any;
sortingOption: any;
getSortedList(event:any){
  this.sortingOption = event.target.value;
  if(this.sortingOption==='lth'){
    this.sortParam = 'price',
    this.sortOrder = 'asc'
  }
  else if (this.sortingOption === 'htl') {
    (this.sortParam = 'price'), (this.sortOrder = 'desc');
  } else if (this.sortingOption === 'nasc') {
    (this.sortParam = 'brand'), (this.sortOrder = 'asc');
  } else if (this.sortingOption === 'ndesc') {
    (this.sortParam = 'brand'), (this.sortOrder = 'desc');
  }
}
ngOnInit(): void {
  this.carService.getPendingCars().subscribe(
    {
      next: (res => {
        this.collection = res;
        this.deletedCar = res[0]; 
        console.log(res);        
      }),
      error: (err => {
        this.messages.add({ severity: 'danger', summary: 'Registration UnSuccessFull', detail: err?.error, sticky: true });
      })
    }
  )
}
confirmDelete(carToDelete:PendingCars){
  this.visible=true;
  this.deletedCar = carToDelete;
}
deleteCar(deletedCarId:number){
this.carService.deleteCar(deletedCarId);
}
claimCar(carToClaim:PendingCars){
  
}
}
