import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BuyCar, CarsData, PendingCars } from 'src/models/cars';
import { PaymentModal } from 'src/models/payment';
import { Users } from 'src/models/users';
import { CarsService } from 'src/services/cars.service';
import { PaymentService } from 'src/services/payment.service';
import { UserStoreService } from 'src/services/user-store.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-view-cars',
  templateUrl: './view-cars.component.html',
  styleUrls: ['./view-cars.component.css']
})
export class ViewCarsComponent implements OnInit {
  constructor(private carService:CarsService, private userStore:UserStoreService ,private userService:UserService, private messages:MessageService, private paymentService:PaymentService){}
  pendingCars:PendingCars[]=[];
  userDetails!:Users;
  paymentHandler:any=null;
  userRole:string=''
  ngOnInit(): void {
    this.userStore.getRoleFromStore()
        .subscribe(val=>{
          let roleFromToken = this.userService.getRoleFromToken();
          this.userRole = val || roleFromToken;
        });
    this.carService.getClaimedCars().subscribe(
      {
        next: (res => {
          this.pendingCars = res;         
        }),
        error: (err => {
          this.messages.add({ severity: 'danger', summary: 'No data Found', detail: err?.error, sticky: true });
        })
      }
    );
    this.userService.getLoggedUser(localStorage.getItem('email')).subscribe(
      (res)=>{
        this.userDetails = res;
      }
    );
    this.invokeStripe();
  }
  claimVehicle(carToClaim:PendingCars) {
    this.makePayment(carToClaim)
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
      let BoughtDetail:BuyCar={
        buyerId : this.userDetails.userId,
        carId : carDetails.carId,
        boughtDate : new Date()
      }
      this.paymentService.savePaymentStatus(PaymentModel);
      this.carService.buyCar(BoughtDetail);
      this.ngOnInit();
    }
  });
  paymentHandler.open({
    name: 'Amigo cars',
    description: 'Buy Car',
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
