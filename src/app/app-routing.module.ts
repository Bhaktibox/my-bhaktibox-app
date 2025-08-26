import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LandingComponent } from './landing-page/landing/landing.component';
import { SigninComponent } from './auth/signin/signin.component';
import { CompleteDetailsComponent } from './auth/complete-details/complete-details.component';
import { AuthGuard } from './shared/auth.guard';
import { Error404Component } from './shared/error404/error404.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { PaymentComponent } from './bhakti/app-payment/payment/payment.component';
import { HomeComponent } from './bhakti/user/home/home.component';
import { PackageDetailComponent } from './bhakti/user/package-detail/package-detail.component';
import { PackagesComponent } from './bhakti/user/packages/packages.component';
import { CategoryComponent } from './bhakti/user/category/category.component';
import { UploadComponent } from './bhakti/user/upload/upload.component';
import { CartComponent } from './bhakti/user/cart/cart.component';
import { ProfileComponent } from './bhakti/user/profile/profile.component';
import { OrdersComponent } from './bhakti/user/orders/orders.component';
import { SaveCartComponent } from './bhakti/user/saved-cart/saved-cart.component';
import { AdminGuard } from './shared/admin.guard';
import { AdminDashboardComponent } from './bhakti/admin/admin-dashboard/admin-dashboard.component';
import { PincodeManagementComponent } from './bhakti/admin/pincode-management/pincode-management.component';
import { AssignDeliveriesComponent } from './bhakti/admin/assign-deliveries/assign-deliveries.component';
import { OrdersManagementComponent } from './bhakti/admin/orders-management/orders-management.component';
import { UsersManagementComponent } from './bhakti/admin/users-management/users-management.component';
import { EmployeesManagementComponent } from './bhakti/admin/employees-management/employees-management.component';
import { ReturnsManagementComponent } from './bhakti/admin/returns-management/returns-management.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'complete-details', component: CompleteDetailsComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'home', component: HomeComponent },
  { path: 'packages/:id', component: PackageDetailComponent },
  { path: 'packages', component: PackagesComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'my-orders', component: OrdersComponent },
  { path: 'saved-carts', component: SaveCartComponent },

  // { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  // { path: 'admin', component: AdminGuard, canActivate: [AdminGuard] },
  // { path: 'admin', component: AdminDashboardComponent},

  {
    path: 'admin',
    // canActivate: [AdminGuard],
    children: [
      { path: '', component: AdminDashboardComponent , pathMatch: 'full'},
      { path: 'pincodes', component: PincodeManagementComponent },
      { path: 'assign-deliveries', component: AssignDeliveriesComponent },
      { path: 'returns', component: ReturnsManagementComponent },
      { path: 'orders', component: OrdersManagementComponent },
      { path: 'users', component: UsersManagementComponent },
      { path: 'employees', component: EmployeesManagementComponent },
    ],
  },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
