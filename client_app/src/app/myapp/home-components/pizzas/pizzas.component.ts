import { Component, OnInit } from '@angular/core';
import axios from "axios";

import { IngredientClass } from '../../../models/IngredientClass'
import { ModalPizzaService } from '../../../myservices/modal-pizza/modal-pizza.service';
import { CartService } from '../../../myservices/cart/cart.service';
import { ClientService } from '../../../myservices/account/client.service';
import { DishesService } from '../../../myservices/dishes/dishes.service';

import { PizzaClass } from 'src/app/models/PizzaClass';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { PizzaCartClass, Size } from 'src/app/models/PizzaCartClass';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css'],
  providers: [NgbRatingConfig],
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
    pizzaType: 0,
    sizes: [{
      PizzaSizeId: 0,
      NameSize: "", //имя размера
      Price: 0,
      Mass: 0
    },
    {
      PizzaSizeId: 0,
      NameSize: "", //имя размера
      Price: 0,
      Mass: 0
    },
    {
      PizzaSizeId: 0,
      NameSize: "", //имя размера
      Price: 0,
      Mass: 0
    }
    ]
  }

  active_status = 0 //выбранный размер
  countModal = 1 //количество выбранных пицц
  modal: boolean = true; //флаг на модальное окно

  modalBtn() {

    this.modal = !this.modal;
    this.countModal = 1 //устанавливаем количество выбранных на 1
    this.active_status = 0; //устанавливаем на маленький размер

    this.pizzaService.clearPrice(); //очищаем добавленные ингредиенты с предыдущего модального окна

    //махинации с прокруткой
    if (document.body.style.overflow == 'hidden') {
      document.body.style.overflow = 'visible';

    } else {
      document.body.style.overflow = 'hidden';
    }

    //размечаем пустой класс
    this.modalPizzas = {
      pizzaId: 0,
      pizzaName: "",
      urlImg: "",
      structure: "",
      pizzaType: 0,
      sizes: [{
        PizzaSizeId: 0,
        NameSize: "", //имя размера
        Price: 0,
        Mass: 0
      },
      {
        PizzaSizeId: 0,
        NameSize: "", //имя размера
        Price: 0,
        Mass: 0
      },
      {
        PizzaSizeId: 0,
        NameSize: "", //имя размера
        Price: 0,
        Mass: 0
      }
      ]
    };
  }

  openPizzaModal(i: any, i_name: string, i_url: string, i_struct: string) {
    axios.get('http://localhost:1234//sizeofasync/' + i)
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
  constructor(private pizzaService: ModalPizzaService,
    private cartService: CartService, private clientService: ClientService,
    config: NgbRatingConfig, private dishesService: DishesService) {
    // customize default values of ratings used by this component tree
    config.max = 5;
    config.readonly = true;
  }

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
    for (let i = 0; i < this.pizzaService.ingredientArray.length; i++) {
      if (this.pizzaService.boolArrayServ[i] == true) {
        ingredientArray.push(this.pizzaService.ingredientArray[i]);
      }
    }
    ingredientArray.sort((a, b) => a.IngredientId - b.IngredientId);




    if (this.checkPizzasInCart(this.modalPizzas.pizzaId, this.modalPizzas.sizes[this.active_status].PizzaSizeId, ingredientArray) != null) {
      console.log("такая пицца уже есть, её надо +1");

      //получаем индекс пиццы для её увеличения

      this.cartService.pizzasInCart[this.cartService.pizzasInCart
        .findIndex(i => i == this.checkPizzasInCart(this.modalPizzas.pizzaId, 
          this.modalPizzas.sizes[this.active_status].PizzaSizeId, ingredientArray))].Count++;

      if (this.clientService.autorizationFlug) {
        this.cartService.counterPlusPizzaInCartServer(this.clientService.client.clientId, this.cartService.pizzasInCart
          .findIndex(i => i == this.checkPizzasInCart(this.modalPizzas.pizzaId, 
            this.modalPizzas.sizes[this.active_status].PizzaSizeId, ingredientArray)) )
      }

    }
    else {
      this.cartService.pizzasInCart.push({
        PizzaId: this.modalPizzas.pizzaId,
        PizzaName: this.modalPizzas.pizzaName,
        UrlImg: this.modalPizzas.urlImg,
        Structure: this.modalPizzas.structure,
        PizzaType: this.modalPizzas.pizzaType,
        Size: this.modalPizzas.sizes[this.active_status],
        Ingredients: ingredientArray,
        Count: this.countModal
      })


      if (this.clientService.autorizationFlug) {
        this.cartService.addPizzaInCartServer(this.clientService.client.clientId);
      }
    }

    //закрыть модальное окно
    this.modalBtn();

  }


  checkPizzasInCart(id_pizza: number, id_size: number, ingredient_array: IngredientClass[]) {

    let checkerEntity = this.cartService.pizzasInCart.filter(p => p.PizzaId == id_pizza && p.Size.PizzaSizeId == id_size
      && p.Ingredients.length == ingredient_array.length);

    //если есть совпадение на id, idsize и количество ингредиентов
    if (checkerEntity != undefined) {

      //для каждой пиццы, попавшей в массив, проверим ингредиенты на соответствие
      for (let i = 0; i < checkerEntity.length; i++) {

        //массив id-ингредиентов в корзине  
        let ingredient_array_find: number[] = [];

        for (let j = 0; j < checkerEntity![i].Ingredients.length; j++) {
          ingredient_array_find.push(checkerEntity[i]!.Ingredients[j].IngredientId)
        }

        //если ингредиенты совпали 
        if (this.checkIngredientsInPizzasInCart(ingredient_array, ingredient_array_find)) {
          return checkerEntity[i];
        } else { }

      }

      //если checkerEntity.length = 0
      return null;

    }

    //если cовпадений не оказалось
    else return null;

  }

  checkIngredientsInPizzasInCart(ingredients_array: IngredientClass[], index_array: number[]) {

    for (let i = 0; i < ingredients_array.length; i++) {
      if (ingredients_array[i].IngredientId != index_array[i]) {
        return false;
      }
    }

    return true;

  }

  sorted_status: number = 0;
  show_filter: boolean = false;
  filter_type_pizza: number = 0;

  getPizzasFilter() {
    axios.get('http://localhost:1234/filter/' + this.filter_type_pizza + '&&' + this.sorted_status)
      .then((res) => {
        this.pizzas = JSON.parse(res.headers['pizzas']);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  


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


