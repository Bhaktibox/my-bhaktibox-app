import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface Address {
  id: number;
  name: string;
  phone: string;
  street: string;
  city: string;
  pincode: string;
  landmark?: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartItems = [
    { name: 'Agarbatti', price: 50, quantity: 2 },
    { name: 'Diya', price: 30, quantity: 5 },
    { name: 'Kumkum', price: 20, quantity: 1 },
  ];
  addresses: Address[] = [
    {
      id: 1,
      name: 'Rahul Sharma',
      phone: '9876543210',
      street: '123 MG Road',
      city: 'Bengaluru',
      pincode: '560001',
      landmark: 'Near Metro Station',
    },
    {
      id: 2,
      name: 'Priya Verma',
      phone: '9123456780',
      street: '45 Park Street',
      city: 'Kolkata',
      pincode: '700016',
      landmark: 'Beside City Mall',
    },
    {
      id: 3,
      name: 'Amit Patel',
      phone: '9988776655',
      street: '78 Nehru Nagar',
      city: 'Ahmedabad',
      pincode: '380015',
      landmark: 'Opposite Hospital',
    },
  ];

  // Current manual entry
  address: Address = {
    id: 0,
    name: '',
    phone: '',
    street: '',
    city: '',
    pincode: '',
    landmark: '',
  };

  selectedAddressId: number | null = null;
  useNewAddress: boolean = false;
  editAddressId: number | null = null; // ✅ Added this property

  constructor(private router: Router) {
    this.loadCart();
    this.loadAddresses();
  }

  // =================== CART ===================
  increaseQty(item: CartItem) {
    item.quantity++;
    this.saveCart();
  }

  decreaseQty(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.saveCart();
    }
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    // this.saveCart();
  }

  getSubtotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  getTotal(): number {
    return this.getSubtotal(); // future: add shipping, tax
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cart');
  }

  saveCart() {
    if (this.cartItems.length === 0) {
      alert('⚠️ Cart is empty, nothing to save.');
      return;
    }

    const savedCart = {
      id: Date.now(),
      items: this.cartItems,
      total: this.getTotal(),
    };

    // ✅ Save into localStorage
    const stored = localStorage.getItem('savedCarts');
    const savedCarts = stored ? JSON.parse(stored) : [];
    savedCarts.push(savedCart);
    localStorage.setItem('savedCarts', JSON.stringify(savedCarts));

    // ✅ Clear active cart
    this.cartItems = [];
    localStorage.removeItem('cart');

    alert('✅ Cart saved successfully!');
    this.router.navigate(['/saved-carts']);
  }

  // loadCart() {
  //   const stored = localStorage.getItem('cart');
  //   if (stored) {
  //     this.cartItems = JSON.parse(stored);
  //   }
  // }

  loadCart() {
    const stored = localStorage.getItem('cart');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length > 0) {
        this.cartItems = parsed;
      } else {
        // fallback to defaults
        // this.cartItems = [
        //   { name: 'Agarbatti', price: 50, quantity: 2 },
        //   { name: 'Diya', price: 30, quantity: 5 },
        //   { name: 'Kumkum', price: 20, quantity: 1 },
        // ];
      }
    } else {
      // no cart in localStorage → load defaults
      // this.cartItems = [
      //   { name: 'Agarbatti', price: 50, quantity: 2 },
      //   { name: 'Diya', price: 30, quantity: 5 },
      //   { name: 'Kumkum', price: 20, quantity: 1 },
      // ];
    }
  }

  // =================== ADDRESSES ===================
  saveAddress() {
    this.useNewAddress = true;
    if (!this.isAddressValid()) {
      alert('⚠️ Please fill all required address fields.');
      return;
    }

    if (this.editAddressId) {
      // ✅ Update existing address
      const index = this.addresses.findIndex(
        (addr) => addr.id === this.editAddressId
      );
      if (index > -1) {
        this.addresses[index] = { ...this.address, id: this.editAddressId };
      }
      this.editAddressId = null; // reset after editing
    } else {
      // ✅ New address
      this.address.id = Date.now();
      this.addresses.push({ ...this.address });
      this.selectedAddressId = this.address.id;
    }

    // ✅ Reset form
    this.address = {
      id: 0,
      name: '',
      phone: '',
      street: '',
      city: '',
      pincode: '',
      landmark: '',
    };

    this.useNewAddress = false;
    this.saveAddresses();
  }




  saveAddresses() {
    localStorage.setItem('addresses', JSON.stringify(this.addresses));
  }

  loadAddresses() {
    const stored = localStorage.getItem('addresses');
    if (stored) {
      this.addresses = JSON.parse(stored);
    }
  }

  isAddressValid(): boolean {
    if (this.useNewAddress) {
      return (
        this.address.name.trim() !== '' &&
        this.address.phone.trim() !== '' &&
        this.address.street.trim() !== '' &&
        this.address.city.trim() !== '' &&
        this.address.pincode.trim() !== ''
      );
    } else {
      return this.selectedAddressId !== null;
    }
  }

  editAddress(addr: Address) {
    this.address = { ...addr };
    this.useNewAddress = true;
    this.editAddressId = addr.id; // ✅ keep track of editing
  }

  deleteAddress(id: number) {
    this.addresses = this.addresses.filter((addr) => addr.id !== id);
    if (this.selectedAddressId === id) {
      this.selectedAddressId = null;
    }
    this.saveAddresses();
  }

  cancelEdit() {
    this.editAddressId = null; // stop editing mode
    this.address = {
      id: 0,
      name: '',
      phone: '',
      street: '',
      city: '',
      pincode: '',
      landmark: '',
    };
    this.useNewAddress = false; // hide manual form again
  }

  // =================== PAYMENT ===================
  continueToPayment() {
    if (!this.isAddressValid() || this.cartItems.length === 0) {
      alert(
        '⚠️ Please select or enter a valid address and ensure cart is not empty.'
      );
      return;
    }

    alert('✅ Proceeding to payment...');
    // Example: this.router.navigate(['/payment']);
    this.router.navigate(['/payment']);
  }
}
