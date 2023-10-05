import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Cities, Rto } from 'src/models/cities';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private httpClient : HttpClient) { }
  getCities(pin:number){
    return this.httpClient.get<Cities[]>(environment.cities+"?pin="+pin);
  }

  getRto(rto:string){
    return this.httpClient.get<Rto[]>(environment.cities+'/Rto?rto='+rto);
  }

}
