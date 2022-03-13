import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestConnComponent } from './test-conn/test-conn.component';

const routes: Routes = [
  {
    path: 'test',
    component: TestConnComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
