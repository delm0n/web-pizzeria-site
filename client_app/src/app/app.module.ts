import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestConnComponent } from './test-conn/test-conn.component';

//import { ModalPizzaService } from './modal-pizza.service';
import { ModalPizzaService } from '../app/myservices/modal-pizza/modal-pizza.service';
import { NgxMaskModule, IConfig } from 'ngx-mask'
const maskConfig: Partial<IConfig> = {
  validation: false,
};

import { AppNavComponent } from './myapp/app-nav/app-nav.component';
import { HomePageComponent } from './myapp/home-page/home-page.component';
import { PizzasComponent } from './myapp/home-components/pizzas/pizzas.component';
import { IngredientsComponent } from './myapp/home-components/ingredients/ingredients.component';
import { LogInComponent } from './myapp/account/log-in/log-in.component';
import { RegistrationComponent } from './myapp/account/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    TestConnComponent,
    AppNavComponent,
    HomePageComponent,
    PizzasComponent,
    IngredientsComponent,
    LogInComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [ModalPizzaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
