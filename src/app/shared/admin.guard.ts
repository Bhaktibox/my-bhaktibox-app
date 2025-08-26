import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Check if logged in and role is admin
    // if (this.auth.isAuthenticated() && this.auth.getRole() === 'admin') {
    //   return true;
    // }

    // ❌ If not admin, redirect
    this.router.navigate(['/']);
    return false;
  }
}
