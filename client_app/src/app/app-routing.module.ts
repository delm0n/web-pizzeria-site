import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestConnComponent } from './test-conn/test-conn.component';
import { HomePageComponent } from './myapp/home-page/home-page.component';
import { LogInComponent } from './myapp/account/log-in/log-in.component';
import { RegistrationComponent } from './myapp/account/registration/registration.component';
import { ClientPageComponent } from './myapp/account/client-page/client-page.component';
import { NotFoundPageComponent } from '../app/myapp/not-found-page/not-found-page.component'
import { CartPageComponent } from './myapp/cart-page/cart-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },

  {
    path: 'test',
    component: TestConnComponent
  },

  {
    path: 'log-in',
    component: LogInComponent
  },


  {
    path: 'registration',
    component: RegistrationComponent
  },

  {
    path: 'client',
    component: ClientPageComponent
  },

  {
    path: '404',
    component: NotFoundPageComponent
  },

  {
    path: 'cart',
    component: CartPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
