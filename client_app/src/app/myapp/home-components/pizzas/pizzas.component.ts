import { Component, OnInit } from '@angular/core';
import axios from "axios";

import { IngredientClass } from '../../../models/IngredientClass' 
import { ModalPizzaService } from '../../../myservices/modal-pizza/modal-pizza.service';
import { CartService } from '../../../myservices/cart/cart.service';
import { ClientService } from '../../../myservices/account/client.service';

import { PizzaClass } from 'src/app/models/PizzaClass';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css'],
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
export class PizzasComponent implements OnInit {

  
  pizzas: PizzaClass[] = []; 

  modalPizzas = {
    pizzaId: 0,
    pizzaName: "",
    urlImg: "",
    structure: "",
    sizes: [{
      PizzaSizeId: 0,
      NameSize : "", //имя размера
      Price: 0,
      Mass: 0
    },
    {
      PizzaSizeId: 0,
      NameSize : "", //имя размера
      Price: 0,
      Mass: 0
    },
    {
      PizzaSizeId: 0,
      NameSize : "", //имя размера
      Price: 0,
      Mass: 0
    }
  ]}
  
  active_status = 0 //выбранный размер
  countModal = 1 //количество выбранных пицц
  modal: boolean = true; //флаг на модальное окно
  
  modalBtn(){
     
    this.modal=!this.modal;
    this.countModal = 1 //устанавливаем количество выбранных на 1
    this.active_status = 0; //устанавливаем на маленький размер

    this.pizzaService.clearPrice(); //очищаем добавленные ингредиенты с предыдущего модального окна

    //махинации с прокруткой
    if ( document.body.style.overflow == 'hidden') { 
      document.body.style.overflow = 'visible';

    } else {
       document.body.style.overflow = 'hidden';   
    }
    
    //размечаем пустой класс
    this.modalPizzas = {pizzaId: 0, 
      pizzaName: "",
      urlImg: "",
      structure: "",
      sizes: [{
        PizzaSizeId: 0,
        NameSize : "", //имя размера
        Price: 0,
        Mass: 0
      },
      {
        PizzaSizeId: 0,
        NameSize : "", //имя размера
        Price: 0,
        Mass: 0
      },
      {
        PizzaSizeId: 0,
        NameSize : "", //имя размера
        Price: 0,
        Mass: 0
      }
    ]};
  }
  
  openPizzaModal(i: any, i_name: string, i_url: string, i_struct: string) {
    axios.get('http://localhost:1234//sizeofasync/'+i)
      .then((res) => {

        //this.pizzaService.setBooler_step();
        this.plusIngrPrice = this.pizzaService.priceOfIngreds

        this.modalPizzas.pizzaId = i;
        this.modalPizzas.pizzaName = i_name;
        this.modalPizzas.urlImg = i_url;
        this.modalPizzas.structure = i_struct;
        this.modalPizzas.sizes = JSON.parse(res.headers['pizza']);     
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  plusIngrPrice: number = 0
  constructor(private pizzaService: ModalPizzaService, private cartService: CartService, private clientService: ClientService) { }

  checkIngredients() { //в переменную, отвечающую за демонстрацию, 
    //присваиваем актуальное значение цены за дополнительные ингредиенты
    this.plusIngrPrice = this.pizzaService.priceOfIngreds
  }
 
  
  decrement(active: number) {
    if (this.countModal > 1) {
      this.countModal--;    
    } 
  }
        

  increment(active: number) {
    if (this.countModal < 11) {
    this.countModal++;
    }
  }


  addToCart() {

    // массив с выбранными ингредиентами
    let ingredientArray: IngredientClass[] = [];
    for(let i = 0; i<this.pizzaService.ingredientArray.length; i++){
      if (this.pizzaService.boolArrayServ[i] == true) {
        ingredientArray.push(this.pizzaService.ingredientArray[i])
      } 
    }
    
    //сначала визуализация данных
    this.cartService.pizzasInCart.push({
      PizzaId: this.modalPizzas.pizzaId,
      PizzaName: this.modalPizzas.pizzaName,
      UrlImg: this.modalPizzas.urlImg,
      Structure: this.modalPizzas.structure,
      Sizes: this.modalPizzas.sizes[this.active_status],
      Ingredients: ingredientArray,
      Count: this.countModal
    })

    //асинхронанная отправка на сервер данных
    this.cartService.postInCartAsync()
    
  }
  
  //chrome.exe --disable-web-security --disable-gpu --allow-file-access-from-files --user-data-dir=C:\temp\
  ngOnInit(): void {
    axios.get('http://localhost:1234/pizza')
      .then((res) => {
        this.pizzas = JSON.parse(res.headers['pizzas']);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

}


