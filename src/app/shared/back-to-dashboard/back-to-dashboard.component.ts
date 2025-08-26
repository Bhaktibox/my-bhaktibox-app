import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-to-dashboard',
  template: `
    <button class="back-btn" (click)="goBack()">
      ⬅ Back to Dashboard
    </button>
  `,
  styleUrls: ['./back-to-dashboard.component.scss']
})
export class BackToDashboardComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/admin']);
  }
}
