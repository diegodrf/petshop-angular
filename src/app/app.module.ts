import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginPageComponent } from './pages/accounts/login-page/login-page.component';
import { ResetPasswordPageComponent } from './pages/accounts/reset-password-page/reset-password-page.component';
import { SignUpPageComponent } from './pages/accounts/sign-up-page/sign-up-page.component';
import { ProductsPageComponent } from './pages/store/products-page/products-page.component';
import { PetsPageComponent } from './pages/accounts/pets-page/pets-page.component';
import { CartPageComponent } from './pages/store/cart-page/cart-page.component';
import { BasePageComponent } from './pages/home/base-page/base-page.component';
import { ProductCardComponent } from './components/store/product-card/product-card.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { DataService } from './services/data.service';
import { AuthenticationService } from './services/authentication.service';
import { SecurityService } from './services/security.service';
import { ProfilePageComponent } from './pages/accounts/profile-page/profile-page.component';
import { CartService } from './services/cart.service';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginPageComponent,
    ResetPasswordPageComponent,
    SignUpPageComponent,
    ProductsPageComponent,
    PetsPageComponent,
    CartPageComponent,
    BasePageComponent,
    ProductCardComponent,
    LoadingComponent,
    ProfilePageComponent
  ],
  imports: [
    // Angular built-in
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,

    // Third-party
    NgxMaskModule.forRoot({ showMaskTyped: false }),
    BrowserAnimationsModule,
    ToastrModule.forRoot({ progressBar: true }),

    // Routing
    AppRoutingModule
  ],
  providers: [
    AuthenticationService,
    CartService,
    DataService,
    SecurityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
