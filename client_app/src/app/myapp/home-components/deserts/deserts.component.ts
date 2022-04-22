import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { DishesService } from 'src/app/myservices/dishes/dishes.service';
import { DishesClass, TypesEnum } from '../../../models/DishClass';
import { ClientService } from '../../../myservices/account/client.service';
import { CartService } from '../../../myservices/cart/cart.service';
import { DishesCartClass } from '../../../models/DishCartClass';

@Component({
  selector: 'app-deserts',
  templateUrl: './deserts.component.html',
  styleUrls: ['./deserts.component.css']
})
export class DesertsComponent implements OnInit {

  deserts: DishesClass[] = [];
  desertsInCartID: number[] = [];

  constructor(private clientService: ClientService, private cartService: CartService,
    private dishesService: DishesService) {  
      this.getIdDishInCart();
    }

    getIdDishInCart() {
      for (let i = 0; i<this.dishesService.dishesCart.length; i++) {
        this.desertsInCartID.push(this.dishesService.dishesCart[i].DishId);
      }      
    }

  

  addToCart(id: number) {   

    //при первом добавлении
    if (this.dishesService.dishesCart.find(d => d.DishId == id) == undefined ) {
      let dish: DishesCartClass = {
        DishId: id,
        Name: this.deserts.find(d => d.DishId == id)!.Name,
        UrlImg: this.deserts.find(d => d.DishId == id)!.UrlImg,
        Price: this.deserts.find(d => d.DishId == id)!.Price,
        Mass: this.deserts.find(d => d.DishId == id)!.Mass,
        DishType: this.deserts.find(d => d.DishId == id)!.DishType,
        Count: 1
      }
  
      this.dishesService.dishesCart.push(dish);
      this.getIdDishInCart();

    }
    else { //иначе просто увеличиваем количество
      this.dishesService.dishesCart.find(d => d.DishId == id)!.Count++;

      if(this.clientService.autorizationFlug) {
        this.dishesService.plusCounterDishInCartServer(this.clientService.client.clientId, id)
      } 
    }


    //при входе в аккаунт
    if(this.clientService.autorizationFlug) {
      this.dishesService.addDishInCartServer(this.clientService.client.clientId)
    }
  }

  ngOnInit(): void {
    axios.get('http://localhost:1234/dishes/' + TypesEnum.Desserts)
    .then((res) => { 
      this.deserts = JSON.parse(res.headers['dishes']);     
    })
    .catch((err: any) => {
      console.log(err);
    });
  }
}
