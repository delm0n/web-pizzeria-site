import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { DishesService } from 'src/app/myservices/dishes/dishes.service';
import { ClientService } from '../../myservices/account/client.service';
import { CartService } from '../../myservices/cart/cart.service';
import { Router } from '@angular/router';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  animations: [
    trigger(
      'alertsAnimation', [
      transition(
        ':enter',
        [
          style({ height: 0, opacity: 0 }),
          animate('0.4s ease-out',
            style({ height: 42, opacity: 1 }))
        ]
      ),
      transition(
        ':leave',
        [
          style({ height: 42, opacity: 1, display: 'none' }),
          animate('0s ease-out',
            style({ height: 0, opacity: 0 }))
        ]
      )

    ]),

    trigger(
      'cardAnimation', [
      transition(
        ':enter',
        [
          style({ height: 0, opacity: 0 }),
          animate('0.4s ease-out',
            style({ height: 252, opacity: 1 }))
        ]
      ),
      transition(
        ':leave',
        [
          style({ height: 252, opacity: 1, display: 'none' }),
          animate('0s ease-out',
            style({ height: 0, opacity: 0 }))
        ]
      )

    ])
  ]
})
export class OrderPageComponent implements OnInit {

  constructor( private clientService: ClientService, private cartService: CartService,
    private dishesService: DishesService, private router: Router) { }

  autorizationFlugView: boolean = false;

  checkedPolicy: boolean = false
  changeCheckedPolicy() {
    this.checkedPolicy = !this.checkedPolicy
  }

  typeOfPay: string = "Наличными при получении";
  delivery: number = 0;

  deliveryBool() {
    if (this.typeOfPay == "Наличными при получении") {
      if (this.delivery >= this.lastprice && this.delivery != 0) {
        return true;
      }
      else {
        return false;
      }
    }

    else {

      if(this.typeOfPay == "Картой на сайте") {
        //console.log((String)(this.dateCardMM));
        //return  true  
        if ((String)(this.dateCardMM).length==2 && (String)(this.dateCardYY).length==2 
           && (String)(this.numberCard).length==16  && (String)(this.codeCard).length==3 ) {
            return true;
        }
        else {
          return false;
        }
      }
      else {
        return true;
      }
    }
  }

  dateCardMM!: number;
  dateCardYY!: number;
  numberCard!: number;
  codeCard!: number;

  test() {
        console.log(this.autorizationFlugView);  console.log(this.checkedPolicy);
        console.log(this.lastprice == 0);

        console.log(this.autorizationFlugView && this.checkedPolicy && this.lastprice==0);
        
  }


  lastprice: number = 0;
  sendOrder() { 

    let PizzaIdJson: number[] = [];
    let PizzaSizeIdJson: number[] = [];
    let PizzaCount: number[] = [];
    let DishIdJson: number[] = [];
    let DishCount: number[] = [];
    let PizzaIngredientIdJson: number[][] = [[]];

    for(let i = 0; i < this.cartService.pizzasInCart.length; i++) {
      PizzaIdJson.push(this.cartService.pizzasInCart[i].PizzaId);
      PizzaSizeIdJson.push(this.cartService.pizzasInCart[i].Size.PizzaSizeId);
      PizzaCount.push(this.cartService.pizzasInCart[i].Count);

      let subIngred: number[] = [];
      for(let j = 0; j < this.cartService.pizzasInCart[i].Ingredients.length; j++) {
        subIngred.push(this.cartService.pizzasInCart[i].Ingredients[j].IngredientId);
      }
      PizzaIngredientIdJson.push(subIngred);
    }

    for(let i = 0; i < this.dishesService.dishesCart.length; i++) {
      DishIdJson.push(this.dishesService.dishesCart[i].DishId);
      DishCount.push(this.dishesService.dishesCart[i].Count);
    }

    axios.post('http://localhost:1234/send-order', {
      pizzaIdJson: JSON.stringify(PizzaIdJson),
      pizzaSizeIdJson: JSON.stringify(PizzaSizeIdJson),
      pizzaCount: JSON.stringify(PizzaCount),
      pizzaIngredientIdJson: JSON.stringify(PizzaIngredientIdJson),
      dishIdJson: JSON.stringify(DishIdJson),
      dishCount: JSON.stringify(DishCount),
      clientId: this.clientService.client.clientId,
      typeOfPay: this.typeOfPay,
      dateOrder: new Date().toLocaleDateString(),
      lastPrice: this.cartService.lastprice
    },
      {
        headers: {
          'Authorization': sessionStorage.getItem('token')!,
        }
      })
      .then((res) => {
        if (res.status == 200) {
          this.router.navigate(['/client']);
          
          this.cartService.pizzasInCart = [];
          this.dishesService.dishesCart = [];
   
        }

      })
      .catch((err) => {
        this.router.navigate(['/404']);
      })
    

  }

  ngOnInit(): void {
    
    this.autorizationFlugView = this.clientService.autorizationFlug;
    this.lastprice = this.cartService.toOrderGet()
  }

}
