import { Injectable } from '@angular/core';
import axios from "axios";
import { IngredientClass } from '../../models/IngredientClass' 

@Injectable({
  providedIn: 'root'
})

export class ModalPizzaService {

  ingredientArray: IngredientClass[] = [];
  boolArrayServ: boolean[] = [];
  priceOfIngreds = 0

  plusPrice(price: number) {
    this.priceOfIngreds += price;
  }

  minusPrice(price: number) {
    this.priceOfIngreds -= price;
  }

  clearPrice() {
    this.priceOfIngreds = 0;
    for(let i = 0; i < this.boolArrayServ.length; i++) {
      this.boolArrayServ[i] = false;
    } 
  }

  //вызывается после присваивания в ingredientArray
  setBoolFalseStartup() { 
    for(let i = 0; i < this.ingredientArray.length; i++) {
      this.boolArrayServ[i] = false;
    }   
  }

  constructor() { }
}
