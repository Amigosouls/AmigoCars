import { Component, OnInit } from '@angular/core';
import { Cities } from 'src/models/cities';
import { CitiesService } from 'src/services/cities.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  citiesData: Cities[] = [];
  constructor(private cityService: CitiesService) {}
  ngOnInit(): void {
    this.cityService.getCities().subscribe({
      next: (res) => {
        alert(res[0].StateName);
        console.log(res);
      },
      error: (err) => {
        alert(err?.error.Message);
      },
    });
  }
}
