import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  // Dummy data (normally returned by backend OCR)
  items = [
    { id: 1, name: 'Agarbatti', price: 50, quantity: 1, selected: true },
    { id: 2, name: 'Camphor', price: 30, quantity: 2, selected: true },
    { id: 3, name: 'Ghee', price: 120, quantity: 1, selected: false },
    { id: 4, name: 'Cotton Wicks', price: 40, quantity: 3, selected: true }
  ];
  fileName: string = '';

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.fileName = nav?.extras.state?.['fileName'] || '';
  }

  increaseQty(item: any) {
    item.quantity++;
  }

  decreaseQty(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  getSubtotal(): number {
    return this.items
      .filter(i => i.selected)
      .reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  getTotal(): number {
    // here you can add tax/delivery if needed
    return this.getSubtotal();
  }

  addToCart() {
    const selectedItems = this.items.filter(i => i.selected);
    console.log('Items added to cart:', selectedItems);
    alert('Items added to cart successfully!');
  }
}
