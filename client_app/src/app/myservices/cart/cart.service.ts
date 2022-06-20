import { Injectable } from '@angular/core';
import { PizzaCartClass, Size } from '../../models/PizzaCartClass'
import axios from 'axios';
import { Router } from '@angular/router';
import { IngredientClass } from 'src/app/models/IngredientClass';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  pizzasInCart: PizzaCartClass[] = [];
  //pizzasInCart_server: PizzaCartClass[] = [];


  counterPizzaInCartServer(id_client: number, PizzaId: number, Size: Size, Ingredients: IngredientClass[], Count: number) {

    axios.post('http://localhost:1234/re-counter-pizza-from-cart/' + id_client, {
      pizzaId: PizzaId,
      size: Size,
      ingredients: Ingredients,
      count: Count,
    },
      {
        headers: {
          'Authorization': sessionStorage.getItem('token')!,
        }
      })
      .then((res) => {


      })
      .catch((err) => {
        this.router.navigate(['/404']);
      })

  }


  addPizzaInCartServer(id_client: number, name_client: string,
    PizzaId: number, Size: Size, Ingredients: IngredientClass[], Count: number) {

    axios.post('http://localhost:1234/add-pizza-in-cart/' + id_client, {
      pizzaId: PizzaId,
      size: Size,
      ingredients: Ingredients,
      count: Count,
    },
      {
        headers: {
          'Authorization': sessionStorage.getItem('token')!,
        }
      }
    )
      .then((res) => {

      })
      .catch((err) => {
        this.router.navigate(['/404']);

      })
  }

  //вызывается на странице с корзиной
  // getPizzasFromCartServer(id_client: number, name_client: string) {
  //   axios.get('http://localhost:1234/get-pizzas-from-cart/' + id_client,
  //     {
  //       headers: {
  //         'Authorization': sessionStorage.getItem('token')!,
  //       }
  //     })
  //     .then((res) => {

  //       if (res.status != 204) {

  //         this.pizzasInCart = [];

  //         for (let i = 0; i < JSON.parse(res.headers["pizzas"]).length; i++) {
  //           this.pizzasInCart.push(JSON.parse(res.headers["pizzas"])[i]);
  //         }
  //       }

  //     })
  //     .catch((err) => this.router.navigate(['/404'])
  //     )
  // }

  // //синхронизация с сервером
  // getPizzasFromCartServer_enter(id_client: number, name_client: string) {

  //   axios.get('http://localhost:1234/get-pizzas-from-cart/' + id_client,
  //     {
  //       headers: {
  //         'Authorization': sessionStorage.getItem('token')!,
  //       }
  //     })
  //     .then((res) => {

  //       if (res.status != 204) {

  //         for (let i = 0; i < JSON.parse(res.headers["pizzas"]).length; i++) {
  //           this.pizzasInCart_server.push(JSON.parse(res.headers["pizzas"])[i]);
  //         }

  //         //дальше функцию проверки на совпадение пицц

  //         if (this.pizzasInCart.length == 0) {
  //           //если до входа в корзине ничего не было

  //           if (this.pizzasInCart_server.length > 0) {
  //             //но пришло с сервера
  //             this.notifyClient(name_client);
  //             this.pizzasInCart = this.pizzasInCart_server;
              

  //           }

  //           else {
  //             //если не пришло, то не делаем ничего

  //           }
  //         }
  //         else {
  //           //если в корзине что-то было до входа в аккаунт

  //           if (this.pizzasInCart_server.length == 0) {
  //             //а на сервере оказалось пусто

  //             for (let i = 0; i < this.pizzasInCart.length; i++) {

  //               //отправляем все пиццы, выбранные до входа на сервер
  //               this.addPizzaInCartServer(id_client, name_client, this.pizzasInCart[i].PizzaId, this.pizzasInCart[i].Size,
  //                 this.pizzasInCart[i].Ingredients, this.pizzasInCart[i].Count)

  //               //this.getPizzasFromCartServer(id_client, name_client);

  //             }

  //           }

  //           else { //самая сложная ситуация
  //             //если с сервера что-то пришло
  //             this.notifyClient(name_client);

  //             //добавляем пиццы на сервер
  //             for (let i = 0; i < this.pizzasInCart.length; i++) {

  //               this.addPizzaInCartServer(id_client, name_client, this.pizzasInCart[i].PizzaId, this.pizzasInCart[i].Size,
  //                 this.pizzasInCart[i].Ingredients, this.pizzasInCart[i].Count)

  //             }


              
  //             //this.getPizzasFromCartServer(id_client, name_client);

  //           }
  //         }

  //       }

  //     })
  //     .catch((err) => {
  //       this.router.navigate(['/404']);
  //     })
  // }


  //уведомление
  
  // notifyClient(name_client: string) {
  //   if (!("Notification" in window)) {
  //     alert("This browser does not support desktop notification");
  //   }

  //   else if (Notification.permission === "granted") {
  //     // If it's okay 
  //     var notification = new Notification(name_client + "!", {
  //       tag: "ache-mail",
  //       body: "В корзине есть блюда, добавленные ранее...",
  //       icon: "https://img.icons8.com/ios-glyphs/90/000000/pizza.png"
  //     });
  //   }

  //   else if (Notification.permission !== "denied") {
  //     Notification.requestPermission().then((permission) => {
  //       if (permission === "granted") {
  //         var notification = new Notification(name_client + "!", {
  //           tag: "ache-mail",
  //           body: "В корзине есть блюда, добавленные ранее...",
  //           icon: "https://img.icons8.com/ios-glyphs/90/000000/pizza.png"
  //         });
  //       }
  //     });
  //   }
  // }


  deletePizzaFromCartServer(id_client: number, PizzaId: number, Size: Size, Ingredients: IngredientClass[], Count: number) {

    axios.post('http://localhost:1234/delete-pizza-from-cart/' + id_client, {
      pizzaId: PizzaId,
      size: Size,
      ingredients: Ingredients,
      count: Count
    },
      {
        headers: {
          'Authorization': sessionStorage.getItem('token')!,
        }
      })
      .then((res) => {


      })
      .catch((err) => {
        this.router.navigate(['/404']);

      })

  }

  lastprice: number = 0;
  toOrderSet(price: number) {
    this.lastprice = price;
    this.router.navigate(['/order']);

  }

  flugScroll: boolean = false;
  href: string = "";
  setHref(dish: string) {
    this.href = dish;
  }

  startScroll() {

    if (this.flugScroll) {
      setTimeout(() => {

        let theElement = document.getElementById(this.href)!;

        window.scrollTo(0, theElement.getBoundingClientRect().top + scrollY - 20);
        this.href = "";
      }, 1000);

      this.flugScroll = false;
    }
  }

  toOrderGet() {
    return this.lastprice;
  }


  constructor(private router: Router) { }
}
