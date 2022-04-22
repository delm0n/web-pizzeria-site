import { Injectable } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';


import { DishesClass } from '../../models/DishClass';
import { DishesCartClass } from '../../models/DishCartClass';

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  constructor(private router: Router) { }

  dishes: DishesClass[] = [];

  dishesCart: DishesCartClass[] = [];
  dishesCart_server: DishesCartClass[] = [];
  

  addDishInCartServer(id_client: number) {
    axios.post('http://localhost:1234/add-dish-in-cart/' + id_client, {
      dishId: this.dishesCart[this.dishesCart.length - 1].DishId,
      count: this.dishesCart[this.dishesCart.length - 1].Count
    },
      {
        headers: {
          'Authorization': sessionStorage.getItem('token')!,
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

  getDishFromCartServer(id_client: number, name_client: string) {
    axios.get('http://localhost:1234//get-dish-from-cart/' + id_client,
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
          if (res.status != 204) {
            //количество пицц в корзине до входа в аккаунт
            let length_before = this.dishesCart.length;

            if (JSON.parse(res.headers["dishes"]).length > 0) {
              for (let i = 0; i < JSON.parse(res.headers["dishes"]).length; i++) {
                this.dishesCart_server.push(JSON.parse(res.headers["dishes"])[i]);
              }
            }

            if (length_before == 0) {
              //если до входа в корзине ничего не было

              if (this.dishesCart_server.length > 0) {
                //но пришло с сервера
                this.notifyClient(name_client);
                this.dishesCart = this.dishesCart_server;
                console.log("до входа в корзине ничего не было, но пришло с сервера");

              }

              else {
                //если не пришло, то не делаем ничего
                console.log("Корзина пуста");
              }
            }
            else {
              //если в корзине что-то было до входа в аккаунт

              if (this.dishesCart_server.length == 0) {
                //а на сервере оказалось пусто
                console.log("в корзине что-то было до входа в аккаунт, а на сервере оказалось пусто");

                for (let i = 0; i < this.dishesCart.length; i++) {
                  axios.post('http://localhost:1234/add-dish-in-cart/' + id_client, {

                    dishId: this.dishesCart[i].DishId,
                    count: this.dishesCart[i].Count

                  },
                    {
                      headers: {
                        'Authorization': sessionStorage.getItem('token')!,
                      }
                    }
                  )
                    .then((res) => {
                      if (res.status == 404) {
                        this.router.navigate(['/404']);
                      }
                      else {
                        this.dishesCart = this.dishesCart_server;
                      }

                    })
                    .catch((err) => {
                      console.log(err);

                    })
                }

              }

              else {
                //если с сервера что-то пришло
                this.notifyClient(name_client);

                for (let i = 0; i < this.dishesCart.length; i++) {
                  axios.post('http://localhost:1234/add-pizza-in-cart/' + id_client, {

                    dishId: this.dishesCart[i].DishId,
                    count: this.dishesCart[i].Count
                  },
                    {
                      headers: {
                        'Authorization': sessionStorage.getItem('token')!,
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

                for (let i = 0; i < this.dishesCart_server.length; i++) {
                  this.dishesCart.push(this.dishesCart_server[i]);
                }
              }
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  deleteDishFromCartServer(id_client: number, id_dish: number) {

    axios.post('http://localhost:1234/delete-dish-from-cart/' + id_client, {
      dishId: id_dish
    },
      {
        headers: {
          'Authorization': sessionStorage.getItem('token')!,
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

  plusCounterDishInCartServer(id_client: number, id_dish: number) {
    axios.post('http://localhost:1234/plus-counter-dish-from-cart/' + id_client, {
      dishId: id_dish
    },
      {
        headers: {
          'Authorization': sessionStorage.getItem('token')!,
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

  minusCounterDishInCartServer(id_client: number, id_dish: number) {
    axios.post('http://localhost:1234/minus-counter-dish-from-cart/' + id_client, {
      dishId: id_dish
    },
      {
        headers: {
          'Authorization': sessionStorage.getItem('token')!,
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

  notifyClient(name_client: string) {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    else if (Notification.permission === "granted") {
      // If it's okay 
      var notification = new Notification(name_client + "!", {
        tag: "ache-mail",
        body: "В корзине есть блюда, добавленные ранее...",
        icon: "https://img.icons8.com/ios-glyphs/90/000000/pizza.png"
      });
    }

    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          var notification = new Notification(name_client + "!", {
            tag: "ache-mail",
            body: "В корзине есть блюда, добавленные ранее...",
            icon: "https://img.icons8.com/ios-glyphs/90/000000/pizza.png"
          });
        }
      });
    }
  }


}
