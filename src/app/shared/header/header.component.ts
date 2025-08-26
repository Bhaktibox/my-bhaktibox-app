import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { customIcon } from '../../ui/icons';
import { NotificationCarrierService } from '../services/notification-carrier.service';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] // ✅ use css for mobile+desktop responsive design
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn!: boolean;
  loggingSubscription!: Subscription;

  // ✅ UI toggles
  showDropdown: boolean = false;
  showNotifications: boolean = false;
  showMobileMenu: boolean = false;

  // ✅ User data
  firstLetter: string = '';
  receivedData: any;

  // ✅ Branding
  mainlogo: string = customIcon.logo;

  // ✅ Notifications
  notifications: string | null = null;
  allNotifications: string[] = [];

  // initial messages (before user gets live ones)
  initialNotifications: string[] = [
    '🙏 Welcome to BhaktiBox!',
    '🛕 Explore Puja Aarti essentials with care.',
  ];

  // ✅ Cart items (replace with service later)
  cartItems: any[] = [
    { id: 1, name: 'Puja Thali' },
    { id: 2, name: 'Incense Sticks' },
  ];

  activeFragment: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    private notificationCarrier: NotificationCarrierService
  ) {
    // Subscribe to incoming notifications
    this.notificationCarrier.getData().subscribe((data) => {
      if (data) {
        this.notifications = data;
        this.allNotifications.push(this.notifications);

        // keep only last 6
        if (this.allNotifications.length > 6) {
          this.allNotifications.shift();
        }
      }
    });

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        this.activeFragment = this.router.parseUrl(this.router.url).fragment || '';
        console.log(this.activeFragment)
      });
  }

  ngOnInit(): void {
    // load initial messages
    this.allNotifications = [...this.initialNotifications];

    // watch login state
    this.loggingSubscription = this.authService.isAuthenticated.subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
      }
    );

    // get user data
    this.dataService.getData().subscribe((data) => {
      this.receivedData = data;
      this.firstLetter = this.receivedData?.name
        ? this.receivedData.name.charAt(0).toUpperCase()
        : '';
    });
  }

  // --- Notifications ---
  getNotificationCount(): number {
    return this.allNotifications.length;
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  // --- Cart ---
  getCartCount(): number {
    return this.cartItems.length;
  }

  // --- Profile dropdown ---
  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown(): void {
    this.showDropdown = false;
  }

  // --- Mobile Menu ---
  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  closeMobileMenu(): void {
    this.showMobileMenu = false;
  }

  // --- Role helpers ---
  isBidder(): boolean {
    return this.authService.getUserRole() === 'bidder';
  }

  isAuctioneer(): boolean {
    return this.authService.getUserRole() === 'auctionner';
  }

  switchProfile(role: string): void {
    if (role === 'auctionner') {
      this.authService.switchProfile(role);
      this.authService.setJustLoggedIn(true);
      this.router.navigate(['/auction-items']);
    }
    if (role === 'bidder') {
      this.authService.switchProfile(role);
      this.authService.setJustLoggedIn(true);
      this.router.navigate(['/bid-home-page']);
    }
  }

  // --- Icons ---
  getIconContent(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }

  ngOnDestroy(): void {
    if (this.loggingSubscription) {
      this.loggingSubscription.unsubscribe();
    }
  }
}
