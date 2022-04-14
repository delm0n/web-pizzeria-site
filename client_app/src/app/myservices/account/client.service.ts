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
    this.cartService.getPizzasFromCartServer(this.client.clientId);
    //отправляем ему уведомление, если в бд хранятся пиццы
    this.notifyClient(); 

    //здесь же вызвать отправку в бд выбранных нами пицц до этого
  }

  exitClient() {
    this.client = {
      clientId : 0,
      firstName : "",
      telephone : "",
      password : "",
    }

    this.autorizationFlug = false;
  }

  notifyClient() {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    else if (Notification.permission === "granted") {
      // If it's okay 
      var notification = new Notification(this.client.firstName + "!", {
        tag: "ache-mail",
        body: "В корзине есть блюда, добавленные ранее...",
        icon : "https://img.icons8.com/ios-glyphs/90/000000/pizza.png"
      });  
    }

    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then( (permission) => {
        if (permission === "granted") {
          var notification = new Notification(this.client.firstName + "!", {
            tag: "ache-mail",
            body: "В корзине есть блюда, добавленные ранее...",
            icon : "https://img.icons8.com/ios-glyphs/90/000000/pizza.png"
          });  
        }
      });
    }
  }


  constructor(private cartService:CartService, private router: Router) { }
}
