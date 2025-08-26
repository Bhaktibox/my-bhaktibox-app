import { Component } from '@angular/core';

interface Order {
  id: number;
  customerName: string;
  packageName?: string;   // if package
  items?: { name: string; qty: number }[]; // if multiple/custom items
  status: string;
  city: string;
  pincode: string;
}

@Component({
  selector: 'app-orders-management',
  templateUrl: './orders-management.component.html',
  styleUrls: ['./orders-management.component.scss']
})
export class OrdersManagementComponent {
  packages: string[] = [
    'Navratri Puja Package',
    'Diwali Special Package',
    'Ganesh Chaturthi Package',
    'Satyanarayan Puja Package'
  ];

  orders: Order[] = [
    {
      id: 1,
      customerName: 'Ravi Kumar',
      packageName: 'Navratri Puja Package',
      status: 'Pending',
      city: 'Delhi',
      pincode: '110001'
    },
    {
      id: 2,
      customerName: 'Priya Singh',
      items: [{ name: 'Agarbatti', qty: 2 }, { name: 'Diya', qty: 5 }],
      status: 'Shipped',
      city: 'Mumbai',
      pincode: '400001'
    },
    {
      id: 3,
      customerName: 'Amit Verma',
      items: [{ name: 'Flowers', qty: 10 }],
      status: 'Delivered',
      city: 'Lucknow',
      pincode: '226001'
    }
  ];

  editingOrder: Order | null = null;

  editOrder(order: Order) {
    this.editingOrder = { ...order };
  }

  saveOrder() {
    if (this.editingOrder) {
      const index = this.orders.findIndex(o => o.id === this.editingOrder!.id);
      if (index !== -1) this.orders[index] = { ...this.editingOrder };
      this.editingOrder = null;
    }
  }

  cancelEdit() {
    this.editingOrder = null;
  }

  deleteOrder(id: number) {
    this.orders = this.orders.filter(o => o.id !== id);
  }
}
