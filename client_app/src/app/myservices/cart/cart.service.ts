import { Injectable } from '@angular/core';
import { PizzaCartClass } from '../../models/PizzaCartClass' 
import { IngredientClass } from '../../models/IngredientClass' 
import axios from 'axios';
import { ClientService } from '../account/client.service'
import { ModalPizzaService } from '../../myservices/modal-pizza/modal-pizza.service';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  pizzasInCart: PizzaCartClass[] = [];

  addPizzaInCartServer(id_client: number) {

      axios.post('http://localhost:1234/add-pizza-in-cart/' +  id_client, {
      
        pizzaId: this.pizzasInCart[this.pizzasInCart.length-1].PizzaId,
        size: this.pizzasInCart[this.pizzasInCart.length-1].Size,
        ingredients: this.pizzasInCart[this.pizzasInCart.length-1].Ingredients,
        count: this.pizzasInCart[this.pizzasInCart.length-1].Count,
      },
      {    
        headers: {
          'Authorization':  sessionStorage.getItem('token')!,
        }
      }
      )
      .then((res) => {
        if (res.status == 404) {
          this.router.navigate(['/404']);
        }
        
      })
      .catch((err) => {
        console.log(err);
        
      })
  }

  deletePizzaFromCartServer(id_client: number, index: number) {
    
    axios.get('http://localhost:1234/delete-pizza-from-cart/' +  id_client + '&&' + index,
    {    
      headers: {
        'Authorization': sessionStorage.getItem('token')!,
      }
    })
    .then((res) => {
      if (res.status == 404) {
        this.router.navigate(['/404']);
      }
      
    })
    .catch((err) => {
      console.log(err);
      
    })
    
  }

  counterPizzaInCartServer(id_client: number, index: number, counter: number) {
    
    axios.get('http://localhost:1234/counter-pizza-in-cart/' +  id_client + '&&' + index + '&&' + counter,
    {    
      headers: {
        'Authorization': sessionStorage.getItem('token')!,
      }
    })
    .then((res) => {
      if (res.status == 404) {
        this.router.navigate(['/404']);
      }
      
    })
    .catch((err) => {
      console.log(err);
      
    })
    
  }

  getPizzasFromCartServer(id_client: number) {
    axios.get('http://localhost:1234/get-pizzas-from-cart/' +  id_client,
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

        if (JSON.parse(res.headers["pizzas"]).length > 0) {
          for (let i = 0; i<JSON.parse(res.headers["pizzas"]).length; i++) {
            this.pizzasInCart.push(JSON.parse(res.headers["pizzas"])[i]);     
          }
        }
      } 
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  
  


  constructor( private router: Router) { }
}
