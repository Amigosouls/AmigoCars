import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CarsData } from 'src/models/cars';
import { Cities, Rto } from 'src/models/cities';
import { CarsService } from 'src/services/cars.service';
import { CitiesService } from 'src/services/cities.service';


@Component({
  selector: 'app-sellcar',
  templateUrl: './sellcar.component.html',
  styleUrls: ['./sellcar.component.css']
})
export class SellcarComponent implements OnInit {
  constructor(private citiesService:CitiesService, private messages:MessageService, private carsService:CarsService){}
aboutNo!:FormGroup;
registrationNo!:FormControl;
brand!:FormControl;
year!:FormControl;
modelName!:FormControl;
fuelType!:FormControl;
transmission!:FormControl;
rtoCircle!:FormControl;
kmDriven!:FormControl;
carLocation!:FormControl;
carImg!:FormControl;
price!:FormControl;
statePrefix!:FormControl;
districtCode!:FormControl;
rtoNames:Rto[]=[];
cardata:CarsData[]=[];
citiesData:Cities[]=[];
districtName!:FormControl;
rtoOffice!:FormControl;
variant!:FormControl;
showRto:boolean=true;
stateName!:FormControl;
aboutVehicle!:FormGroup;
brandName!:FormControl;
pincode!:FormControl;
maxPrice!:number;
sellingCarDetail!:FormGroup;
needfullData!:FormGroup;
OfficeName!:FormControl;
state!:FormControl;
public message!:string;
public progress!:number;
public response:any={dbPath:''};
showImg:boolean=true;
imgPath:string='';
ngOnInit(): void {
  this.statePrefix = new FormControl('',[Validators.required]);
  this.districtCode = new FormControl('',[Validators.required]);
  this.districtName = new FormControl('',[Validators.required]);
  this.stateName = new FormControl('',[Validators.required]);
  this.rtoOffice = new FormControl('',[Validators.required]);
  this.registrationNo = new FormControl('',[Validators.required]);
  this.variant = new FormControl('');
  this.modelName = new FormControl('',[Validators.required]);
  this.brandName = new FormControl('',[Validators.required]);
  this.fuelType = new FormControl('',[Validators.required]);
  this.price = new FormControl('');
  this.transmission = new FormControl('',[Validators.required]);
  this.kmDriven = new FormControl('',[Validators.required]);
  this.carLocation = new FormControl('',[Validators.required]);
  this.year = new FormControl('',[Validators.required, Validators.max(2023)]);
  this.carImg = new FormControl('',[Validators.required])
  this.pincode = new FormControl('',[Validators.required]);
  this.OfficeName = new FormControl('');
  this.state = new FormControl('');
  this.aboutNo = new FormGroup({
    statePrefix:this.statePrefix,
    districtCode:this.districtCode,
    districtName:this.districtName,
    stateName:this.stateName,
    rtoOffice:this.rtoOffice,
    registrationNo : this.registrationNo
  });
  this.aboutVehicle = new FormGroup({
    modelName:this.modelName,
    variant:this.variant,
    brandName:this.brandName,
    fuelType:this.fuelType,
    transmission:this.transmission,
    price:this.price
  });
  this.needfullData = new FormGroup({
    kmDriven : this.kmDriven,
    carLocation: this.carLocation,
    carImg : this.carImg,
    year:this.year,
    pincode:this.pincode,
    OfficeName:this.OfficeName,
    state:this.state
  });
  this.sellingCarDetail = new FormGroup({
    rtoOffice:this.rtoOffice,
    registrationNo : this.registrationNo,
    modelName:this.modelName,
    variant:this.variant,
    brandName:this.brandName,
    fuelType:this.fuelType,
    transmission:this.transmission,
    price:this.price,
    kmDriven : this.kmDriven,
    carLocation: this.carLocation,
    carImg : this.carImg,
    year:this.year
  })
}

  onSubmission(data:FormGroup){
   
    console.log(data);
  }
  
  findRto(rto:string):void{
    this.citiesService.getRto(rto).subscribe({
      next: (res) => {
        this.rtoNames = res;
        console.log(res);
        if(res.length>0){
          this.showRto=false;
        }
        this.messages.add({ severity: 'info', summary: 'Rto Found', detail: 'Select your RTO Name', sticky: true });
      },
      error: (err) => {
        console.log(err);
        alert(err?.error.Message);
      },
    });
  }
  setRto(){
    console.log(this.rtoOffice.value)
    const searchIndex = this.rtoNames.filter((rto) => rto.rtoId==this.rtoOffice.value);
    console.log(searchIndex)
    if(searchIndex!=null && searchIndex.length>0){
      this.stateName.setValue(searchIndex[0].state);
    }

  }
  carDetail(brand:string,model:string):void{
    if(this.brandName.valid && this.modelName.valid){
      this.carsService.getCarsData(brand,model).subscribe({
        next: (res) => {
          this.cardata=[];
          this.cardata = res;
          console.log(res)
          this.messages.add({ severity: 'info', summary: 'Find Success!', detail: 'Select Your Variant', sticky: true });
        },
        error: (err) => {
          console.log(err);
          alert(err?.error.Message);
        },
      });
    }
    else{    
      this.messages.add({ severity: 'error', summary: 'Incorrect Data', detail: 'Please Provide correct brand and model Name!', sticky: true });
    }
  }
  setCarDetails(){
    const searchIndex = this.cardata.filter((car) => car.carId==this.variant.value);
    this.brandName.setValue(searchIndex[0].make);
    this.modelName.setValue(searchIndex[0].model);
    this.variant.setValue(searchIndex[0].variant);
    this.fuelType.setValue(searchIndex[0].fuelType);
    this.maxPrice = searchIndex[0].price
  }

  public uploadFinished=(event:any)=>{
    this.response = event;
    this.carImg.setValue(this.response.dbPath);
    this.showImg = false;
    this.imgPath= `https://localhost:44304/${this.response.dbPath}`
  }
  setAddress(){
    const searchIndex = this.citiesData.filter((city) => city.id==this.OfficeName.value);
    if(searchIndex!=null && searchIndex.length>0){
      this.carLocation.setValue(searchIndex[0].id);
      this.state.setValue(searchIndex[0].stateName);
    }
  }

  findCity(pin:number):void{
    this.citiesService.getCities(pin).subscribe({
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
}
