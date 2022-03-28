import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestConnComponent } from './test-conn/test-conn.component';
import { HomePageComponent } from './myapp/home-page/home-page.component';
import { LogInComponent } from './myapp/account/log-in/log-in.component';
import { RegistrationComponent } from './myapp/account/registration/registration.component';
import { ClientPageComponent } from './myapp/account/client-page/client-page.component';

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
    path: 'register',
    component: RegistrationComponent
  },

  {
    path: 'client',
    component: ClientPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
