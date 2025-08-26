import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface PackageItem {
  name: string;
  price: number;
  available: boolean;
  stockTime?: string; // e.g., "2 days", "In Stock"
  quantity: number;   // ✅ Added quantity field
}

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.scss']
})
export class PackageDetailComponent implements OnInit {
  packageId!: string;
  packageName = '';
  items: PackageItem[] = [];
  totalPrice = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.packageId = this.route.snapshot.paramMap.get('id') || '';

    // ✅ Hardcoded packages (later replace with API)
    if (this.packageId === '1') {
      this.packageName = 'Ganesh Puja Package';
      this.items = [
        { name: 'Incense Sticks', price: 50, available: true, stockTime: 'In Stock', quantity: 1 },
        { name: 'Coconut', price: 30, available: false, stockTime: '2 days', quantity: 1 },
        { name: 'Flowers', price: 100, available: true, stockTime: 'In Stock', quantity: 1 },
        { name: 'Rice', price: 40, available: true, stockTime: 'In Stock', quantity: 1 },
      ];
    } else if (this.packageId === '2') {
      this.packageName = 'Lakshmi Puja Package';
      this.items = [
        { name: 'Diya', price: 70, available: true, stockTime: 'In Stock', quantity: 1 },
        { name: 'Ghee', price: 150, available: false, stockTime: '3 days', quantity: 1 },
        { name: 'Red Cloth', price: 80, available: true, stockTime: 'In Stock', quantity: 1 },
      ];
    }

    this.updateTotalPrice();
  }

  // ✅ Increase quantity
  increaseQty(item: PackageItem) {
    item.quantity++;
    this.updateTotalPrice();
  }

  // ✅ Decrease quantity (min 1)
  decreaseQty(item: PackageItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateTotalPrice();
    }
  }

  // ✅ Recalculate total price
  updateTotalPrice() {
    this.totalPrice = this.items.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );
  }

  addToCart() {
    alert(`${this.packageName} added to cart!`);
    console.log("Cart Items:", this.items); // Later integrate with Cart Service
  }
}
