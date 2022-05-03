import { Injectable } from '@angular/core';
import { ClientClass } from '../../models/ClientClass';
import { CartService } from '../cart/cart.service';
import {Router} from '@angular/router';
import { DishesService } from '../dishes/dishes.service';

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
    email : ""
  }

  enterClient(entity: any) {
    //клиент входит
    this.client.clientId = entity["ClientId"];
    this.client.firstName = entity["FirstName"];
    this.client.telephone = entity["Telephone"];
    this.client.password = entity["Password"];
    this.client.email = entity["Email"];
    
    this.autorizationFlug = true;
    
    //получаем корзину с пиццами клиента 
    this.cartService.getPizzasFromCartServer_enter(this.client.clientId, this.client.firstName);

    //получаем корзину с допами клиента
    this.dishesService.getDishFromCartServer(this.client.clientId, this.client.firstName);

  }

  exitClient() {
    this.client = {
      clientId : 0,
      firstName : "",
      telephone : "",
      password : "",
      email: ""
    }

    this.autorizationFlug = false;
    this.cartService.pizzasInCart_server = [];
    this.dishesService.dishesCart_server = [];

  }

  constructor(private cartService:CartService, private router: Router,
    private dishesService:DishesService,) { }
}
