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

  // setBooler(index: number) { 
  //   for(let i = 0; i < index; i++) {
  //     this.boolArrayServ[i] = false;
  //     this.step = index
  //   }   
  // }

  // step :number = 0
  // setBooler_step() { //если мы уже открывали модальное окно - чтобы лишний раз не обращаться к серверу
  //   for(let i = 0; i < this.step; i++) {
  //     this.boolArrayServ[i] = false;
  //   }   
  // }



  constructor() { }
}
