import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environments';
import { PaymentModal } from 'src/models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient:HttpClient, private messages:MessageService) { }
  savePaymentStatus(paymentData:PaymentModal){
    this.httpClient.post<PaymentModal>(environment.payment,paymentData).subscribe(
      {
        next: (res => {
          this.messages.add({ severity: 'success', summary: 'Payment Success', detail: 'Payment Was successfully made and mail has been sent!', sticky: true });
         
        }),
        error: (err => {
          this.messages.add({ severity: 'error', summary: ' Error occured', detail: err?.error, sticky: true });
        })
      }
    )
  }
}
