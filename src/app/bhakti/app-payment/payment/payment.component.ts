import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  totalAmount: number = 0;
  paymentMethod: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const storedTotal = localStorage.getItem('totalAmount');
    if (storedTotal) {
      this.totalAmount = parseFloat(storedTotal);
    }
  }

  confirmPayment() {
    if (!this.paymentMethod) {
      alert('⚠️ Please select a payment method');
      return;
    }

    alert(`✅ Payment successful with ${this.paymentMethod}.
Total Paid: ₹${this.totalAmount}`);
    localStorage.removeItem('cart'); // Clear cart after payment
    this.router.navigate(['/home']); // Navigate back to home
  }
}
