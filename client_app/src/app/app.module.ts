import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TestConnComponent } from './test-conn/test-conn.component';

import { ModalPizzaService } from './modal-pizza.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppNavComponent } from './myapp/app-nav/app-nav.component';
import { HomePageComponent } from './myapp/home-page/home-page.component';
import { PizzasComponent } from './myapp/home-components/pizzas/pizzas.component';

@NgModule({
  declarations: [
    AppComponent,
    TestConnComponent,
    AppNavComponent,
    HomePageComponent,
    PizzasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [ModalPizzaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
