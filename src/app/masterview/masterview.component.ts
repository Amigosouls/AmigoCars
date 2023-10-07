import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PendingCars } from 'src/models/cars';
import { PaymentModal } from 'src/models/payment';
import { Users } from 'src/models/users';
import { CarsService } from 'src/services/cars.service';
import { PaymentService } from 'src/services/payment.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-masterview',
  templateUrl: './masterview.component.html',
    styleUrls: ['./masterview.component.css']
})
export class MasterviewComponent implements OnInit {
  constructor(private carService:CarsService,private paymentService:PaymentService, private messages:MessageService, private userService:UserService){}
  pageSize:number=10;
  p:number=1;
  visible:boolean=false;
collection:PendingCars[]=[];
claimedCars:PendingCars[]=[];
sortParam: any;
userDetails!:Users;
deletedCar!:PendingCars;
searchTerm :string='';
searchClaimed:string='';
sortOrder: any;
sortingOption: any;
paymentHandler:any=null;
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
      }),
      error: (err => {
        this.messages.add({ severity: 'error', summary: 'Registration UnSuccessFull', detail: err?.error, sticky: true });
      })
    }
  );
  this.carService.getClaimedCars().subscribe(
    {
      next: (res => {
        this.claimedCars = res;        
      }),
      error: (err => {
        this.messages.add({ severity: 'error', summary: 'Registration UnSuccessFull', detail: err?.error, sticky: true });
      })
    }
  );
  this.userService.getLoggedUser(localStorage.getItem('email')).subscribe(
    (res)=>{
      this.userDetails = res;
      console.log(res);
    }
  );
  this.invokeStripe();
}
confirmDelete(carToDelete:PendingCars){
  this.visible=true;
  this.deletedCar = carToDelete
}
deleteCar(deletedCar:PendingCars){
this.carService.deleteCar(deletedCar.carId);
}
claimCar(carToClaim:PendingCars){
  this.makePayment(carToClaim);
}
makePayment(carDetails:PendingCars) {
  const paymentHandler = (<any>window).StripeCheckout.configure({
    key: 'pk_test_51NQoOgSIF8NYMtoSsE3ybqgFcjiafBmE6SgRG0LOoz02qHSXlYDYWfB0wcZzauNoi8fpI8CJ7WQCOqcIeBJG72Pf00sQlgKl12',
    locale: 'auto',
    token: (stripeToken: any) => {
      
      let PaymentModel:PaymentModal = {
        stripeId : stripeToken.id,
        paymentByUser : this.userDetails.userId,
        paymentToUser : carDetails.sellerId,
        paymentDate : new Date(),
        amount : carDetails.price,
        carId : carDetails.carId
      }
      this.paymentService.savePaymentStatus(PaymentModel);
      this.ngOnInit();
    }
  });
  paymentHandler.open({
    name: 'Amigo cars',
    description: 'Claim Car',
    amount: carDetails.price*100,
  });
}
invokeStripe() {
  if (!window.document.getElementById('stripe-script')) {
    const script = window.document.createElement('script');
    script.id = 'stripe-script';
    script.type = 'text/javascript';
    script.src = 'https://checkout.stripe.com/checkout.js';
    script.onload = () => {
      this.paymentHandler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_51NQoOgSIF8NYMtoSsE3ybqgFcjiafBmE6SgRG0LOoz02qHSXlYDYWfB0wcZzauNoi8fpI8CJ7WQCOqcIeBJG72Pf00sQlgKl12',
        locale: 'auto',
        token: function (stripeToken: any) {         
        }
      });
    }
    window.document.body.appendChild(script);
  }
}

}
