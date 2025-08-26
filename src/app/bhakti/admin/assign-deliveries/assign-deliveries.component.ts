import { Component, OnInit } from '@angular/core';

interface Order {
  id: number;
  customerName: string;
  product: string;
  status: string;
  pincode: string;
  city: string;   // ✅ added city
}

interface Shopkeeper {
  id: number;
  name: string;
  pincode: string;
  city: string;
}

interface DeliveryAgent {
  id: number;
  name: string;
  pincode: string;
  city: string;
}

@Component({
  selector: 'app-assign-deliveries',
  templateUrl: './assign-deliveries.component.html',
  styleUrls: ['./assign-deliveries.component.scss']
})
export class AssignDeliveriesComponent implements OnInit {
  orders: Order[] = [];
  shopkeepers: Shopkeeper[] = [];
  agents: DeliveryAgent[] = [];

  filteredShopkeepers: Shopkeeper[] = [];
  filteredAgents: DeliveryAgent[] = [];

  selectedOrderId: number | null = null;
  selectedShopkeeperId: number | null = null;
  selectedAgentId: number | null = null;

  ngOnInit(): void {
    // Dummy Orders with pincode + city
    this.orders = [
      { id: 1, customerName: 'Ramesh', product: 'Puja Kit', status: 'Pending', pincode: '560001', city: 'Bengaluru' },
      { id: 2, customerName: 'Sita', product: 'Diya Set', status: 'Pending', pincode: '560002', city: 'Mysuru' }
    ];

    // Shopkeepers with city
    this.shopkeepers = [
      { id: 1, name: 'Shopkeeper A', pincode: '560001', city: 'Bengaluru' },
      { id: 2, name: 'Shopkeeper B', pincode: '560002', city: 'Mysuru' }
    ];

    // Agents with city
    this.agents = [
      { id: 1, name: 'Agent X', pincode: '560001', city: 'Bengaluru' },
      { id: 2, name: 'Agent Y', pincode: '560002', city: 'Mysuru' }
    ];
  }

  onOrderChange() {
    const order = this.orders.find(o => o.id === this.selectedOrderId);
    if (order) {
      // Filter based on order's pincode
      this.filteredShopkeepers = this.shopkeepers.filter(s => s.pincode === order.pincode);
      this.filteredAgents = this.agents.filter(a => a.pincode === order.pincode);

      // reset selections
      this.selectedShopkeeperId = null;
      this.selectedAgentId = null;
    } else {
      this.filteredShopkeepers = [];
      this.filteredAgents = [];
    }
  }

  assignDelivery() {
    if (!this.selectedOrderId || !this.selectedShopkeeperId || !this.selectedAgentId) {
      alert('⚠️ Please select all fields before assigning!');
      return;
    }

    const order = this.orders.find(o => o.id === this.selectedOrderId);
    const shopkeeper = this.shopkeepers.find(s => s.id === this.selectedShopkeeperId);
    const agent = this.agents.find(a => a.id === this.selectedAgentId);

    alert(
      `✅ Order #${order?.id} (${order?.product}) for ${order?.customerName} [${order?.city}, ${order?.pincode}]
       assigned to ${shopkeeper?.name} and delivered by ${agent?.name}`
    );

    // Later: API call to save this assignment
    this.selectedOrderId = null;
    this.selectedShopkeeperId = null;
    this.selectedAgentId = null;
    this.filteredShopkeepers = [];
    this.filteredAgents = [];
  }
}
