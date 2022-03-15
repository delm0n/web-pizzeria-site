import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TestConnComponent } from './test-conn/test-conn.component';
import { ModalComponentComponent } from './modal-component/modal-component.component';

import { ModalPizzaService } from './modal-pizza.service';

@NgModule({
  declarations: [
    AppComponent,
    TestConnComponent,
    ModalComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ModalPizzaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
