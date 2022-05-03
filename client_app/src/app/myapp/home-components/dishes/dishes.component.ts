import { Component, OnInit, Input } from '@angular/core';
import axios from 'axios';
import { DishesCartClass } from 'src/app/models/DishCartClass';
import { DishesClass, TypesEnum } from 'src/app/models/DishClass';
import { ClientService } from 'src/app/myservices/account/client.service';
import { CartService } from 'src/app/myservices/cart/cart.service';
import { DishesService } from 'src/app/myservices/dishes/dishes.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css'],
  animations: [
    trigger('openClose', [
      state('block', style({
        //..
      })),
      state('hidden', style({
        opacity: 0,
      })),

      transition('block => hidden', [
        animate('0s')

      ]),
      transition('hidden => block', [
        animate(
          '1.9s',
          keyframes([
            style({ visibility: 'hidden', offset: 0 }),
            style({ visibility: 'visible', offset: 0.4 }),
            style({ opacity: 1, offset: 0.7 }),
          ])
        )
      ]),
    ]),
  ],
})
export class DishesComponent implements OnInit {



  dish_component: DishesClass[] = [];
  dishes_InCartID: number[] = [];

  @Input() typesEnum: number = 0;
  @Input() titleEnum: string = "";

  dish_modal: DishesClass = {
    DishId: 0,
    Name: '',
    UrlImg: '',
    Price: 0,
    Mass: 0,
    Structure: '',
    DishType: TypesEnum.Snacks
  }

  countModal = 1 //количество выбранных пицц
  modal: boolean = true; //флаг на модальное окно
  modalBtn(id: number) {
    this.modal = !this.modal;

    //махинации с прокруткой
    document.body.style.overflow = 'hidden';
    

    this.dish_modal = this.dish_component.find(d => d.DishId == id)!
  }

  modalBtn_close() {
    this.modal = !this.modal;
    document.body.style.overflow = 'visible';
    this.countModal = 1;

    this.dish_modal = {
      DishId: 0,
      Name: '',
      UrlImg: '',
      Price: 0,
      Mass: 0,
      Structure: '',
      DishType: TypesEnum.Snacks
    }

  }

  decrement() {
    if (this.countModal > 1) {
      this.countModal--;
    }
  }

  increment() {
    if (this.countModal < 11) {
      this.countModal++;
    }
  }

  constructor(private clientService: ClientService, private cartService: CartService,
    private dishesService: DishesService) {  
      this.getIdDishInCart();
    }

    getIdDishInCart() {
      for (let i = 0; i<this.dishesService.dishesCart.length; i++) {
        this.dishes_InCartID.push(this.dishesService.dishesCart[i].DishId);
      }      
    }

    addToCart(id: number) {   

      console.log(this.dishesService.dishesCart);
      

      //при первом добавлении
      if (this.dishesService.dishesCart.find(d => d.DishId == id) == undefined ) {
        let dish: DishesCartClass = {
          DishId: id,
          Name: this.dish_modal.Name,
          UrlImg: this.dish_modal.UrlImg,
          Price: this.dish_modal.Price,
          Mass: this.dish_modal.Mass,
          DishType: this.dish_modal.DishType,
          Structure: this.dish_modal.Structure,
          Count: this.countModal
        }
    
        this.dishesService.dishesCart.push(dish);
        this.getIdDishInCart();

        //при входе в аккаунт
        if(this.clientService.autorizationFlug) {
          this.dishesService.addDishInCartServer(this.clientService.client.clientId)
        }
  
      }
      else { 
        //иначе просто увеличиваем количество
        this.dishesService.dishesCart.find(d => d.DishId == id)!.Count = this.countModal + this.dishesService.dishesCart.find(d => d.DishId == id)!.Count;
  
        if(this.clientService.autorizationFlug) {
          this.dishesService.CounterDishInCartServer(this.clientService.client.clientId, id, this.dishesService.dishesCart.find(d => d.DishId == id)!.Count)
        } 
      }
  
  
      // //при входе в аккаунт
      // if(this.clientService.autorizationFlug) {
      //   this.dishesService.addDishInCartServer(this.clientService.client.clientId)
      // }

      this.modalBtn_close();
    }

  ngOnInit(): void {
    axios.get('http://localhost:1234/dishes/' + this.typesEnum)
    .then((res) => { 
      this.dish_component = JSON.parse(res.headers['dishes']);     
    })
    .catch((err: any) => {
      console.log(err);
    });
  }

}
