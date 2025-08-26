import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  // Modals
  showCancelModal = false;
  showReturnModal = false;
  showReplaceModal = false;

  selectedOrder: any = null;

  // Reasons
  returnReason = '';
  replaceReason = '';
  uploadedFile: File | null = null;

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    const stored = localStorage.getItem('orders');
    if (stored) {
      this.orders = JSON.parse(stored);
    } else {
      // Dummy orders for now
      this.orders = [
        { id: 1, item: 'Brass Diya', amount: 250, status: 'Pending', deliveryPerson: 'Ravi Kumar' },
        { id: 2, item: 'Incense Sticks', amount: 120, status: 'Shipped', deliveryPerson: 'Amit Singh' },
        { id: 3, item: 'Puja Thali', amount: 500, status: 'Out for Delivery', deliveryPerson: 'Suresh Yadav' },
        { id: 4, item: 'Camphor', amount: 80, status: 'Delivered', deliveryPerson: null },
        { id: 5, item: 'Bell', amount: 300, status: 'Cancelled', deliveryPerson: null }
      ];
    }
  }

  saveOrders() {
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  // Cancel
  openCancelModal(order: any) {
    this.selectedOrder = order;
    this.showCancelModal = true;
  }

  closeCancelModal() {
    this.showCancelModal = false;
    this.selectedOrder = null;
  }

  confirmCancel() {
    if (this.selectedOrder) {
      this.selectedOrder.status = 'Cancelled';
      this.selectedOrder.deliveryPerson = null;
      this.saveOrders();
    }
    this.closeCancelModal();
  }

  // Return
  openReturnModal(order: any) {
    this.selectedOrder = order;
    this.showReturnModal = true;
  }

  closeReturnModal() {
    this.showReturnModal = false;
    this.returnReason = '';
    this.uploadedFile = null;
    this.selectedOrder = null;
  }

  confirmReturn() {
    if (this.selectedOrder) {
      this.selectedOrder.status = 'Return Requested';
      this.saveOrders();
    }
    this.closeReturnModal();
  }

  // Replace
  openReplaceModal(order: any) {
    this.selectedOrder = order;
    this.showReplaceModal = true;
  }

  closeReplaceModal() {
    this.showReplaceModal = false;
    this.replaceReason = '';
    this.selectedOrder = null;
  }

  confirmReplace() {
    if (this.selectedOrder) {
      this.selectedOrder.status = 'Replace Requested';
      this.saveOrders();
    }
    this.closeReplaceModal();
  }

  // Upload file
  onFileUpload(event: any) {
    this.uploadedFile = event.target.files[0];
  }
}
