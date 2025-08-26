import { Component } from '@angular/core';

interface ReturnRequest {
  id: number;
  orderId: number;
  customerName: string;
  product: string;
  type: 'Return' | 'Replacement';
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

@Component({
  selector: 'app-returns-management',
  templateUrl: './returns-management.component.html',
  styleUrls: ['./returns-management.component.scss']
})
export class ReturnsManagementComponent {
  requests: ReturnRequest[] = [
    { id: 1, orderId: 101, customerName: 'Ravi Kumar', product: 'Puja Package A', type: 'Return', reason: 'Damaged item', status: 'Pending' },
    { id: 2, orderId: 102, customerName: 'Sneha Sharma', product: 'Diya Set', type: 'Replacement', reason: 'Wrong size', status: 'Pending' },
    { id: 3, orderId: 103, customerName: 'Amit Verma', product: 'Incense Sticks', type: 'Return', reason: 'Not as described', status: 'Approved' },
  ];

  approveRequest(request: ReturnRequest) {
    request.status = 'Approved';
  }

  rejectRequest(request: ReturnRequest) {
    request.status = 'Rejected';
  }
}
