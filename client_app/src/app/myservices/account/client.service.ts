import { Injectable } from '@angular/core';
import { ClientClass } from '../../models/ClientClass';
import { CartService } from '../cart/cart.service';
import {Router} from '@angular/router';
import { DishesService } from '../dishes/dishes.service';
import { OrderClass } from 'src/app/models/OrderClass';
import axios from 'axios';

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




  constructor(private cartService:CartService, private router: Router,
    private dishesService:DishesService,) { }
}
