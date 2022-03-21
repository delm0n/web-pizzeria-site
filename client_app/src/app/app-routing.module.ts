import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestConnComponent } from './test-conn/test-conn.component';
import { HomePageComponent } from './myapp/home-page/home-page.component';

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
    path: 'tailw',
    component: TestConnComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
