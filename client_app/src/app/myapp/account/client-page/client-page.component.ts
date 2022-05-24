import { Component, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
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
    ),
    trigger(
      'ngifAnimation', [

      transition(
        ':enter',
        [
          style({ height: 0, opacity: 0 }),
          animate('0.4s ease-out',
            style({ height: 24, opacity: 1 }))
        ]
      ),
      transition(
        ':leave',
        [
          style({ height: 24, opacity: 1, display: 'none' }),
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
  orders: OrderClass[] = [];
  orders_click: boolean[] = [];

  date = {
    before: Date,
    after: Date
  }

  var_successBetween:boolean = false
  successBetween(){
    this.date = {
      before: Date,
      after: Date
    }
    this.var_successBetween = true;
    setTimeout(() => {
      this.var_successBetween = false;
    }, 6000);

  }

  sendOrderBetween() {

    //если клиент перепутал поля
    if (this.date.before > this.date.after) {
      let date_ = this.date.before;
      this.date.before = this.date.after;
      this.date.after = date_;
    }

    axios.post('http://localhost:1234/send-report-to-email-between/',
    {
      ClientId: this.clientService.client.clientId, 
      DataBefore: this.date.before,
      DataAfter: this.date.after 
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

        if (res.status == 200) {
          
          this.successBetween();

        }

      }
    })
    .catch((err) => {
      this.router.navigate(['/404']);
    })
    
  }

  isValidDate(d: any){
    return !isNaN((new Date(d)).getTime());
}

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
    private cartService: CartService, private dishesService: DishesService, private cdref: ChangeDetectorRef) { }

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
          if (res.status == 200) {
            this.clientService.enterClient(JSON.parse(res.headers["client"]));
          }

          this.doneChange()
          
        })
        .catch((err) => {
          this.router.navigate(['/404']);
        })
    }
  }

  sendReportToEmail(OrderId: number, index: number) {

    axios.get('http://localhost:1234/send-report-to-email/' + this.clientService.client.clientId + '&&' + OrderId,
        {
          headers: {
            'Authorization': sessionStorage.getItem('token')!,
          }
        })
        .then((res) => {


            if (res.status == 200) {
              this.orders_click[index] = true;
            }
        })
        .catch((err) => {
          this.router.navigate(['/404']);
        })
  }

  setOrders() {
    this.orders = this.clientService.orders;
    this.orders_click = [];
    for(let i = 0; i < this.clientService.orders.length; i++) {
      this.orders_click.push(false);
    }
  }

  ngOnInit(): void {
    this.client = this.clientService.client;
    this.checkContainCart();

    if (this.clientService.autorizationFlug) {

      //получаем заказы
      this.clientService.getOrders();
      this.setOrders();
    }
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
    this.orders = this.clientService.orders;
  }

}
