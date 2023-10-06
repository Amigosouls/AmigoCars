import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cities } from 'src/models/cities';
import { CitiesService } from 'src/services/cities.service';
import {FormGroup, FormControl, NgForm, Validators, Form} from '@angular/forms'

import { MessageService } from 'primeng/api';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { UserService } from 'src/services/user.service';
import { Users } from 'src/models/users';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  citiesData: Cities[] = [];
  showImg:boolean=true;
  
  constructor(private userService:UserService,private cityService: CitiesService, private messages:MessageService, private http:HttpClient) {}
  registrationForm!:FormGroup;
  userName!:FormControl;
  password!:FormControl;
  userEmail!:FormControl;
  userAddress!:FormControl
  img!:FormControl;
  roleId!:FormControl
  Pincode!:FormControl;
  CircleName!:FormControl;
  RegionName!:FormControl;
  DivisionName!:FormControl;
  OfficeName!:FormControl;
  DistrictName!:FormControl;
  StateName!:FormControl;
  imgPath:string='';
  addressDetails!:FormGroup;
  public message!:string;
  public progress!:number;
  public response:any={dbPath:''};
  ngOnInit(): void {
    this.userName = new FormControl('',[Validators.required]);
    this.password = new FormControl('',[Validators.required]);
    this.userEmail = new FormControl('',[Validators.required]);
    this.img= new FormControl('');
    this.userAddress = new FormControl('');
    this.Pincode = new FormControl('',[Validators.minLength(6),Validators.pattern(/^[0-9]*$/)]);
    this.roleId= new FormControl('');
    this.RegionName = new FormControl('');
    this.DivisionName = new FormControl('');
    this.OfficeName = new FormControl('',[Validators.required]);
    this.CircleName = new FormControl('');
    this.DistrictName = new FormControl('');
    this.StateName = new FormControl('');
    this.registrationForm = new FormGroup({
      userName:this.userName,
      userEmail:this.userEmail,
      password:this.password,
      roleId:this.roleId,
      userAddress:this.userAddress,
      img:this.img
    });
    this.addressDetails = new FormGroup({
      CircleName:this.CircleName,
      RegionName:this.RegionName,
      DivisionName:this.DivisionName,
      OfficeName:this.OfficeName,
      DistrictName:this.DistrictName,
      StateName:this.StateName,
      Pincode:this.Pincode

    })
  }
  findCity(pin:number):void{
    this.cityService.getCities(pin).subscribe({
      next: (res) => {
        this.citiesData = res;
        console.log(res);
        this.messages.add({ severity: 'info', summary: 'PinCode Found', detail: 'Select Your Office Name', sticky: true });
      },
      error: (err) => {
        console.log(err);
        alert(err?.error.Message);
      },
    });
  }

  OnSubmit(details:Users):void{
    details.isDeleted=false;
    details.lastLogin=new Date; 
    details.roleId=1;
    this.userService.postUsers(details);
    this.registrationForm.reset();
    this.addressDetails.reset();
    
  };

  setAddress(){
    const searchIndex = this.citiesData.filter((city) => city.id==this.OfficeName.value);
    console.log(searchIndex)
    if(searchIndex!=null && searchIndex.length>0){
      this.RegionName.setValue(searchIndex[0].regionName);
    this.DivisionName.setValue(searchIndex[0].divisionName);
    this.CircleName.setValue(searchIndex[0].circleName);
    this.DistrictName.setValue(searchIndex[0].district);
    this.StateName.setValue(searchIndex[0].stateName);
    this.userAddress.setValue(searchIndex[0].id);
    }

  }
  public uploadFinished=(event:any)=>{
    this.response = event;
    this.img.setValue(this.response.dbPath);
    console.log(this.response.dbPath)
    this.showImg = false;
    this.imgPath= `https://localhost:44304/${this.response.dbPath}`
  }
}
