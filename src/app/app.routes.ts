import { Routes } from '@angular/router';
import { HomeComponent } from './Feature/component/home/home.component';
import { CartComponent } from './Feature/component/cart/cart.component';
import { ProductComponent } from './Feature/component/product/product.component';
import { PageNotFoundComponent } from './Shared/componnent/page-not-found/page-not-found.component';
import { SignUpComponent } from './Feature/authentication/sign-up/sign-up.component';
import { SignInComponent } from './Feature/authentication/sign-in/sign-in.component';
import { WishlistComponent } from './Feature/component/wishlist/wishlist.component';
import { checkverifyCodeGuard } from './Shared/guards/auth/CheckVerify/checkverify-code.guard';
import { loginGuard } from './Shared/guards/auth/LogIn/login.guard';
import { logOutGuard } from './Shared/guards/auth/logOut/log-out.guard';
import { SpecificProductComponent } from './Feature/component/specific-product/specific-product.component';
import { CheckoutComponent } from './Feature/component/checkout/checkout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'FreshCart:Home' },
  {
    path: 'cart',
    component: CartComponent,
    title: 'FreshCart:Cart',
    canActivate: [loginGuard],
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    title: 'FreshCart:Wish List',
    canActivate: [loginGuard],
  },
  {
    path: 'changePassword',
    loadComponent: () =>
      import(
        './Feature/authentication/change-password/change-password.component'
      ).then((m) => m.ChangePasswordComponent),
    title: 'FreshCart:changePassword',
    canActivate: [loginGuard],
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./Feature/component/categories/categories.component').then(
        (m) => m.CategoriesComponent
      ),
    title: 'FreshCart:Categories',
  },
  {
    path: 'product',
    component: ProductComponent,
    title: 'FreshCart:Shop Online',
  },
  {
    path: 'product/:id',
    component: SpecificProductComponent,
    title: 'FreshCart:product',
  },
  {
    path: 'brands',
    loadComponent: () =>
      import('./Feature/component/brands/brands.component').then(
        (m) => m.BrandsComponent
      ),
    title: 'FreshCart:Brands',
  },
  {
    path: 'allorders',
    loadComponent: () =>
      import('./Feature/component/allorders/allorders.component').then(
        (m) => m.AllordersComponent
      ),
    title: 'FreshCart:All Orders',
    canActivate: [loginGuard],
  },
  {
    path: 'signUp',
    component: SignUpComponent,
    title: 'FreshCart:SignUp',
    canActivate: [logOutGuard],
  },
  { path: 'signIn', component: SignInComponent, title: 'FreshCart:SignIn' },
  {
    path: 'contactUs',
    loadComponent: () =>
      import('./Feature/component/contactus/contactus.component').then(
        (m) => m.ContactusComponent
      ),
    title: 'FreshCart:Contact us',
  },
  {
    path: 'checkOut',
    component: CheckoutComponent,
    title: 'FreshCart:checkOut',
  },
  {
    path: 'forgetPassword',
    loadComponent: () =>
      import(
        './Feature/authentication/forgot-password/forgot-password.component'
      ).then((m) => m.ForgotPasswordComponent),
    title: 'FreshCart:forgetPassword',
    canActivate: [logOutGuard],
  },
  {
    path: 'code',
    loadComponent: () =>
      import('./Feature/authentication/email-code/email-code.component').then(
        (m) => m.EmailCodeComponent
      ),
    title: 'FreshCart:forgetPassword',
    canActivate: [logOutGuard],
  },
  {
    path: 'resetPassword',
    loadComponent: () =>
      import(
        './Feature/authentication/reset-password/reset-password.component'
      ).then((m) => m.ResetPasswordComponent),
    title: 'FreshCart:forgetPassword',
    canActivate: [checkverifyCodeGuard, logOutGuard],
  },
  { path: '**', component: PageNotFoundComponent, title: '404' },
];
