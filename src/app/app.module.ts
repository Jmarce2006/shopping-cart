import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { AuthService } from './shared/services/auth.service';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { CategoryListComponent } from './pages/category/category-list/category-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NavComponent } from './components/shared/nav/nav.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { CartComponent } from './pages/shopping-cart/cart/cart.component';
import { FiltersComponent } from './pages/shopping-cart/filters/filters.component';
import { ProductItemComponent } from './pages/shopping-cart/list-product/product-item/product-item.component';
import { ListProductComponent } from './pages/shopping-cart/list-product/list-product.component';
import { CartItemComponent } from './pages/shopping-cart/cart/cart-item/cart-item.component';
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ProductListComponent,
    CategoryListComponent,
    NavComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    ShoppingCartComponent,
    CartComponent,
    FiltersComponent,
    ProductItemComponent,
    ListProductComponent,
    CartItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
