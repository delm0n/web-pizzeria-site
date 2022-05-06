import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ClientService } from '../../../myservices/account/client.service';
import { Router } from '@angular/router';
import { ClientClass } from '../../../models/ClientClass'
import { OrderClass } from '../../../models/OrderClass'
import { CartService } from '../../../myservices/cart/cart.service';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { DishesService } from 'src/app/myservices/dishes/dishes.service';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css'],
  animations: [
    trigger(
      'alertsAnimation', [

      transition(
        ':enter',
        [
          style({ height: 0, opacity: 0 }),
          animate('0.4s ease-out',
            style({ height: 40, opacity: 1 }))
        ]
      ),
      transition(
        ':leave',
        [
          style({ height: 40, opacity: 1, display: 'none' }),
          animate('0s ease-out',
            style({ height: 0, opacity: 0 }))
        ]
      )

    ]
    )
  ]
})
export class ClientPageComponent implements OnInit {

  active_status = 0;
  orders: OrderClass[] = []

  client: ClientClass = {
    clientId: 0,
    firstName: "",
    telephone: "",
    password: "",
    email: ""
  }

  emptyError: boolean = false;
  successDone: boolean = false;

  hide: boolean = true;
  eyeFunction() {
    this.hide = !this.hide;
  }

  cartContainFlugView: boolean = false;
  checkContainCart() {
    if (this.cartService.pizzasInCart.length > 0 || this.dishesService.dishesCart.length > 0) {
      this.cartContainFlugView = true;
    }
    else {
      this.cartContainFlugView = false;
    }
  }

  exitUser__save() {
    this.clientService.exitClient();
    this.router.navigate(['/log-in'])
  }

  exitUser__clear() {
    this.clientService.exitClient();
    this.router.navigate(['/log-in']);
    this.cartService.pizzasInCart = [];
    this.dishesService.dishesCart = [];
  }

  doneChange() {
    this.successDone = true;
    setTimeout(() => {
      this.successDone = false;
    }, 6000);
  }

  constructor(private clientService: ClientService, private router: Router,
    private cartService: CartService, private dishesService: DishesService) { }

  updateClient(firstname: String, password: String, id: number) {

    if (firstname == "" || password == "") {
      this.emptyError = true;
    }

    else {
      axios.post('http://localhost:1234/client-re',
        {
          ClientId: id,
          Firstname: firstname,
          Password: password,
        },
        {
          headers: {
            'Authorization': sessionStorage.getItem('token')!,
          }
        })
        .then((res) => {
          if (res.status == 404) {
            this.router.navigate(['/404'])
          }
          else {
            this.clientService.enterClient(JSON.parse(res.headers["client"]));
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }


  sendReportToEmail(OrderId: number) {
    //send-report-to-email/{id_client}&&{id_order}

    axios.get('http://localhost:1234/send-report-to-email/' + this.clientService.client.clientId + '&&' + OrderId,
        {
          headers: {
            'Authorization': sessionStorage.getItem('token')!,
          }
        })
        .then((res) => {
          if (res.status == 404) {
            this.router.navigate(['/404'])
          }
          else {
            //this.clientService.enterClient(JSON.parse(res.headers["client"]));
            console.log("готово");
            
          }
        })
        .catch((err) => {
          console.log(err);
        })
  }


  ngOnInit(): void {
    this.client = this.clientService.client;
    this.checkContainCart();

    if (this.clientService.autorizationFlug) {
      axios.get('http://localhost:1234/get-orders/' + this.clientService.client.clientId,
        {
          headers: {
            'Authorization': sessionStorage.getItem('token')!,
          }
        })
        .then((res) => {
          if (res.status == 404) {
            this.router.navigate(['/404'])
          }
          else {
            console.log();

            for (let i = 0; i < JSON.parse(res.headers["order"]).length; i++) {

              let ord: OrderClass = {
                DateOrder: JSON.parse(res.headers["order"])[i].DateOrder,
                OrderId: JSON.parse(res.headers["order"])[i].OrderId,
                TypeOfPay: JSON.parse(res.headers["order"])[i].TypeOfPay,
                LastPrice: JSON.parse(res.headers["order"])[i].LastPrice
              }

              this.orders.push(ord);
            }

            console.log(this.orders);
            
          }
        })
        .catch((err) => {
          console.log(err);
        })

    }
  }

}
