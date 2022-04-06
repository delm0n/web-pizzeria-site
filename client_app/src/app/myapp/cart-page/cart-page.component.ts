import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CartService } from '../../myservices/cart/cart.service'
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

  constructor(private cdref: ChangeDetectorRef, private cartService: CartService) { }

  ngOnInit(): void {
    
  }

  decrement(index: number) {
    if (this.cartService.pizzasInCart[index].Count > 1) {
      this.cartService.pizzasInCart[index].Count--;    
    } 
  }       

  increment(index: number) {
    if (this.cartService.pizzasInCart[index].Count < 11) {
    this.cartService.pizzasInCart[index].Count++;
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
    
    this.cartService.pizzasInCart = this.cartService.pizzasInCart.filter(pc => pc.PizzaId != index);
    this.pizzasCartView = this.cartService.pizzasInCart;

  }


  lastPrice = 0;
  getCartPrice() {

    this.lastPrice = 0;
    for(let i = 0; i<this.pizzasCartView.length; i++) {
      //складываем значения каждой пиццы
      this.lastPrice += this.getIngredientsPrice(i) + this.cartService.pizzasInCart[i].Sizes.Price * this.cartService.pizzasInCart[i].Count; 
    }
    
    // for(let i = 0; i<document.getElementsByClassName("price_class").length; i++) {
    //   this.lastPrice += (Number)(document.getElementsByClassName("price_class")[i].innerHTML.split(',').join(''));
    // }
    
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
    this.pizzasCartView = this.cartService.pizzasInCart;
    //console.log(1);
    
    this.getCartPrice();
    }

}
