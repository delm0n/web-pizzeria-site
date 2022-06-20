import { Injectable } from '@angular/core';
import { ClientClass } from '../../models/ClientClass';
import { CartService } from '../cart/cart.service';
import {Router} from '@angular/router';
import { DishesService } from '../dishes/dishes.service';
import { OrderClass } from 'src/app/models/OrderClass';
import axios from 'axios';
import { DishesCartClass } from 'src/app/models/DishCartClass';
import { PizzaCartClass } from 'src/app/models/PizzaCartClass';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  autorizationFlug = false;
  orders: OrderClass[] = [];
  
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
    
    //получаем корзину с пиццами и допами клиента 
    
    this.synchronizationCart(this.client.clientId, this.client.firstName, 
      this.cartService.pizzasInCart, this.dishesService.dishesCart)

    // посчитать количество до и после синхронизации и вывести уведомление

  }

  registClient(entity: any) {
    this.client.clientId = entity["ClientId"];
    this.client.firstName = entity["FirstName"];
    this.client.telephone = entity["Telephone"];
    this.client.password = entity["Password"];
    this.client.email = entity["Email"];
    
    this.autorizationFlug = true;

    this.synchronizationCart(this.client.clientId, this.client.firstName, 
      this.cartService.pizzasInCart, this.dishesService.dishesCart)


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
    //this.cartService.pizzasInCart_server = [];
    //this.dishesService.dishesCart_server = [];
    this.orders = [];

  }

  getOrders() {
    axios.get('http://localhost:1234/get-orders/' + this.client.clientId,
        {
          headers: {
            'Authorization': sessionStorage.getItem('token')!,
          }
        })
        .then((res) => {
          if (res.status == 200) {
            //console.log();
            this.orders=[]
            for (let i = 0; i < JSON.parse(res.headers["order"]).length; i++) {

              let ord: OrderClass = {
                DateOrder: JSON.parse(res.headers["order"])[i].DateOrder,
                OrderId: JSON.parse(res.headers["order"])[i].OrderId,
                TypeOfPay: JSON.parse(res.headers["order"])[i].TypeOfPay,
                LastPrice: JSON.parse(res.headers["order"])[i].LastPrice,
                PizzaIdJson: JSON.parse(JSON.parse(res.headers["order"])[i].PizzaIdJson)
              }
              this.orders.push(ord);
              
            }
          }
        })
        .catch((err) => {
          this.router.navigate(['/404']);
        })
  }

  synchronizationCart(id_client: number, name_client: string, pizzaCart: PizzaCartClass[], dishesCart: DishesCartClass[]) {
    axios.post('http://localhost:1234/synchronization-cart', {
      pizzas: JSON.stringify(pizzaCart),
      dishes: JSON.stringify(dishesCart),
      clientId: id_client
    },
      {
        headers: {
          'Authorization': sessionStorage.getItem('token')!,
        }
      })
      .then((res) => {
        let counterCart = this.cartService.pizzasInCart.length + this.dishesService.dishesCart.length;
        this.cartService.pizzasInCart = JSON.parse(res.headers["pizzas"]);
        this.dishesService.dishesCart = JSON.parse(res.headers["dishes"]);

        if (counterCart < this.cartService.pizzasInCart.length + this.dishesService.dishesCart.length) {
          this.notifyClient(name_client);
        }

      })
      .catch((err) => {
        console.log(err.message);
        
      })
  }


  notifyClient(name_client: string) {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    else if (Notification.permission === "granted") {
      // If it's okay 
      var notification = new Notification(name_client + "!", {
        tag: "ache-mail",
        body: "В корзине есть блюда, добавленные ранее...",
        icon: "https://img.icons8.com/ios-glyphs/90/000000/pizza.png"
      });
    }

    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          var notification = new Notification(name_client + "!", {
            tag: "ache-mail",
            body: "В корзине есть блюда, добавленные ранее...",
            icon: "https://img.icons8.com/ios-glyphs/90/000000/pizza.png"
          });
        }
      });
    }
  }

  constructor(private cartService:CartService, private router: Router,
    private dishesService:DishesService) { }
}
