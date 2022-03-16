import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ModalPizzaService {

  pizzas = [{
    pizzaId: null,
    size: null,
    name: "",
    price: null,
    mass: null
  }]

  consoler() {
    console.log(this.pizzas);  
  }

  modalPizzaFlug = false

  constructor() { }
}
