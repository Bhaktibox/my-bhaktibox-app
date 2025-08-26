import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing-page/landing/landing.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompleteDetailsComponent } from './auth/complete-details/complete-details.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { LogoutComponent } from './shared/logout/logout.component';
import {
  AUCTION_SERVICE_TOKEN,
  AuctionService,
} from './shared/services/auction.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BackComponent } from './shared/back/back.component';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Error404Component } from './shared/error404/error404.component';
import { ExitConfirmationComponent } from './shared/exit-confirmation/exit-confirmation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faLinkedin,
  faFacebookSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { BasicAuthHttpInterceptorService } from './shared/services/basic-auth-http-interceptor.service';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { PaginationComponent } from './bhakti/user/pagination/pagination.component';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { UppercasePipe } from './shared/services/uppercase.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaymentComponent } from './bhakti/app-payment/payment/payment.component';
import { CustomTimeFormatPipe } from './shared/services/CustomTimeFormatPipe';
import { OtpFormComponent } from './shared/otp-form/otp-form.component';
import { HomeComponent } from './bhakti/user/home/home.component';
import { PackageDetailComponent } from './bhakti/user/package-detail/package-detail.component';
import { PackagesComponent } from './bhakti/user/packages/packages.component';
import { CategoryComponent } from './bhakti/user/category/category.component';
import { UploadComponent } from './bhakti/user/upload/upload.component';
import { CartComponent } from './bhakti/user/cart/cart.component';
import { ProfileComponent } from './bhakti/user/profile/profile.component';
import { OrdersComponent } from './bhakti/user/orders/orders.component';
import { SaveCartComponent } from './bhakti/user/saved-cart/saved-cart.component';
import { AdminDashboardComponent } from './bhakti/admin/admin-dashboard/admin-dashboard.component';
import { PincodeManagementComponent } from './bhakti/admin/pincode-management/pincode-management.component';
import { AssignDeliveriesComponent } from './bhakti/admin/assign-deliveries/assign-deliveries.component';
import { OrdersManagementComponent } from './bhakti/admin/orders-management/orders-management.component';
import { UsersManagementComponent } from './bhakti/admin/users-management/users-management.component';
import { EmployeesManagementComponent } from './bhakti/admin/employees-management/employees-management.component';
import { ReturnsManagementComponent } from './bhakti/admin/returns-management/returns-management.component';
import { BackToDashboardComponent } from './shared/back-to-dashboard/back-to-dashboard.component';


library.add(faLinkedin, faFacebookSquare, faInstagram);

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignupComponent,
    SigninComponent,
    CompleteDetailsComponent,
    LoadingSpinnerComponent,
    LogoutComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    BackComponent,
    Error404Component,
    ExitConfirmationComponent,
    ForgotPasswordComponent,
    PaginationComponent,
    UppercasePipe,
    PaymentComponent,
    CustomTimeFormatPipe,
    OtpFormComponent,
    HomeComponent,
    PackageDetailComponent,
    PackagesComponent,
    CategoryComponent,
    UploadComponent,
    CartComponent,
    ProfileComponent,
    OrdersComponent,
    SaveCartComponent,
    AdminDashboardComponent,
    PincodeManagementComponent,
    AssignDeliveriesComponent,
    OrdersManagementComponent,
    UsersManagementComponent,
    EmployeesManagementComponent,
    ReturnsManagementComponent,
    BackToDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SlickCarouselModule,
    CommonModule,
    FontAwesomeModule,
    MatTooltipModule,

    // RouterModule.forRoot([]),
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: AUCTION_SERVICE_TOKEN, useClass: AuctionService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthHttpInterceptorService,
      multi: true,
    },
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
