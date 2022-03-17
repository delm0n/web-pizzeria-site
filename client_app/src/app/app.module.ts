import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TestConnComponent } from './test-conn/test-conn.component';
import { ModalComponentComponent } from './modal-component/modal-component.component';

import { ModalPizzaService } from './modal-pizza.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TestTailwComponent } from './test-tailw/test-tailw.component';
import { AppNavComponent } from './myapp/app-nav/app-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    TestConnComponent,
    ModalComponentComponent,
    TestTailwComponent,
    AppNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [ModalPizzaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
