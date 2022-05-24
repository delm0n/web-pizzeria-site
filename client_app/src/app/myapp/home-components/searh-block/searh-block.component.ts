import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { PizzaClass } from 'src/app/models/PizzaClass';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { IngredientClass } from 'src/app/models/IngredientClass';
import { CartService } from 'src/app/myservices/cart/cart.service';
import { Router } from '@angular/router'
import { ModalPizzaService } from 'src/app/myservices/modal-pizza/modal-pizza.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { DishesService } from 'src/app/myservices/dishes/dishes.service';
import { ClientService } from 'src/app/myservices/account/client.service';
import { DishesClass, TypesEnum } from 'src/app/models/DishClass';
import { DishesCartClass } from 'src/app/models/DishCartClass';

@Component({
  selector: 'app-searh-block',
  templateUrl: './searh-block.component.html',
  styleUrls: ['./searh-block.component.css'],
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
    ])

  ],
})
export class SearhBlockComponent implements OnInit {


  isCollapsed = true;
  inputSearch = "";

  search() {

    if (this.inputSearch.length >= 3) {

      //console.log(this.inputSearch);  

      axios.get('http://localhost:1234/search/' + this.inputSearch)
        .then((res) => {
          this.pizzasSearch = JSON.parse(res.headers['pizzas']);
          this.dishesSearch = JSON.parse(res.headers['dishes']);

          this.checkResult();
        })
        .catch((err: any) => {
          //this.router.navigate(['/404']);
          console.log(err);

        });
    }
  }

  pizzasSearch: PizzaClass[] = [];
  dishesSearch: DishesClass[] = [];
  resulerMsg: string = "";

  checkResult() {
    if (this.pizzasSearch.length > 0 || this.dishesSearch.length > 0) {
      this.isCollapsed = false;
      let summa = this.pizzasSearch.length + this.dishesSearch.length;
      this.resulerMsg = "Найдено " + summa + " результатов по запросу \"" + this.inputSearch + "\"";

      if (this.dishesSearch.length > 0) {
        this.getIdDishInCart();
      }

    }
    else {
      this.resulerMsg = "Ничего не найдено"
    }
  }


  // ====================== ПИЦЦЫ ======================

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
  active_status_Pizza = 0 //выбранный размер
  countModal_Pizza = 1 //количество выбранных пицц
  modal_Pizza: boolean = true; //флаг на модальное окно
  modalBtn_Pizza() {

    this.modal_Pizza = !this.modal_Pizza;
    this.countModal_Pizza = 1 //устанавливаем количество выбранных на 1
    this.active_status_Pizza = 0; //устанавливаем на маленький размер

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
  constructor(private pizzaService: ModalPizzaService, private router: Router,
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
  decrement_Pizza(active: number) {
    if (this.countModal_Pizza > 1) {
      this.countModal_Pizza--;
    }
  }
  increment_Pizza(active: number) {
    if (this.countModal_Pizza < 11) {
      this.countModal_Pizza++;
    }
  }
  addToCart_Pizza() {

    // массив с выбранными ингредиентами
    let ingredientArray: IngredientClass[] = [];
    for (let i = 0; i < this.pizzaService.ingredientArray.length; i++) {
      if (this.pizzaService.boolArrayServ[i] == true) {
        ingredientArray.push(this.pizzaService.ingredientArray[i]);
      }
    }
    ingredientArray.sort((a, b) => a.IngredientId - b.IngredientId);

    if (this.checkPizzasInCart(this.modalPizzas.pizzaId, this.modalPizzas.sizes[this.active_status_Pizza].PizzaSizeId, ingredientArray) != null) {

      //получаем индекс пиццы для её увеличения

      this.cartService.pizzasInCart[this.cartService.pizzasInCart
        .findIndex(i => i == this.checkPizzasInCart(this.modalPizzas.pizzaId,
          this.modalPizzas.sizes[this.active_status_Pizza].PizzaSizeId, ingredientArray))].Count =
        this.cartService.pizzasInCart[this.cartService.pizzasInCart
          .findIndex(i => i == this.checkPizzasInCart(this.modalPizzas.pizzaId,
            this.modalPizzas.sizes[this.active_status_Pizza].PizzaSizeId, ingredientArray))].Count
        + this.countModal_Pizza;

      //работа с сохранением на сервере
      if (this.clientService.autorizationFlug) {
        this.cartService.counterPizzaInCartServer(this.clientService.client.clientId,

          this.cartService.pizzasInCart[this.cartService.pizzasInCart
            .findIndex(i => i == this.checkPizzasInCart(this.modalPizzas.pizzaId,
              this.modalPizzas.sizes[this.active_status_Pizza].PizzaSizeId, ingredientArray))].PizzaId,

          this.cartService.pizzasInCart[this.cartService.pizzasInCart
            .findIndex(i => i == this.checkPizzasInCart(this.modalPizzas.pizzaId,
              this.modalPizzas.sizes[this.active_status_Pizza].PizzaSizeId, ingredientArray))].Size,

          this.cartService.pizzasInCart[this.cartService.pizzasInCart
            .findIndex(i => i == this.checkPizzasInCart(this.modalPizzas.pizzaId,
              this.modalPizzas.sizes[this.active_status_Pizza].PizzaSizeId, ingredientArray))].Ingredients,

          this.cartService.pizzasInCart[this.cartService.pizzasInCart
            .findIndex(i => i == this.checkPizzasInCart(this.modalPizzas.pizzaId,
              this.modalPizzas.sizes[this.active_status_Pizza].PizzaSizeId, ingredientArray))].Count)
      }

    }
    else {
      this.cartService.pizzasInCart.push({
        PizzaId: this.modalPizzas.pizzaId,
        PizzaName: this.modalPizzas.pizzaName,
        UrlImg: this.modalPizzas.urlImg,
        Structure: this.modalPizzas.structure,
        PizzaType: this.modalPizzas.pizzaType,
        Size: this.modalPizzas.sizes[this.active_status_Pizza],
        Ingredients: ingredientArray,
        Count: this.countModal_Pizza
      })

      //работа с сохранением на сервере
      if (this.clientService.autorizationFlug) {
        this.cartService.addPizzaInCartServer(this.clientService.client.clientId, this.clientService.client.firstName,
          this.modalPizzas.pizzaId, this.modalPizzas.sizes[this.active_status_Pizza], ingredientArray, this.countModal_Pizza);
      }

    }

    //закрыть модальное окно
    this.modalBtn_Pizza();

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

  // ====================== ДОПОЛНИТЕЛЬНЫЕ БЛЮДА ======================
  dish_modal: DishesClass = {
    DishId: 0,
    Name: '',
    UrlImg: '',
    Price: 0,
    Mass: 0,
    Structure: '',
    DishType: TypesEnum.Snacks
  }

  dishes_InCartID: number[] = [];

  countModal = 1 //количество выбранных пицц
  modal: boolean = true; //флаг на модальное окно
  modalBtn(id: number) {
    this.modal = !this.modal;

    //махинации с прокруткой
    document.body.style.overflow = 'hidden';


    this.dish_modal = this.dishesSearch.find(d => d.DishId == id)!
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

  getIdDishInCart() {
    for (let i = 0; i < this.dishesService.dishesCart.length; i++) {
      this.dishes_InCartID.push(this.dishesService.dishesCart[i].DishId);
    }
  }

  addToCart(id: number) {

    //при первом добавлении
    if (this.dishesService.dishesCart.find(d => d.DishId == id) == undefined) {
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
      if (this.clientService.autorizationFlug) {
        this.dishesService.addDishInCartServer(this.clientService.client.clientId)
      }

    }
    else {
      //иначе просто увеличиваем количество
      this.dishesService.dishesCart.find(d => d.DishId == id)!.Count = this.countModal + this.dishesService.dishesCart.find(d => d.DishId == id)!.Count;

      if (this.clientService.autorizationFlug) {
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
  }

}
