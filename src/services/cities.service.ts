import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Cities } from 'src/models/cities';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private httpClient : HttpClient) { }
  getCities(){
    return this.httpClient.get<Cities[]>(environment.cities);
  }

}
