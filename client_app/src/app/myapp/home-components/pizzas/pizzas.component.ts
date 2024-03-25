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
import { Router } from '@angular/router';

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

  load: Boolean = true;

  pizzas: PizzaClass[] = [];

  modalPizzas = {
    pizzaId: 0,
    pizzaName: "",
    urlImg: "",
    structure: "",
    pizzaType: 0,
    sizes: [{
      PizzaSizeId: 0,
      NameSize: "Маленькая", //имя размера
      Price: 0,
      Mass: 0
    },
    {
      PizzaSizeId: 0,
      NameSize: "Средняя", //имя размера
      Price: 0,
      Mass: 0
    },
    {
      PizzaSizeId: 0,
      NameSize: "Большая", //имя размера
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
        NameSize: "Маленькая", //имя размера
        Price: 0,
        Mass: 0
      },
      {
        PizzaSizeId: 0,
        NameSize: "Средняя", //имя размера
        Price: 0,
        Mass: 0
      },
      {
        PizzaSizeId: 0,
        NameSize: "Большая", //имя размера
        Price: 0,
        Mass: 0
      }]
    };
  }

  openPizzaModal(i: any, i_name: string, i_url: string, i_struct: string, i_price: number) {

    setTimeout(() => {
      this.modalBtn();
    }, 1100)
   

    axios.get('http://localhost:1234//sizeofasync/' + i)
      .then((res) => {
        this.modalPizzas.sizes = JSON.parse(res.headers['pizza']);
      })
      .catch((err: any) => {
        
        this.modalPizzas.sizes = [
          {
              "PizzaSizeId": 16,
              "NameSize": "Маленькая",
              "Price": i_price,
              "Mass": 365,
          },
          {
              "PizzaSizeId": 17,
              "NameSize": "Средняя",
              "Price": i_price + 120,
              "Mass": 660,
          },
          {
              "PizzaSizeId": 18,
              "NameSize": "Большая",
              "Price": i_price + 298,
              "Mass": 770,
          }
      ];

      })
      .finally(() => {
        this.plusIngrPrice = this.pizzaService.priceOfIngreds;
        this.modalPizzas.pizzaId = i;
        this.modalPizzas.pizzaName = i_name;
        this.modalPizzas.urlImg = i_url;
        this.modalPizzas.structure = i_struct;
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

      //получаем индекс пиццы для её увеличения

      this.cartService.pizzasInCart[this.cartService.pizzasInCart
        .findIndex(i => i == this.checkPizzasInCart(this.modalPizzas.pizzaId,
          this.modalPizzas.sizes[this.active_status].PizzaSizeId, ingredientArray))].Count =
        this.cartService.pizzasInCart[this.cartService.pizzasInCart
          .findIndex(i => i == this.checkPizzasInCart(this.modalPizzas.pizzaId,
            this.modalPizzas.sizes[this.active_status].PizzaSizeId, ingredientArray))].Count
        + this.countModal;
 
      //работа с сохранением на сервере
      if (this.clientService.autorizationFlug) {
        this.cartService.counterPizzaInCartServer(this.clientService.client.clientId,

          this.cartService.pizzasInCart[this.cartService.pizzasInCart
            .findIndex(i => i == this.checkPizzasInCart(this.modalPizzas.pizzaId,
              this.modalPizzas.sizes[this.active_status].PizzaSizeId, ingredientArray))].PizzaId,

          this.cartService.pizzasInCart[this.cartService.pizzasInCart
            .findIndex(i => i == this.checkPizzasInCart(this.modalPizzas.pizzaId,
              this.modalPizzas.sizes[this.active_status].PizzaSizeId, ingredientArray))].Size,

          this.cartService.pizzasInCart[this.cartService.pizzasInCart
            .findIndex(i => i == this.checkPizzasInCart(this.modalPizzas.pizzaId,
              this.modalPizzas.sizes[this.active_status].PizzaSizeId, ingredientArray))].Ingredients,

          this.cartService.pizzasInCart[this.cartService.pizzasInCart
            .findIndex(i => i == this.checkPizzasInCart(this.modalPizzas.pizzaId,
              this.modalPizzas.sizes[this.active_status].PizzaSizeId, ingredientArray))].Count)
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

      //работа с сохранением на сервере
      if (this.clientService.autorizationFlug) {
        this.cartService.addPizzaInCartServer(this.clientService.client.clientId, this.clientService.client.firstName,
          this.modalPizzas.pizzaId, this.modalPizzas.sizes[this.active_status], ingredientArray, this.countModal);
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

    let copy :PizzaClass[] = [];

    Object.assign(copy, this.pizzasDict)

    console.log(this.sorted_status);
    
    if (this.filter_type_pizza == 0) {
     
      if (this.sorted_status == 0) {
         this.pizzas = this.pizzasDict;
      }

      else {
        if (this.sorted_status == 1) {
          this.pizzas = copy.sort((a, b) => b.Rating - a.Rating);
        }
        else {
          this.pizzas = copy.sort((a, b) => b.CountOrder - a.CountOrder);
        }
        
      }
    }
    else {

      if (this.sorted_status == 0) {
        this.pizzas = copy.filter(el => el.PizzaType == this.filter_type_pizza)
     }
     else {

      if (this.sorted_status == 1) {
        this.pizzas = copy.filter(el => el.PizzaType == this.filter_type_pizza).sort((a, b) => b.Rating - a.Rating)
      }
      else {
        this.pizzas = copy.filter(el => el.PizzaType == this.filter_type_pizza).sort((a, b) => b.CountOrder - a.CountOrder)
      }

     

     }

      
    }

  }


  pizzasDict: PizzaClass[] = [
    {
        "PizzaId": 2,
        "UrlImg": "assets/img/margarita.jpg",
        "PizzaName": "Маргарита",
        "Structure": "Сыр моцарелла, ветчина, ананасы и фирменный соус",
        "MinPrice": 289,
        "Rating": 5,
        "CountOrder": 3,
        "IdClientRateJson": "",
        "ClientRateJson": "",
        
        "PizzaType": 2
    },
    {
        "PizzaId": 3,
        "UrlImg": "assets/img/hunting.jpg",
        "PizzaName": "Ветчина / грибы",
        "Structure": "Сыр моцарелла, ветчина, шампиньоны и фирменный соус",
        "MinPrice": 300,
        "Rating": 3.67,
        "CountOrder": 5,
        "IdClientRateJson": "[1,3]",
        "ClientRateJson": "[2,4]",
        
        "PizzaType": 0
    },
    {
        "PizzaId": 6,
        "UrlImg": "assets/img/onecheese.jpg",
        "PizzaName": "Сырная",
        "Structure": "Сыр моцарелла, желтый полутвердный сыр тильзитер, сыр брынза, фирменный соус и итальянские травы",
        "MinPrice": 320,
        "Rating": 4,
        "CountOrder": 8,
        "IdClientRateJson": "[1,5]",
        "ClientRateJson": "[5,2]",
        
        "PizzaType": 2
    },
    {
        "PizzaId": 4,
        "UrlImg": "assets/img/greek.jpg",
        "PizzaName": "Греческая",
        "Structure": "Сыр моцарелла, шампиньоны, болгарский перец, помидоры, маслины и фирменный соус",
        "MinPrice": 340,
        "Rating": 3.67,
        "CountOrder": 5,
        "IdClientRateJson": "[3,8]",
        "ClientRateJson": "[3,3]",
        
        "PizzaType": 0
    },
    {
        "PizzaId": 7,
        "UrlImg": "assets/img/caesar.jpg",
        "PizzaName": "Цезарь",
        "Structure": "Сыр моцарелла, нежное куриное филе, сочные томаты и соус цезарь",
        "MinPrice": 379,
        "Rating": 4,
        "CountOrder": 2,
        "IdClientRateJson": "[6]",
        "ClientRateJson": "[3]",
        
        "PizzaType": 0
    },
    {
        "PizzaId": 8,
        "UrlImg": "assets/img/texas.jpg",
        "PizzaName": "Техас",
        "Structure": "Сыр моцарелла, ароматная ветчина, копченые колбаски, свежие шампиньоны, горчичный соус и итальянские травы",
        "MinPrice": 389,
        "Rating": 4,
        "CountOrder": 2,
        "IdClientRateJson": "[1]",
        "ClientRateJson": "[3]",
        
        "PizzaType": 0
    },
    {
        "PizzaId": 1,
        "UrlImg": "assets/img/hawaiian.jpg",
        "PizzaName": "Гавайская",
        "Structure": "Сыр моцарелла, ветчина, ананасы и фирменный соус",
        "MinPrice": 390,
        "Rating": 4,
        "CountOrder": 2,
        "IdClientRateJson": "[3]",
        "ClientRateJson": "[3]",
        
        "PizzaType": 0
    },
    {
        "PizzaId": 5,
        "UrlImg": "assets/img/cheese.jpg",
        "PizzaName": "4 сыра",
        "Structure": "Сыр моцарелла, сыр тильзитер, сыр пармезан, сыр с голубой плесенью и сливочный соус",
        "MinPrice": 410,
        "Rating": 3.5,
        "CountOrder": 2,
        "IdClientRateJson": "[1]",
        "ClientRateJson": "[2]",
        
        "PizzaType": 2
    },
    {
        "PizzaId": 9,
        "UrlImg": "assets/img/diablo.jpg",
        "PizzaName": "Дьябло",
        "Structure": "Сыр моцарелла, пикантные пепперони, нежное куриное филе, болгарский перец, перец халапеньо и фирменный соус",
        "MinPrice": 429,
        "Rating": 4.5,
        "CountOrder": 5,
        "IdClientRateJson": "[3]",
        "ClientRateJson": "[4]",
        
        "PizzaType": 1
    }
];


  //axiosBool: boolean = true;
  ngOnInit(): void {

      axios.get('http://localhost:1234/pizza')
      .then((res) => {
        this.pizzas = JSON.parse(res.headers['pizzas']);
        // this.axiosBool = false;
        console.log(this.pizzas);
        this.pizzasDict = this.pizzas
        
      })
      .catch((err: any) => {
        // console.log(err);
        this.pizzas = this.pizzasDict
        
        //this.router.navigate(['/404']);
      })
      .finally(() => {
        this.load = false
      });

  }

}


