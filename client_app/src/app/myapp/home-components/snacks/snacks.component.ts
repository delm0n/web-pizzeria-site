import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { DishesCartClass } from 'src/app/models/DishCartClass';
import { DishesClass, TypesEnum } from 'src/app/models/DishClass';
import { ClientService } from 'src/app/myservices/account/client.service';
import { CartService } from 'src/app/myservices/cart/cart.service';
import { DishesService } from 'src/app/myservices/dishes/dishes.service';

@Component({
  selector: 'app-snacks',
  templateUrl: './snacks.component.html',
  styleUrls: ['./snacks.component.css']
})
export class SnacksComponent implements OnInit {

  snacks: DishesClass[] = [];
  snacksInCartID: number[] = [];


  constructor(private clientService: ClientService, private cartService: CartService,
    private dishesService: DishesService) {  
      this.getIdDishInCart();
    }

    getIdDishInCart() {
      for (let i = 0; i<this.dishesService.dishesCart.length; i++) {
        this.snacksInCartID.push(this.dishesService.dishesCart[i].DishId);
      }      
    }

    addToCart(id: number) {   

      //при первом добавлении
      if (this.dishesService.dishesCart.find(d => d.DishId == id) == undefined ) {
        let dish: DishesCartClass = {
          DishId: id,
          Name: this.snacks.find(d => d.DishId == id)!.Name,
          UrlImg: this.snacks.find(d => d.DishId == id)!.UrlImg,
          Price: this.snacks.find(d => d.DishId == id)!.Price,
          Mass: this.snacks.find(d => d.DishId == id)!.Mass,
          DishType: this.snacks.find(d => d.DishId == id)!.DishType,
          Structure: this.snacks.find(d => d.DishId == id)!.Structure,
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
    axios.get('http://localhost:1234/dishes/' + TypesEnum.Snacks)
    .then((res) => { 
      this.snacks = JSON.parse(res.headers['dishes']);     
    })
    .catch((err: any) => {
      console.log(err);
    });
  }

}
