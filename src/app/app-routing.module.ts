import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { CategoryListComponent } from './pages/category/category-list/category-list.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderListComponent } from './pages/order-list/order-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/catalog', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'category-list', component: CategoryListComponent, canActivate: [AuthGuard] },
  { path: 'catalog', component: CatalogComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'order-list', component: OrderListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
