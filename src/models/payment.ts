export interface PaymentModal{
  stripeId: string,
  paymentByUser: number,
  paymentToUser: number,
  paymentDate: Date,
  amount: number,
  carId: number,
}