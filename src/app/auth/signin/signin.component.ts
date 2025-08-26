import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastMessageService } from '../../shared/services/toast-message.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Subscription } from 'rxjs';
import { customIcon } from '../../ui/icons';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],   // ✅ changed from styleUrl → styleUrls (array)
  animations: [
    trigger('fadeInAnimation', [
      state('fadeIn', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-50px)' }),
        animate('300ms ease'),
      ]),
      transition('* => void', [
        animate(
          '300ms ease',
          style({ opacity: 0, transform: 'translateY(-50px)' })
        ),
      ]),
    ]),
  ],
})
export class SigninComponent {
  mainlogo: string = customIcon.logo;

  signinForm: FormGroup;
  showPassword: boolean = false;
  animationState = 'fadeIn';
  user: { username: string; password: string } = { username: '', password: '' };
  signinSubscription!: Subscription;
  isLoggedIn!: boolean;
  response: any;
  error: any;




  constructor(
    private fb: FormBuilder,
    private toastMessage: ToastMessageService,
    private router: Router,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // ❌ removed selectedRole since it's not in the HTML anymore
    });
  }

  goBackToHome() {
    this.animationState = 'fadeOut';
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 300);
  }

  get username() {
    return this.signinForm.get('username');
  }

  get password() {
    return this.signinForm.get('password');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login(user: any) {
    this.authService
      .login(user) // ✅ simplified, no role
      .then((response: any) => {
        console.log('Login successful', response);
        this.response = response;

        this.signinSubscription = this.authService.isAuthenticated.subscribe(
          (loggedIn: boolean) => {
            this.isLoggedIn = loggedIn;
          }
        );

        if (response.authenticated && this.isLoggedIn) {
          this.toastMessage.openSnackBar('Welcome');
          this.router.navigate(['/']); // ✅ Redirect to home/dashboard
        } else {
          this.toastMessage.openSnackBar(response.message);
        }
      })
      .catch((error: any) => {
        console.error('Login failed', error);
        this.error = error;
        this.toastMessage.openSnackBar('Login failed. Please try again.');
      });
  }


  onSubmit() {
    if (this.signinForm.valid) {
      console.log('Sign-in attempt', this.signinForm.value);
      this.user.password = this.signinForm.value.password;
      this.user.username = this.signinForm.value.username;
      this.login(this.user);
    }
  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']); // ✅ matches HTML routerLink
  }

  getIconContent(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }
}
