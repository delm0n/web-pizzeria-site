import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestConnComponent } from './test-conn/test-conn.component';
import { TestTailwComponent } from './test-tailw/test-tailw.component';

const routes: Routes = [
  {
    path: 'test',
    component: TestConnComponent
  },

  {
    path: 'tailw',
    component: TestTailwComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
