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
  pizzasInCart_server: PizzaCartClass[] = [];

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

  getPizzasFromCartServer(id_client: number, name_client: string) {
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
        //количество пицц в корзине до входа в аккаунт
        let length_before = this.pizzasInCart.length;

        if (JSON.parse(res.headers["pizzas"]).length > 0) {
            for (let i = 0; i<JSON.parse(res.headers["pizzas"]).length; i++) {
            this.pizzasInCart_server.push(JSON.parse(res.headers["pizzas"])[i]);     
          }
        }

        if(length_before == 0) {
          //если до входа в корзине ничего не было
    
          if (this.pizzasInCart_server.length > 0) {
            //но пришло с сервера
            this.notifyClient(name_client); 
            this.pizzasInCart = this.pizzasInCart_server;
            console.log("до входа в корзине ничего не было, но пришло с сервера");
            
          }
    
          else {
            //если не пришло, то не делаем ничего
            console.log("Корзина пуста");
          }
        }
        else {
          //если в корзине что-то было до входа в аккаунт
    
          if (this.pizzasInCart_server.length == 0) {
            //а на сервере оказалось пусто
            console.log("в корзине что-то было до входа в аккаунт, а на сервере оказалось пусто");
              
            for(let i = 0; i<this.pizzasInCart.length; i++) {
              axios.post('http://localhost:1234/add-pizza-in-cart/' +  id_client, {
      
                pizzaId: this.pizzasInCart[i].PizzaId,
                size: this.pizzasInCart[i].Size,
                ingredients: this.pizzasInCart[i].Ingredients,
                count: this.pizzasInCart[i].Count,
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
                else {
                  this.pizzasInCart = this.pizzasInCart_server;
                }
                
              })
              .catch((err) => {
                console.log(err);
                
              })
            }
            
          }
    
          else{
            //если с сервера что-то пришло
            this.notifyClient(name_client); 
            
            for(let i = 0; i<this.pizzasInCart.length; i++) {
              axios.post('http://localhost:1234/add-pizza-in-cart/' +  id_client, {
      
                pizzaId: this.pizzasInCart[i].PizzaId,
                size: this.pizzasInCart[i].Size,
                ingredients: this.pizzasInCart[i].Ingredients,
                count: this.pizzasInCart[i].Count,
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

            for(let i = 0; i<this.pizzasInCart_server.length; i++) {
              this.pizzasInCart.push(this.pizzasInCart_server[i]);
            }
          }
        }
      } 
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  notifyClient(name_client: string) {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    else if (Notification.permission === "granted") {
      // If it's okay 
      var notification = new Notification(name_client+ "!", {
        tag: "ache-mail",
        body: "В корзине есть блюда, добавленные ранее...",
        icon : "https://img.icons8.com/ios-glyphs/90/000000/pizza.png"
      });  
    }

    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then( (permission) => {
        if (permission === "granted") {
          var notification = new Notification(name_client + "!", {
            tag: "ache-mail",
            body: "В корзине есть блюда, добавленные ранее...",
            icon : "https://img.icons8.com/ios-glyphs/90/000000/pizza.png"
          });  
        }
      });
    }
  }

  constructor( private router: Router) { }
}
