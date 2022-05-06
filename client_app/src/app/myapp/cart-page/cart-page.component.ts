import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CartService } from '../../myservices/cart/cart.service'
import { ClientService } from '../../myservices/account/client.service'
import { PizzaCartClass, Size } from '../../models/PizzaCartClass'
import { DishesClass } from '../../models/DishClass'
import { DishesCartClass } from '../../models/DishCartClass'
import { DishesService } from 'src/app/myservices/dishes/dishes.service';
import { IngredientClass } from 'src/app/models/IngredientClass';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  pizzasCartView: PizzaCartClass[] = [];
  dishCartView: DishesCartClass[] = [];

  checkLenghtPizza() {
    if(this.pizzasCartView.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  checkLenghtDish() {
    if(this.dishCartView.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  constructor(private cdref: ChangeDetectorRef, private cartService: CartService, private clientService:ClientService,
    private dishesService: DishesService) { 

    
    
  }


  ngOnInit(): void {

    //вызываю автообновление 
    if (this.clientService.autorizationFlug) {
      this.cartService.getPizzasFromCartServer(this.clientService.client.clientId, this.clientService.client.firstName)
      }

    this.pizzasCartView = this.cartService.pizzasInCart;
    this.dishCartView = this.dishesService.dishesCart; 
  }

  decrement_pizza(index: number) {

    if (this.cartService.pizzasInCart[index].Count > 1) {
      this.cartService.pizzasInCart[index].Count--; 


      if(this.clientService.autorizationFlug) {

        this.cartService.counterPizzaInCartServer(this.clientService.client.clientId, 
          this.cartService.pizzasInCart[index].PizzaId, this.cartService.pizzasInCart[index].Size, 
          this.cartService.pizzasInCart[index].Ingredients, this.cartService.pizzasInCart[index].Count);

        //this.cartService.counterMinusPizzaInCartServer(this.clientService.client.clientId, index)   
      } 
    } 
    
    else {
      this.deletePizzaFromCart(index);
    }
  }       

  increment_pizza(index: number) {
    if (this.cartService.pizzasInCart[index].Count < 16) {
      this.cartService.pizzasInCart[index].Count++;

      if(this.clientService.autorizationFlug) {

        this.cartService.counterPizzaInCartServer(this.clientService.client.clientId, 
          this.cartService.pizzasInCart[index].PizzaId, this.cartService.pizzasInCart[index].Size, 
          this.cartService.pizzasInCart[index].Ingredients, this.cartService.pizzasInCart[index].Count);

      }     
    }
  }

  getIngredientsMass(index: number) {
    let ingrMass: number = 0;
    for(let i = 0; i < this.pizzasCartView[index].Ingredients.length; i++) {
      ingrMass += this.pizzasCartView[index].Ingredients[i].Mass;
    }
    return ingrMass;
  }

  getIngredientsPrice(index: number) {
    let ingrPrice: number = 0;
    for(let i = 0; i < this.pizzasCartView[index].Ingredients.length; i++) {
      ingrPrice += this.pizzasCartView[index].Ingredients[i].Price;
    }
    return ingrPrice;
  }

  deletePizzaFromCart(index: number) {    

    // this.cartService.pizzasInCart = this.cartService.pizzasInCart.slice(index, 1);
    this.cartService.pizzasInCart = this.cartService.pizzasInCart.slice(0, index)
      .concat(this.cartService.pizzasInCart.slice(index + 1, this.cartService.pizzasInCart.length))

    //вызвать функцию удаления из бд
    if(this.clientService.autorizationFlug)   
    {
      this.cartService.deletePizzaFromCartServer(this.clientService.client.clientId, 
        this.pizzasCartView[index].PizzaId, this.pizzasCartView[index].Size, 
        this.pizzasCartView[index].Ingredients, this.pizzasCartView[index].Count);
    }

  }


  decrement_addish(id: number) {
    if (this.dishesService.dishesCart.find(d => d.DishId == id)!.Count > 1) {
      this.dishesService.dishesCart.find(d => d.DishId == id)!.Count--;

      if(this.clientService.autorizationFlug) {
        this.dishesService.minusCounterDishInCartServer(this.clientService.client.clientId, id)
      }
    }
    else {
      this.deleteAddishFromCart(id);
    }
  }       

  increment_addish(id: number) {
    if (this.dishesService.dishesCart.find(d => d.DishId == id)!.Count < 11) {
      this.dishesService.dishesCart.find(d => d.DishId == id)!.Count++;

      if(this.clientService.autorizationFlug) {
        this.dishesService.plusCounterDishInCartServer(this.clientService.client.clientId, id)
      }  
    }
  }

  deleteAddishFromCart(id_dish: number) {

    this.dishesService.dishesCart = this.dishesService.dishesCart.filter(d => d.DishId != id_dish);
    this.dishCartView = this.dishesService.dishesCart;

    //вызвать функцию удаления из бд
    if(this.clientService.autorizationFlug) {
      this.dishesService.deleteDishFromCartServer(this.clientService.client.clientId, id_dish);
    }
  }


  lastPrice = 0;
  getCartPrice() {

    this.lastPrice = 0;
    for(let i = 0; i<this.cartService.pizzasInCart.length; i++) {
      //складываем значения каждой пиццы
      this.lastPrice += this.getIngredientsPrice(i) + this.cartService.pizzasInCart[i].Size.Price * this.cartService.pizzasInCart[i].Count; 
    } 
    for(let i = 0; i<this.dishesService.dishesCart.length; i++) {
      //складываем значения каждого допа
      this.lastPrice += this.dishesService.dishesCart[i].Price * this.dishesService.dishesCart[i].Count; 
    } 
  }

  toOrder() {
    this.cartService.toOrderSet(this.lastPrice);
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();    
    this.getCartPrice();

    this.pizzasCartView = this.cartService.pizzasInCart;

  }

}


