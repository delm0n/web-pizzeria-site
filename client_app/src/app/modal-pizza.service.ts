import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})

export class ModalPizzaService {

  // pizzas = [{
  //   pizzaId: null,
  //   size: null,
  //   name: "",
  //   price: null,
  //   mass: null
  // }]

  // pizzaSize = [{
  //   pizzaSizeId: null,
  //   pizzaId: null,
  //   name: "",
  //   price: null,
  //   mass: null
  // }]

  // getSizes(i: any) {
  //   axios.get('http://localhost:1234/testsize')
  //     .then((res) => {
  //       this.pizzaSize = res.data.filter(((p: { pizzaId: any; }) => p.pizzaId === i));
  //       console.log(this.pizzaSize);
        
  //     })
  //     .catch((err: any) => {
  //       console.log(err);
  //     });
  // }

  constructor() { }
}
