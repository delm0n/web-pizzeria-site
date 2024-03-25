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
  //dishesCart_server: DishesCartClass[] = [];


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


      })
      .catch((err) => {
        // this.router.navigate(['/404']);
      })
  }

  //не используется
  // getDishFromCartServer(id_client: number, name_client: string) {
  //   axios.get('http://localhost:1234//get-dish-from-cart/' + id_client,
  //     {
  //       headers: {
  //         'Authorization': sessionStorage.getItem('token')!,
  //       }
  //     })
  //     .then((res) => {

  //         if (res.status != 204) {
  //           //количество допов в корзине до входа в аккаунт
  //           let length_before = this.dishesCart.length;

  //           if (JSON.parse(res.headers["dishes"]).length > 0) {
  //             for (let i = 0; i < JSON.parse(res.headers["dishes"]).length; i++) {
  //               this.dishesCart_server.push(JSON.parse(res.headers["dishes"])[i]);
  //             }
  //           }

  //           if (length_before == 0) {
  //             //если до входа в корзине ничего не было

  //             if (this.dishesCart_server.length > 0) {
  //               //но пришло с сервера
  //               this.notifyClient(name_client);
  //               this.dishesCart = this.dishesCart_server;
                
  //             }

  //             else {
  //               //если не пришло, то не делаем ничего

  //             }
  //           }
  //           else {
  //             //если в корзине что-то было до входа в аккаунт

  //             //заполним массив индексами
  //             let array_index = [];
  //             for (let j = 0; j < this.dishesCart_server.length; j++) {
  //               array_index.push(this.dishesCart_server[j].DishId)
  //             }


  //             if (this.dishesCart_server.length == 0) {
  //               //а на сервере оказалось пусто

  //               for (let i = 0; i < this.dishesCart.length; i++) {

  //                 axios.post('http://localhost:1234/add-dish-in-cart/' + id_client, {

  //                   dishId: this.dishesCart[i].DishId,
  //                   count: this.dishesCart[i].Count

  //                 },
  //                   {
  //                     headers: {
  //                       'Authorization': sessionStorage.getItem('token')!,
  //                     }
  //                   }
  //                 )
  //                   .then((res) => {
  //                     if (res.status == 200) {
  //                       this.dishesCart = this.dishesCart_server;
  //                     }

  //                   })
  //                   .catch((err) => {
  //                     this.router.navigate(['/404']);

  //                   })
  //               }

  //             }

  //             else {
  //               //если с сервера что-то пришло
  //               this.notifyClient(name_client);

  //               for (let i = 0; i < this.dishesCart.length; i++) {

  //                 if (array_index.includes(this.dishesCart[i].DishId)) { //если такое id уже содержится

  //                   this.dishesCart_server.find(d => d.DishId == this.dishesCart[i].DishId)!.Count =
  //                     this.dishesCart_server.find(d => d.DishId == this.dishesCart[i].DishId)!.Count + this.dishesCart[i].Count;

  //                   this.CounterDishInCartServer(id_client, this.dishesCart[i].DishId,
  //                     this.dishesCart_server.find(d => d.DishId == this.dishesCart[i].DishId)!.Count)


  //                 }

  //                 else { //если такого нет
  //                   axios.post('http://localhost:1234/add-dish-in-cart/' + id_client, {
  //                     dishId: this.dishesCart[i].DishId,
  //                     count: this.dishesCart[i].Count
  //                   },
  //                     {
  //                       headers: {
  //                         'Authorization': sessionStorage.getItem('token')!,
  //                       }
  //                     }
  //                   )
  //                     .then((res) => {


  //                     })
  //                     .catch((err) => {
  //                       this.router.navigate(['/404']);

  //                     })

  //                   this.dishesCart_server.push(this.dishesCart[i])
  //                 }
  //               }

  //               this.dishesCart = this.dishesCart_server;
  //             }
  //           }
  //         }
        
  //     })
  //     .catch((err) => {
  //       this.router.navigate(['/404']);
  //     })
  // }

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


      })
      .catch((err) => {
        // this.router.navigate(['/404']);

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


      })
      .catch((err) => {
        // this.router.navigate(['/404']);

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


      })
      .catch((err) => {
        // this.router.navigate(['/404']);

      })
  }

  CounterDishInCartServer(id_client: number, id_dish: number, counter: number) {
    axios.post('http://localhost:1234/counter-dish-from-cart/' + id_client, {
      dishId: id_dish,
      count: counter
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


}
