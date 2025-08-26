import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-cart',
  templateUrl: './saved-cart.component.html',
  styleUrls: ['./saved-cart.component.scss'],
})
export class SaveCartComponent implements OnInit {
  savedCarts: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
  this.loadSavedCarts();

  // ✅ If no carts exist, create some dummy saved data
  if (this.savedCarts.length === 0) {
    const dummy = [
      {
        id: 1,
        savedAt: '2025-08-20 10:30 AM',
        items: [
          { name: 'Incense Sticks', price: 50, quantity: 2 },
          { name: 'Diya Oil', price: 120, quantity: 1 },
        ],
      },
      {
        id: 2,
        savedAt: '2025-08-21 09:15 PM',
        items: [
          { name: 'Camphor', price: 60, quantity: 3 },
          { name: 'Agarbatti Stand', price: 150, quantity: 1 },
        ],
      },
    ];

    localStorage.setItem('savedCarts', JSON.stringify(dummy));
    this.savedCarts = dummy;
  }
}


  // ✅ Load saved carts from localStorage
  loadSavedCarts() {
    const stored = localStorage.getItem('savedCarts');
    this.savedCarts = stored ? JSON.parse(stored) : [];
  }

  // ✅ Save current cart and clear it
  saveCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      let carts = this.savedCarts;
      carts.push({
        id: Date.now(),
        items: JSON.parse(cart),
        savedAt: new Date().toLocaleString(),
      });
      localStorage.setItem('savedCarts', JSON.stringify(carts));

      // clear current cart
      localStorage.removeItem('cart');

      this.savedCarts = carts;
      alert('✅ Cart saved successfully!');
    } else {
      alert('⚠️ No items in cart to save.');
    }
  }

  // ✅ Restore saved cart back to cart
  restoreCart(savedCart: any) {
    localStorage.setItem('cart', JSON.stringify(savedCart.items));
    alert('🛒 Cart restored successfully!');

    // Navigate back to Cart page
    this.router.navigate(['/cart']);
  }

  // ✅ Delete saved cart
  deleteCart(id: number) {
    this.savedCarts = this.savedCarts.filter(c => c.id !== id);
    localStorage.setItem('savedCarts', JSON.stringify(this.savedCarts));
  }
}
