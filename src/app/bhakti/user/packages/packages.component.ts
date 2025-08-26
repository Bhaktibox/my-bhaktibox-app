import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent {
  packages = [
    { id: 1, name: 'Ganesh Puja', description: 'Complete Ganesh Chaturthi package' },
    { id: 2, name: 'Lakshmi Puja', description: 'Special Diwali Lakshmi Puja package' },
    { id: 3, name: 'Satyanarayan Puja', description: 'Full Satyanarayan Puja kit' },
    { id: 4, name: 'Navratri Puja', description: 'Navratri essentials kit' },
    // ➕ Add more here
  ];

  constructor(private router: Router) {}

  viewPackage(id: number) {
    this.router.navigate(['/packages', id]);
  }
}
