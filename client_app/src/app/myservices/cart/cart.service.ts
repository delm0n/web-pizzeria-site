import { Injectable } from '@angular/core';
import { PizzaCartClass } from '../../models/PizzaCartClass' 

import { ClientService } from '../account/client.service'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  pizzasInCart: PizzaCartClass[] = [];

  postInCartAsync() {
    if (this.clientService.autorizationFlug) {
      console.log("Вход оформлен, отправить данные");
      
    }
    else {
      console.log(this.pizzasInCart);
    }
    
    
  }
  //вызвать axios получение id

  constructor(private clientService: ClientService) { }
}
