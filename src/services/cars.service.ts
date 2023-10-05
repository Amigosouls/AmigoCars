import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { CarsData } from 'src/models/cars';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private httpClient:HttpClient) { }
  getCarsData(brand:string,model:string){
    return this.httpClient.get<CarsData[]>(environment.cars+`FindCar?brand=${brand}&model=${model}`);
  }
}
