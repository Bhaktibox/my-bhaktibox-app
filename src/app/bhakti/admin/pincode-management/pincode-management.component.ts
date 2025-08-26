import { Component } from '@angular/core';

interface DeliveryAgent {
  name: string;
  phone: string;
}

interface Pincode {
  code: string;
  shops: string[];
  agents: DeliveryAgent[];
}

@Component({
  selector: 'app-pincode-management',
  templateUrl: './pincode-management.component.html',
  styleUrls: ['./pincode-management.component.scss']
})
export class PincodeManagementComponent {
  pincodes: Pincode[] = [];

  newPincode: string = '';
  newShop: string = '';
  newAgentName: string = '';
  newAgentPhone: string = '';

  selectedPincode: Pincode | null = null;

  addPincode() {
    if (!this.newPincode.trim()) return;
    this.pincodes.push({ code: this.newPincode, shops: [], agents: [] });
    this.newPincode = '';
  }

  selectPincode(p: Pincode) {
    this.selectedPincode = p;
  }

  addShop() {
    if (this.selectedPincode && this.newShop.trim()) {
      this.selectedPincode.shops.push(this.newShop);
      this.newShop = '';
    }
  }

  addAgent() {
    if (this.selectedPincode && this.newAgentName.trim() && this.newAgentPhone.trim()) {
      this.selectedPincode.agents.push({ name: this.newAgentName, phone: this.newAgentPhone });
      this.newAgentName = '';
      this.newAgentPhone = '';
    }
  }
}
