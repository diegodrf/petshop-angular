import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/accounts/login-page/login-page.component';
import { PetsPageComponent } from './pages/accounts/pets-page/pets-page.component';
import { ResetPasswordPageComponent } from './pages/accounts/reset-password-page/reset-password-page.component';
import { SignUpPageComponent } from './pages/accounts/sign-up-page/sign-up-page.component';
import { BasePageComponent } from './pages/home/base-page/base-page.component';
import { CartPageComponent } from './pages/store/cart-page/cart-page.component';
import { ProductsPageComponent } from './pages/store/products-page/products-page.component';
import { AuthenticationService } from './services/authentication.service';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'resetpassword', component: ResetPasswordPageComponent },
  { path: 'signup', component: SignUpPageComponent },
  {
    path: '',
    component: BasePageComponent,
    children: [
      {
        path: '',
        component: ProductsPageComponent,
        canActivate: [AuthenticationService]
      },
      {
        path: 'cart',
        component: CartPageComponent,
        canActivate: [AuthenticationService]
      }
    ]
  },
  {
    path: 'account',
    canActivate: [AuthenticationService],
    component: BasePageComponent,
    children: [
      { path: 'pets', component: PetsPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
