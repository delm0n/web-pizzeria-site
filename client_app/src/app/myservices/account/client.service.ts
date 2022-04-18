import { Injectable } from '@angular/core';
import { ClientClass } from '../../models/ClientClass';
import { CartService } from '../cart/cart.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  autorizationFlug = false;
  
  client:ClientClass  = {
    clientId : 0,
    firstName : "",
    telephone : "",
    password : "",
    //pizzaCartJson : ""
  }

  enterClient(entity: any) {
    //клиент входит
    this.client.clientId = entity["ClientId"];
    this.client.firstName = entity["FirstName"];
    this.client.telephone = entity["Telephone"];
    this.client.password = entity["Password"];
    //this.client.pizzaCartJson = entity["PizzaCartJson"];
    
    this.autorizationFlug = true;
    
    //получаем корзину с пиццами клиента 
    this.cartService.getPizzasFromCartServer(this.client.clientId, this.client.firstName);

  }

  exitClient() {
    this.client = {
      clientId : 0,
      firstName : "",
      telephone : "",
      password : "",
    }

    this.autorizationFlug = false;
    this.cartService.pizzasInCart_server = [];

  }

  constructor(private cartService:CartService, private router: Router) { }
}
