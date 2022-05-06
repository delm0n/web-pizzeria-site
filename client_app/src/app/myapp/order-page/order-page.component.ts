import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { DishesService } from 'src/app/myservices/dishes/dishes.service';
import { ClientService } from '../../myservices/account/client.service';
import { CartService } from '../../myservices/cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
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
        if (res.status == 404) {
          this.router.navigate(['/404']);
        }
        else {
          this.router.navigate(['/client']);
          
          this.cartService.pizzasInCart = [];
          this.dishesService.dishesCart = [];

          
        }

      })
      .catch((err) => {
        console.log(err);

      })
    

  }

  ngOnInit(): void {
    //this.checkAutoriz();
    this.autorizationFlugView = this.clientService.autorizationFlug;
    this.lastprice = this.cartService.toOrderGet()
  }

}
