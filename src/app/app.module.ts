import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

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
    LoadingComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot({ showMaskTyped: false })
  ],
  providers: [DataService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
