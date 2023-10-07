import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environments';
import { BuyCar, CarsData, PendingCars } from 'src/models/cars';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private httpClient:HttpClient, private router:Router, private messages:MessageService, private userService: UserService) { }
  getCarsData(brand:string,model:string){
    return this.httpClient.get<CarsData[]>(environment.cars+`FindCar?brand=${brand}&model=${model}`);
  }

  postCarDetails(carData:FormGroup){
   this.httpClient.post(environment.cars+'CarDetails',carData).subscribe(
    {
      next: (res => {
        this.messages.add({ severity: 'success', summary: 'Applied', detail: 'Car details saved! check status for further update!', sticky: true });
      }),
      error: (err => {
        this.messages.add({ severity: 'error', summary: 'Some Error occured', detail: err?.error, sticky: true });
      })
    }
   );
  }

  getClaimedCars():Observable<PendingCars[]>{
    return this.httpClient.get<PendingCars[]>(environment.cars+'ViewCars');
  }

  getPendingCars():Observable<PendingCars[]>{
    return this.httpClient.get<PendingCars[]>(environment.cars+'GetPending');
  }

  deleteCar(carId:number):void{
    console.log(carId);
    this.httpClient.delete(environment.cars+'DeleteCars?carId='+carId).subscribe(
      {
        next: (res => {
          this.messages.add({ severity: 'info', summary: 'Deleted', detail: 'Declined the Request for Sale', sticky: true });
         
        }),
        error: (err => {
          this.messages.add({ severity: 'error', summary: 'Some Error occured', detail: err?.error, sticky: true });
        })
      }
     );
  }

  buyCar(boughtDetail:BuyCar){
    this.httpClient.post(environment.cars+'BuyCar',boughtDetail).subscribe(
      {
        next: (res => {
          this.messages.add({ severity: 'success', summary: 'Car Bought', detail: '', sticky: true });         
        }),
        error: (err => {
          this.messages.add({ severity: 'error', summary: 'Some Error occured', detail: err?.error, sticky: true });
        })
      }
     );
  }
}
