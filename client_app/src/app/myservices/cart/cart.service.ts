import { Injectable } from '@angular/core';
import { PizzaCartClass } from '../../models/PizzaCartClass' 
@Injectable({
  providedIn: 'root'
})
export class CartService {

  pizzasInCart: PizzaCartClass[] = [];

  //вызвать axios получение id

  constructor() { }
}
