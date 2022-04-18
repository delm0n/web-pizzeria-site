import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CartService } from '../../myservices/cart/cart.service'
import { ClientService } from '../../myservices/account/client.service'
import { PizzaCartClass } from '../../models/PizzaCartClass'



@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  pizzasCartView: PizzaCartClass[] = []

  checkLenght() {
    if(this.pizzasCartView.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  constructor(private cdref: ChangeDetectorRef, private cartService: CartService, private clientService:ClientService) { 
    this.pizzasCartView = cartService.pizzasInCart;
  }


  ngOnInit(): void {
  }

  decrement(index: number) {
    if (this.cartService.pizzasInCart[index].Count > 1) {
      this.cartService.pizzasInCart[index].Count--; 

      if(this.clientService.autorizationFlug) {
        this.cartService.counterPizzaInCartServer(this.clientService.client.clientId, index, this.cartService.pizzasInCart[index].Count)   
      }
      
    } 
  }       

  increment(index: number) {
    if (this.cartService.pizzasInCart[index].Count < 11) {
    this.cartService.pizzasInCart[index].Count++;

      if(this.clientService.autorizationFlug) {
        this.cartService.counterPizzaInCartServer(this.clientService.client.clientId, index, this.cartService.pizzasInCart[index].Count)   
      }
      
    }
  }

  getIngredientsMass(index: number) {
    let ingrMass: number = 0;
    for(let i = 0; i < this.cartService.pizzasInCart[index].Ingredients.length; i++) {
      ingrMass += this.cartService.pizzasInCart[index].Ingredients[i].Mass;
    }
    return ingrMass;
  }

  getIngredientsPrice(index: number) {
    let ingrPrice: number = 0;
    for(let i = 0; i < this.cartService.pizzasInCart[index].Ingredients.length; i++) {
      ingrPrice += this.cartService.pizzasInCart[index].Ingredients[i].Price;
    }
    return ingrPrice;
  }

  deleteFromCart(index: number) {
    
    this.cartService.pizzasInCart = this.cartService.pizzasInCart.slice(0, index)
      .concat(this.cartService.pizzasInCart.slice(index + 1, this.cartService.pizzasInCart.length))

    this.pizzasCartView = this.cartService.pizzasInCart;

    //вызвать функцию удаления из бд
    if(this.clientService.autorizationFlug) {
      this.cartService.deletePizzaFromCartServer(this.clientService.client.clientId, index);
    }
    

  }


  lastPrice = 0;
  getCartPrice() {

    this.lastPrice = 0;
    for(let i = 0; i<this.cartService.pizzasInCart.length; i++) {
      //складываем значения каждой пиццы
      this.lastPrice += this.getIngredientsPrice(i) + this.cartService.pizzasInCart[i].Size.Price * this.cartService.pizzasInCart[i].Count; 
    }    
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();    
    this.getCartPrice();

  }

}


